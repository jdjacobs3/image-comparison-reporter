// pulls desired headers from http requests and returns the promise of them in a formatted object
const http = require('http');
module.exports = function getHeaders(urlToCheck) {
    headersPromise = new Promise(function(resolve, reject)   {
        try {
            http.get(urlToCheck, function(res) {
                let formattedRes = {
                    "response code": res.statusCode,
                    "x-actual-font-size": res.headers["x-actual-font-size"],
                    "x-error": res.headers["x-error"]
                }
                return resolve(formattedRes);
            }); 
        }  
        catch (err) {
            console.log('caught error in getHeaders.js');
            return reject(err);
        }
        }).catch(function(err){
            return err;
        })
    return headersPromise
}