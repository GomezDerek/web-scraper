const PageData = require('../models/PageData');

exports.storeApiDetails = async (req, res) => {
    const { url } = req.body;

    // create a new pageData according to the schema in models/ 
    const pageDataEntry = {
        //page meta: {title, descr., favicon}
        url: url,
        html: null,
        images: [],
        videos: []
    };

    try {
        // POST the pageDataEntry to the DB
        await PageData.create(pageDataEntry);
        res.status(201).json(pageDataEntry);
    } catch (err) {
        console.error(err);
        res.status(400).send('Error POSTing pageDataEntry to DB');
    }
};