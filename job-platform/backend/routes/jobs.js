const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// Get all jobs
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get job by ID

router.get("/jobs/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get applicants for a job
router.get("/jobs/:id/applicants", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    const sorted = job.applicants.sort((a, b) => b.matchScore - a.matchScore);
    res.json(sorted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Apply for a job
router.post("/apply", async (req, res) => {
  try {
    const { name, email, skills, experience, jobId } = req.body;

    if (!name || !email || !skills || experience === undefined || !jobId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    // Calculate match score
    const skillsArray = Array.isArray(skills)
      ? skills
      : skills.split(",").map((s) => s.trim());
    const matchingSkills = skillsArray.filter((skill) =>
      job.tags.some((tag) => tag.toLowerCase().includes(skill.toLowerCase())),
    ).length;
    const matchScore =
      job.tags.length > 0
        ? Math.round((matchingSkills / job.tags.length) * 100)
        : 0;

    const applicant = {
      name,
      email,
      skills: skillsArray,
      experience: parseInt(experience),
      matchScore,
    };

    // Check if already applied
    const alreadyApplied = job.applicants.some((app) => app.email === email);
    if (alreadyApplied) {
      return res.status(400).json({ error: "Already applied to this job" });
    }

    job.applicants.push(applicant);
    await job.save();

    res.status(201).json({
      message: "Application submitted successfully",
      matchScore,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
