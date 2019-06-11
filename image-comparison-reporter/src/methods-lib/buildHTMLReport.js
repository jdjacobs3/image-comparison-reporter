// method that builds the HTML report using the results JSON object produced in the index file
const fs = require('fs');
module.exports = function buildHTMLReport(reportDataObj, pathToFile, minMisMatchPercentage) {
    var stream = fs.createWriteStream(pathToFile);
    stream.once('open', function(fd) {
    let html = '<h1>Image Comparison Report</h1>' +
                '<h3>Base URL: ' + reportDataObj["BaseVersionNumber"] + '</h3>' +
                '<h3>Test URL: ' + reportDataObj["TestVersionNumber"] + '</h3>' +
                '<h3>Number of Matches: ' + reportDataObj["Match Count"] + '</h3>' +
                '<h3>Number of Query String Tested: ' + reportDataObj["Query Strings"].length + '</h3>' +
                '<h3>Time Elapsed: ' + reportDataObj.timeElapsed + ' seconds</h3>';
        
    if (minMisMatchPercentage !== -1)   {
        html += '<h3>Minimum Mismatch Percentage: ' + minMisMatchPercentage + '</h3>' +
                '<h3>Number of Comparisons Exceeding Minimum Mismatch Percentage: ' + reportDataObj["Mismatch Count"] + '</h3>';
    }

    html += '<table><tr><th>Diff Image</th><th>Comparison Data</th><th>Image Links</th></tr>';
    let baseImgSrc;
    let testImgSrc;

    if (minMisMatchPercentage > 100)   {
        minMisMatchPercentage = 0;
        console.log('Error: Invalid minMisMatchPercentage. minMisMatchPercentage argument set to over 100');
    }

    for(let i = 0; i < reportDataObj["results"].length; i++)   {
        if (reportDataObj["results"][i]['Mismatch Percentage'] > minMisMatchPercentage)   {
            baseImgSrc = reportDataObj["BaseVersionNumber"] + reportDataObj["Query Strings"][i];
            testImgSrc = reportDataObj["TestVersionNumber"] + reportDataObj["Query Strings"][i];
            html += '<tr><td><img src=\'' + reportDataObj["Diff Img URLs"][i] + '\' ></td>' +
                    '<td><pre>' + JSON.stringify(reportDataObj["results"][i], undefined, ' ') + '</pre></td>' +
                    '<td> <a target="_blank" href=\'' + baseImgSrc + '\'>Base Image</a>  <a target="_blank" href=\'' + testImgSrc + '\'>Test Image</a></td><tr>';
        } 
    };
    html += `</table>
            <style>
                table, th, td { 
                    border: 1px solid black
                }
            </style>`;
    stream.end(html);            
    });
    console.log('HTML Report has been generated and can be found at: ', pathToFile);
}