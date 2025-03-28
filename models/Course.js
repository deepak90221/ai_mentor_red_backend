const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
