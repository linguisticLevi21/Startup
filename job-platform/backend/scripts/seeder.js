require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Job = require("../models/Job");
const User = require("../models/User");

// ── Constants ──────────────────────────────────────────────────────────

// 3 primary companies — HR can log in as hr@flipkart.com, hr@amazon.com, hr@zomato.com
const primaryCompanies = ["Flipkart", "Amazon", "Zomato"];

// Additional companies for the general pool
const otherCompanies = [
  "Razorpay", "Swiggy", "CRED", "Meesho", "Groww",
  "Zerodha", "Freshworks", "Postman", "InMobi", "Dream11",
  "Unacademy", "OYO", "Ola", "PhonePe", "Paytm", "Nykaa", "Zoho",
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
  ["AWS", "Azure", "GCP", "Cloud Architecture"],
  ["Redis", "Caching", "Performance", "Distributed Systems"],
  ["Elasticsearch", "Search", "Analytics", "Big Data"],
  ["Apache Kafka", "Streaming", "Event Processing", "Microservices"],
];

const salaryRanges = [
  "₹ 3-5 LPA", "₹ 5-8 LPA", "₹ 8-12 LPA",
  "₹ 12-18 LPA", "₹ 18-25 LPA", "₹ 25-35 LPA", "₹ 35-50 LPA",
];

// ── Helpers ────────────────────────────────────────────────────────────

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function jitter(city) {
  return {
    lat: city.lat + (Math.random() - 0.5) * 0.1,
    lng: city.lng + (Math.random() - 0.5) * 0.1,
  };
}

/**
 * Build 3-5 guaranteed applicants for a job.
 * Every primary-company job gets applicants so the HR dashboard is never empty.
 */
function buildApplicants(jobTags, jobIndex, guaranteed = false) {
  // For non-guaranteed jobs, 50% chance of no applicants
  if (!guaranteed && Math.random() > 0.5) return [];

  const count = guaranteed
    ? 3 + Math.floor(Math.random() * 3)  // 3-5 for primary companies
    : 2 + Math.floor(Math.random() * 3); // 2-4 for others

  const applicants = [];
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
      email: faker.internet.email().toLowerCase(),
      skills,
      experience: 1 + Math.floor(Math.random() * 8),
      portfolio: Math.random() > 0.4 ? faker.internet.url() : "",
      resume: Math.random() > 0.3 ? faker.internet.url() + "/resume.pdf" : "",
      matchScore,
      status: "pending",
      appliedAt: faker.date.recent({ days: 7 }),
    });
  }
  return applicants;
}

function createJob(company, index, isExternal = false) {
  const city = pick(cities);
  const coords = jitter(city);
  const role = pick(jobRoles);
  const tags = pick(skillSets);
  const isPrimary = primaryCompanies.includes(company);

  return {
    title: role,
    company,
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
    hrEmail: `hr@${company.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
    openings: 1 + Math.floor(Math.random() * 3),
    coordinates: coords,
    postedAt: faker.date.recent({ days: 14 }),
    applicants: buildApplicants(tags, index, isPrimary), // guaranteed for primary
  };
}

// ── Seed Function ──────────────────────────────────────────────────────

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // ─── Seed User Accounts (bcrypt hashed via pre-save hook) ────────
    await User.deleteMany({});
    const accounts = [
      { name: "Flipkart HR",  email: "hr@flipkart.com", password: "password123", role: "HR", company: "Flipkart" },
      { name: "Amazon HR",    email: "hr@amazon.com",   password: "password123", role: "HR", company: "Amazon" },
      { name: "Zomato HR",    email: "hr@zomato.com",   password: "password123", role: "HR", company: "Zomato" },
      { name: "John Doe",     email: "john@gmail.com",  password: "password123", role: "Candidate", company: "" },
      { name: "Jane Smith",   email: "jane@gmail.com",  password: "password123", role: "Candidate", company: "" },
    ];
    // Use User.create (not insertMany) so the pre-save bcrypt hook runs
    for (const acc of accounts) {
      await User.create(acc);
    }
    console.log(`👤 Seeded ${accounts.length} user accounts (bcrypt hashed)`);

    // ─── Seed Jobs ──────────────────────────────────────────────────
    await Job.deleteMany({});
    console.log("🗑️  Cleared existing jobs");

    const jobs = [];
    let index = 0;

    // ─── Phase 1: 50 guaranteed jobs for Flipkart, Amazon, Zomato ───
    // ~17 each, with every job having 3-5 applicants
    const PRIORITY_TOTAL = 50;
    const perCompany = Math.floor(PRIORITY_TOTAL / primaryCompanies.length);
    const remainder = PRIORITY_TOTAL - perCompany * primaryCompanies.length;

    for (let c = 0; c < primaryCompanies.length; c++) {
      const company = primaryCompanies[c];
      const count = perCompany + (c < remainder ? 1 : 0);

      for (let j = 0; j < count; j++) {
        // Make 1 per company external
        const isExternal = j === 0;
        jobs.push(createJob(company, index, isExternal));
        index++;
      }
    }

    // ─── Phase 2: 250 more jobs from all companies (including primary) ───
    const GENERAL_TOTAL = 250;
    const EXTERNAL_COUNT = 12;
    const externalIndices = new Set();
    while (externalIndices.size < EXTERNAL_COUNT) {
      externalIndices.add(Math.floor(Math.random() * GENERAL_TOTAL));
    }

    const allCompanies = [...primaryCompanies, ...otherCompanies];
    for (let i = 0; i < GENERAL_TOTAL; i++) {
      const isExternal = externalIndices.has(i);
      jobs.push(createJob(pick(allCompanies), index, isExternal));
      index++;
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
    console.log("\n🏢 Company breakdown (primary):");
    for (const co of primaryCompanies) {
      const coJobs = jobs.filter((j) => j.company === co);
      const coApplicants = coJobs.reduce((s, j) => s + j.applicants.length, 0);
      console.log(`   ${co}: ${coJobs.length} jobs, ${coApplicants} applicants`);
    }
    console.log(`\n💡 Try logging in as: hr@flipkart.com, hr@amazon.com, or hr@zomato.com`);

    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
    process.exit(1);
  }
}

seedDatabase();
