var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Veida Scraper' });
});

/* POST form submission */
/* isn't working for some reason */
router.post('/submit', function(req, res, next) {
  // Handle form data here
  const formData = req.body;
  // Process the data or perform any necessary actions
  console.log('Form data received:', formData);
  
  // Respond to the client with JSON
  res.json({ message: 'Form data received successfully' });

  // Process the data or perform any necessary actions
  alert('Form data received:', formData);

  // Respond to the client (e.g., redirect or render a new page)
  // res.redirect('/');
});

module.exports = router;