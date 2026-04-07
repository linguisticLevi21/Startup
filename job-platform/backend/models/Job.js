const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  skills: [String],
  experience: { type: Number, required: true },
  matchScore: { type: Number, default: 0 },
  appliedAt: { type: Date, default: Date.now },
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  tags: [String],
  description: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  postedAt: { type: Date, default: Date.now },
  applicants: [applicantSchema],
});

module.exports = mongoose.model("Job", jobSchema);
