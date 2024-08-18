const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: String,
    dueDate: Date,
    description: String,
    course: String,
});

const testSchema = new mongoose.Schema({
    title: String,
    dueDate: Date,
    description: String,
    course: String,
});

const materialSchema = new mongoose.Schema({
    title: String,
    type: String, // e.g., 'document', 'video', etc.
    url: String,
    course: String,
});

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    apiToken: { type: String, required: true },
    baseUrl: { type: String, required: true },
    assignments: [assignmentSchema],
    tests: [testSchema],
    materials: [materialSchema],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;