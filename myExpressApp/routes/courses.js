const express = require('express');
const CourseController = require('../controllers/courseController');
const router = express.Router();

router.post('/', CourseController.storeApiDetails);

module.exports = router;