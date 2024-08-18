// run this file with the following command: node index.js

// puppeteer tutorial
const puppeteer = require('puppeteer'); //puppeteer import

// this is an iffe, an Immediately Invoked Function Expression
// we need this because it allows any code inside to use await
(async () => {
    // launch puppeteer as a browser
    // const browser = await puppeteer.launch({ headless: false }); //browser opens on every execution
    const browser = await puppeteer.launch();

    // navigate to a page
    const page = await browser.newPage();
    await page.goto('https://quotes.toscrape.com/')

    // take a screenshot of the page
    // await page.screenshot({ path: 'puppeteer-screenshots/quotes.png' });

    // log the page's HTML as a string
    // console.log(await page.content());

    // use the document object to query the quotes from the web page
    const quotes = await page.evaluate(()=>{
        const quoteElements = document.querySelectorAll('.quote');
        const quotesArray = [];

        for (const quoteElement of quoteElements) {
            const quoteText = quoteElement.querySelector('.text').innerText;

            // also query for author info
            const author = quoteElement.querySelector('.author').innerText;

            // query for the tags
            const tagElements = quoteElement.querySelectorAll('.tags .tag');
            const tagsArray = [];
            for (const tagElement of tagElements) {
                const tagLabel = tagElement.innerText;
                tagsArray.push(tagLabel);
            }

            quotesArray.push({
                quote: quoteText,
                author,
                tags: tagsArray,
            });
        }

        return quotesArray;
    })

    console.log(quotes);

    // automatically closes browser window
    await browser.close();
})();