require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("./models/Job");

async function testMatchScores() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    const jobs = await Job.find({
      applicants: { $ne: [], $exists: true },
    }).limit(3);

    if (jobs.length === 0) {
      console.log("❌ No jobs with applicants found");
      process.exit(0);
    }

    console.log(`📊 Found ${jobs.length} jobs with applicants\n`);

    jobs.forEach((job) => {
      console.log(`\n🏢 Job: ${job.title} at ${job.company} (${job.location})`);
      console.log(`📋 Tags (Requirements): ${job.tags.join(", ")}`);
      console.log(`👥 Applicants: ${job.applicants.length}`);
      console.log("─".repeat(80));

      job.applicants.forEach((app, idx) => {
        console.log(`\n  Applicant ${idx + 1}: ${app.name}`);
        console.log(`  📧 Email: ${app.email}`);
        console.log(`  💼 Skills: ${app.skills.join(", ")}`);
        console.log(`  📈 Experience: ${app.experience} years`);
        console.log(`  ⭐ Match Score: ${app.matchScore}%`);

        // Highlight which skills match
        const matching = app.skills.filter((skill) =>
          job.tags.some((tag) =>
            tag.toLowerCase().includes(skill.toLowerCase()),
          ),
        );
        if (matching.length > 0) {
          console.log(`  ✅ Matching Skills: ${matching.join(", ")}`);
        }
      });

      console.log("\n" + "═".repeat(80));
    });

    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
}

testMatchScores();
