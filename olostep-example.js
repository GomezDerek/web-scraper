// experimenting with the Olostep API
// call an api key with process.env.KEY
//from https://docs.olostep.com/api-reference/examples-nodejs
require('dotenv').config();
API_KEY = process.env.OLOSTEP_API_KEY;
let url_to_scrape = "https://en.wikipedia.org/wiki/Alexander_the_Great"; // Here put the url that you want to scrape

function start_olostep(url_to_scrape){
    console.log('Starting Olostep...');
    console.log(API_KEY);
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + API_KEY,
        }
    };

    fetch('https://agent.olostep.com/olostep-p2p-incomingAPI?' + new URLSearchParams({
        "url_to_scrape": url_to_scrape,

        // Optional parameters. Already set to default values.
        // If you want to change them, see the available options at https://docs.olostep.com/api-reference/start-agent

        // "timeout": 65,
        // "waitBeforeScraping": 1,
        // "expandMarkdown": true,
        // "expandHtml": false,
        // "saveHtml": true,
        // "saveMarkdown": true,
        // "removeImages": true,
        // "fastLane": false,
        // "removeCSSselectors": 'default',
        // "htmlTransformer": 'none'
      }), options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            // response is an object with the following structure:
            // {
            //    "defaultDatasetId": "defaultDatasetId_mngjljq1qc",
            //    "html_content": "",
            //    "markdown_content": " Alexander the Great - Wikipedia...",
            //    "text_content": "",
            //    "usedProvidedNodeCountry": True
            // }
            //
        }).catch(err => console.error(err));
}

start_olostep(url_to_scrape);