require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Job = require("../models/Job");

// ── Constants ──────────────────────────────────────────────────────────

const companies = [
  "Razorpay", "Swiggy", "Zomato", "Flipkart", "CRED",
  "Meesho", "Groww", "Zerodha", "Freshworks", "Postman",
  "InMobi", "Dream11", "Unacademy", "OYO", "Ola",
  "PhonePe", "Paytm", "Byju's", "Nykaa", "Zoho",
];

const cities = [
  { name: "Bangalore",  lat: 12.9716,  lng: 77.5946 },
  { name: "Delhi",      lat: 28.7041,  lng: 77.1025 },
  { name: "Hyderabad",  lat: 17.3850,  lng: 78.4867 },
  { name: "Mumbai",     lat: 19.0760,  lng: 72.8777 },
];

const jobRoles = [
  "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "ML Engineer", "Data Analyst", "Intern", "Senior Frontend Developer",
  "Senior Backend Developer", "DevOps Engineer", "Product Manager",
  "UX Designer", "QA Engineer", "Technical Lead", "Solutions Architect",
];

const experienceLevels = ["Entry", "Mid", "Senior", "Lead"];

const skillSets = [
  ["React", "Node.js", "MongoDB", "JavaScript"],
  ["Python", "Django", "PostgreSQL", "REST API"],
  ["AWS", "Docker", "Kubernetes", "CI/CD"],
  ["Machine Learning", "Python", "TensorFlow", "Data Analysis"],
  ["Vue.js", "TypeScript", "GraphQL", "Firebase"],
  ["Java", "Spring Boot", "Microservices", "MySQL"],
  ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  ["Python", "FastAPI", "PostgreSQL", "Docker"],
  ["Flutter", "Dart", "Firebase", "REST API"],
  ["Angular", "HTML", "CSS", "TypeScript"],
  ["Go", "Kubernetes", "Docker", "Microservices"],
  ["Rust", "WebAssembly", "Performance", "Systems Design"],
  ["Java", "Spring", "JPA", "Hibernate"],
  ["Swift", "UIKit", "iOS", "Objective-C"],
  ["Kotlin", "Android", "Jetpack", "MVVM"],
  ["React Native", "JavaScript", "Mobile", "Redux"],
  ["Solidity", "Ethereum", "Smart Contracts", "Web3"],
  ["AWS", "Azure", "GCP", "Cloud Architecture"],
  ["Redis", "Caching", "Performance", "Distributed Systems"],
  ["Elasticsearch", "Search", "Analytics", "Big Data"],
];

const salaryRanges = [
  "₹ 3-5 LPA", "₹ 5-8 LPA", "₹ 8-12 LPA",
  "₹ 12-18 LPA", "₹ 18-25 LPA", "₹ 25-35 LPA", "₹ 35-50 LPA",
];

const hrEmails = [
  "hr@razorpay.com", "talent@swiggy.in", "careers@zomato.com",
  "hiring@flipkart.com", "people@cred.club", "hr@meesho.io",
  "recruit@groww.in", "jobs@zerodha.com", "hr@freshworks.com",
  "talent@postman.com", "hr@inmobi.com", "careers@dream11.com",
  "hiring@unacademy.com", "people@oyo.com", "hr@ola.com",
  "recruit@phonepe.com", "hr@paytm.com", "careers@byjus.com",
  "talent@nykaa.com", "hr@zoho.com",
];

// ── Helpers ────────────────────────────────────────────────────────────

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Return coords jittered ±0.05° around a city center (~5 km radius) */
function jitter(city) {
  return {
    lat: city.lat + (Math.random() - 0.5) * 0.1,
    lng: city.lng + (Math.random() - 0.5) * 0.1,
  };
}

function buildApplicants(jobTags, jobIndex) {
  const applicants = [];
  if (Math.random() > 0.5) return applicants; // ~50% of jobs get applicants

  const count = 2 + Math.floor(Math.random() * 3); // 2-4
  for (let a = 0; a < count; a++) {
    let skills;
    if (Math.random() > 0.3) {
      const matchCount = 1 + Math.floor(Math.random() * Math.min(3, jobTags.length));
      skills = jobTags.slice(0, matchCount).concat(pick(skillSets).slice(0, 1));
    } else {
      skills = pick(skillSets);
    }

    const matchingSkills = skills.filter((s) =>
      jobTags.some((t) => t.toLowerCase().includes(s.toLowerCase()))
    ).length;
    const matchScore = jobTags.length > 0
      ? Math.round((matchingSkills / jobTags.length) * 100)
      : 0;

    applicants.push({
      name: faker.person.fullName(),
      email: `applicant${jobIndex}-${a}@example.com`,
      skills,
      experience: Math.floor(Math.random() * 8),
      portfolio: "",
      matchScore,
      status: "pending",
      appliedAt: faker.date.recent({ days: 7 }),
    });
  }
  return applicants;
}

// ── Seed Function ──────────────────────────────────────────────────────

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Job.deleteMany({});
    console.log("🗑️  Cleared existing jobs");

    const TOTAL = 300;
    const EXTERNAL_COUNT = 15;
    const jobs = [];

    // Pre-pick which indices will be external
    const externalIndices = new Set();
    while (externalIndices.size < EXTERNAL_COUNT) {
      externalIndices.add(Math.floor(Math.random() * TOTAL));
    }

    for (let i = 0; i < TOTAL; i++) {
      const city = pick(cities);
      const coords = jitter(city);
      const role = pick(jobRoles);
      const tags = pick(skillSets);
      const isExternal = externalIndices.has(i);

      const job = {
        title: role,
        company: pick(companies),
        location: city.name,
        salary: pick(salaryRanges),
        tags,
        description: faker.lorem.sentences(2),
        isExternal,
        externalUrl: isExternal
          ? faker.internet.url() + "/careers/" + faker.helpers.slugify(role)
          : "",
        city: city.name,
        jobRole: role,
        experienceLevel: pick(experienceLevels),
        hrEmail: pick(hrEmails),
        openings: 1 + Math.floor(Math.random() * 3),
        coordinates: coords,
        postedAt: faker.date.recent({ days: 14 }),
        applicants: buildApplicants(tags, i),
      };

      jobs.push(job);
    }

    await Job.insertMany(jobs);

    // ── Summary ──
    const extCount = jobs.filter((j) => j.isExternal).length;
    const cityBreakdown = cities.map(
      (c) => `${c.name}: ${jobs.filter((j) => j.city === c.name).length}`
    );

    console.log(`\n✅ Successfully seeded ${jobs.length} jobs!`);
    console.log(`🔗 External jobs: ${extCount}`);
    console.log(`📍 City breakdown: ${cityBreakdown.join(" | ")}`);
    console.log(
      `👥 Total Applicants: ${jobs.reduce((s, j) => s + j.applicants.length, 0)}`
    );

    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
    process.exit(1);
  }
}

seedDatabase();
