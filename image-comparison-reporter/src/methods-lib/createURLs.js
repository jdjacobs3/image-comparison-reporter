// combines the query string parameters and the api endpoint domains into api endpoint urls

module.exports = function createURLs(urlBase, queryStrings)    {
    let newURLs = [];
    for (let i = 0; i <queryStrings.length; i++)    {
        newURLs.push(urlBase + queryStrings[i]);
    }
    return newURLs
}