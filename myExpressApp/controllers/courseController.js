const Course = require('../models/Course');

exports.storeApiDetails = async (req, res) => {
    const { apiToken, baseUrl } = req.body;

    // Create a new course object with the API details
    const courseDetails = {
        title: "API Details", // You can set a default title or modify as needed
        apiToken: apiToken,
        baseUrl: baseUrl,
        assignments: [],
        tests: [],
        materials: []
    };

    try {
        // Save the API details to the database
        await Course.create(courseDetails);
        res.status(201).json(courseDetails);
    } catch (err) {
        console.error(err);
        res.status(400).send('Error saving API details');
    }
};