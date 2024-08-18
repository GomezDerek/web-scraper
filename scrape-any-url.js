const puppeteer = require('puppeteer'); //puppeteer import

const urls = [
    'https://gomezderek.com/',
    'https://www.olostep.com/',
];
const targetURL = urls[1];

function getDomain(url) {
    let nohttp = url.split('://')[1];
    let domain = nohttp.split('.');
    domain = domain.length == 2 ? domain[0] : domain[1]; // in case of sub domain
    return domain;
}

// this is an iffe, an Immediately Invoked Function Expression
// we need this because it allows any code inside to use await
(async () => {
    // launch puppeteer as a browser
    // const browser = await puppeteer.launch({ headless: false }); //browser opens on every execution
    const browser = await puppeteer.launch();

    // navigate to a page
    const page = await browser.newPage();
    await page.goto(targetURL);

    // take a screenshot of the page
    await page.screenshot({ path: `puppeteer-screenshots/${getDomain(targetURL)}-screenshot.png` });

    // log the page's HTML as a string
    console.log(await page.content());

    // use the document object to query
    

    // automatically closes browser window
    await browser.close();
})();