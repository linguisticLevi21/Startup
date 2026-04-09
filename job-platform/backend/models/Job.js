const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  skills: [String],
  experience: { type: Number, required: true },
  portfolio: { type: String, default: "" },
  matchScore: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  appliedAt: { type: Date, default: Date.now },
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  tags: [String],
  description: { type: String, required: true },
  openings: { type: Number, default: 1, min: 1 },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  postedAt: { type: Date, default: Date.now },
  applicants: [applicantSchema],
});

module.exports = mongoose.model("Job", jobSchema);
