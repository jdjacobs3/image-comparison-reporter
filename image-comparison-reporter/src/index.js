#!/usr/bin/env node
const argv = require('yargs').argv;
const fs = require('fs');
const performance = require('perf_hooks').performance;
const pLimit = require('p-limit');
const limit = pLimit(25);
const createURLs = require('./methods-lib/createURLs.js');
const createComparisonArray = require('./methods-lib/createComparisonArray.js');
const buildHTMLReport = require('./methods-lib/buildHTMLReport.js');
const getComparison = require('./methods-lib/getComparison.js');
const getHeaders = require('./methods-lib/getHeaders.js');


argv.base_url_domain;
argv.test_url_domain;
let rawParams = fs.readFileSync(argv.parameter_list);
let params = JSON.parse(rawParams);
let baseURLs = createURLs(argv.base_url_domain, params);
let testURLs = createURLs(argv.test_url_domain, params);
let comparisonArray= createComparisonArray(baseURLs, testURLs);
let minMismatchPercentage = argv.min_mismatch_percentage;
let outputType = argv.output_type;
let outputFilePath = argv.output_file_path;
let diffImgURLArray = [];
let resultsArray = [];
let finalObj = {};
finalObj["BaseVersionNumber"] = argv.base_url_domain;
finalObj["TestVersionNumber"] = argv.test_url_domain;
finalObj["Query Strings"] = params;

// line break makes output messages more readable
console.log();
if (outputType === undefined)    {
    outputType = 'html';
}
else if (!(outputType.toUpperCase() === 'HTML'|| outputType.toUpperCase() === 'JSON')) {
    console.log('Invalid outputType');
    process.exit(1);
}

if (outputFilePath === undefined)    {
    outputFilePath = 'imageComparisonReport';
}
if (minMismatchPercentage === undefined)    {
    minMismatchPercentage = -1;
}

startTime = performance.now();
Promise.all(
    comparisonArray.map(comparison => limit(() => getComparison(comparison)))
).then(function(compResultValues) {
    Promise.all(
        baseURLs.map(baseURL => limit(() => getHeaders(baseURL)))
    ).then(function(baseResultValues) {
        Promise.all(
            testURLs.map(testURL => limit(() => getHeaders(testURL)))
        ).then(function(testResultValues) {
            let matchCount = 0;
            let mismatchCount = 0;
            for(let i = 0; i < testResultValues.length; i++)   {
                if (compResultValues[i].error !== undefined) {
                    diffImgURLArray.push('Error unable to retrieve diffImgURL for parameter # ' + i);
                    resultsArray[i] = {
                        "Error Message": compResultValues[i].error,
                        "Query String index": i,
                        "Mismatch Percentage": 101 
                    }
                }
                else { 
                    if (compResultValues[i].rawMisMatchPercentage === 0)   {
                        matchCount = matchCount + 1;
                    }
                    if (compResultValues[i].rawMisMatchPercentage > minMismatchPercentage)   {
                        mismatchCount = mismatchCount + 1;
                    }
                    diffImgURLArray.push(compResultValues[i].getImageDataUrl());
                    resultsArray[i] = {
                        "Mismatch Percentage": compResultValues[i].misMatchPercentage,
                        "Analysis Time": compResultValues[i].analysisTime,
                        "Base Headers": baseResultValues[i],
                        "Test Headers": testResultValues[i]
                    };
                }       
            };

            finalObj["results"] = resultsArray;
            finalObj["Diff Img URLs"] = diffImgURLArray;
            finalObj["Match Count"] = matchCount;
            finalObj["Mismatch Count"] = mismatchCount;
            let seconds = ((performance.now() - startTime)/1000).toFixed(2);
            // let minutes = Math.floor(seconds / 60);
            // seconds = seconds - (minutes * 60);
            finalObj["timeElapsed"] = seconds;
            if (outputType === undefined) {
                buildHTMLReport(finalObj, outputFilePath + '.html', minMismatchPercentage);
            }
            else if (outputType.toUpperCase() === 'HTML') {
                buildHTMLReport(finalObj, outputFilePath + '.html', minMismatchPercentage);
            }
            else if (outputType.toUpperCase() === 'JSON')   {
                console.log('outputting json, report can be found at: ', outputFilePath);
                let exportFile = JSON.stringify(finalObj);
                fs.writeFileSync(outputFilePath + '.json', exportFile);
            }
        });
    });
});