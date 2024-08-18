const mongoose = require('mongoose');

///create schema for meta data { title, descr., favicon }

const imageSchema = new mongoose.Schema({
    url: String,
});

const videoSchema = new mongoose.Schema({
    url: String,
});

const pageDataSchema = new mongoose.Schema({
    url: { type: String, required: true },
    html: { type: String, required: true },
    images: [imageSchema],
    videos: [videoSchema],
});

const PageData = mongoose.model('PageData', pageDataSchema);

module.exports = PageData;