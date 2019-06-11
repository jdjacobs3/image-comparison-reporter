// runs the resemblejs comparison test and returns a promise of the data
const resemble = require("resemblejs");
module.exports = function getComparison(doubleURL)   {
    comparisonPromise = new Promise(function(resolve, reject) {
        try {
            resemble(doubleURL[0])
            .compareTo(doubleURL[1])
            .onComplete(function(data){
                return resolve(data); 
            })
        }
        catch (err) {
            console.log('caught error in getComparison.js');
            return reject(err);
        }
    }).catch(function(err) {
        return {error: err.toString()};                                  
    })
    return comparisonPromise;
}