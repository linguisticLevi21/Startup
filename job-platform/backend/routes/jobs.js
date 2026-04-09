const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// Get all jobs
router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 });
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

    // Sort applicants by matchScore descending
    const sorted = [...job.applicants].sort(
      (a, b) => (b.matchScore || 0) - (a.matchScore || 0),
    );
    res.json(sorted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Calculate match score between applicant skills and job tags
function calculateMatchScore(applicantSkills, jobTags) {
  if (!jobTags || jobTags.length === 0) return 0;

  const normalizedApplicant = applicantSkills.map((s) =>
    s.toLowerCase().trim(),
  );
  const normalizedTags = jobTags.map((t) => t.toLowerCase().trim());

  let matches = 0;
  for (const tag of normalizedTags) {
    if (
      normalizedApplicant.some(
        (skill) => skill.includes(tag) || tag.includes(skill),
      )
    ) {
      matches++;
    }
  }

  return Math.round((matches / normalizedTags.length) * 100);
}

// Apply for a job
router.post("/apply", async (req, res) => {
  try {
    const { name, email, skills, experience, jobId } = req.body;

    if (!name || !email || !skills || experience === undefined || !jobId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ error: "Job not found" });

    const skillsArray = Array.isArray(skills)
      ? skills
      : skills.split(",").map((s) => s.trim());

    // Calculate match score
    const matchScore = calculateMatchScore(skillsArray, job.tags);

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
