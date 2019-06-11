// the p-limit library, implemented to prevent server throttling, can only take one input, so all the base
// and test url pairs used in the resemblejs comparison test need to be combined into an array of url arrays
module.exports = function createComparisonArray(urlArray1, urlArray2)    {
    let newCompArray = [];
    for(let i = 0; i < urlArray1.length; i++)   {
        newCompArray.push([urlArray1[i], urlArray2[i]]);
    } 
    return newCompArray;
}