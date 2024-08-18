const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

// Use body-parser middleware to handle form data
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next) {
  console.log('GET request to /'); // Log when the root route is accessed
  res.render('index', { title: 'Veida Scraper', htmlContent: null });
});

router.post('/scrape', async (req, res) => {
  console.log('POST request to /scrape'); // Log when the scrape route is accessed
  console.log('Request Body:', req.body); // Log the request body for debugging

  const { url } = req.body;

  // Check if the URL is provided
  if (!url) {
    console.error('No URL provided');
    return res.status(400).json({ error: 'URL is required.' });
  }

  // Validate the URL format
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return res.status(400).json({ error: 'Invalid URL format. Please include http:// or https://' });
  }

  try {
    // Immediately Invoked Function Expression (IIFE) for Puppeteer script
    const htmlContent = await (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2' }); // Wait for the network to be idle

      const content = await page.content(); // Get the HTML content as a string
      console.log(content); // Log the page's HTML content

      await browser.close();
      return content;
    })();

    // Render the page with the fetched HTML content
    res.render('index', { title: 'Veida Scraper', htmlContent: htmlContent });
  } catch (error) {
    console.error('Error scraping the URL:', error.message); // Log the error message
    res.status(500).json({ error: 'Error fetching the URL.' }); // Return JSON error response
  }
});

module.exports = router;
