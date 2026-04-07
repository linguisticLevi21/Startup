require("dotenv").config();
const mongoose = require("mongoose");
const Job = require("../models/Job");

const companies = [
  "Razorpay",
  "Swiggy",
  "Zomato",
  "Flipkart",
  "CRED",
  "Meesho",
  "Groww",
  "Zerodha",
  "Freshworks",
  "Postman",
  "InMobi",
  "Dream11",
  "Unacademy",
  "OYO",
  "Ola",
];

const companyDetails = {
  Razorpay: { specialization: "Fintech", desc: "Leading payment gateway" },
  Swiggy: { specialization: "Logistics", desc: "Food and delivery platform" },
  Zomato: { specialization: "Food & Delivery", desc: "Dining and delivery" },
  Flipkart: {
    specialization: "E-commerce",
    desc: "India's largest e-commerce",
  },
  CRED: { specialization: "Fintech", desc: "Credit card rewards platform" },
  Meesho: {
    specialization: "Social Commerce",
    desc: "Social commerce platform",
  },
  Groww: { specialization: "Fintech", desc: "Investment and trading app" },
  Zerodha: { specialization: "Fintech", desc: "Stock broking platform" },
  Freshworks: { specialization: "SaaS", desc: "Customer engagement software" },
  Postman: {
    specialization: "Developer Tools",
    desc: "API development platform",
  },
  InMobi: {
    specialization: "Mobile Marketing",
    desc: "Mobile advertising platform",
  },
  Dream11: { specialization: "Gaming", desc: "Fantasy sports platform" },
  Unacademy: { specialization: "EdTech", desc: "Online learning platform" },
  OYO: { specialization: "Hospitality", desc: "Budget accommodation network" },
  Ola: { specialization: "Mobility", desc: "Ride-sharing platform" },
};

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "ML Engineer",
  "Data Analyst",
  "Intern",
  "Senior Frontend Developer",
  "Senior Backend Developer",
  "DevOps Engineer",
  "Product Manager",
  "UX Designer",
  "QA Engineer",
  "Technical Lead",
  "Solutions Architect",
];

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
  ["Go", "Kubernetes", "Docker", "microservices"],
  ["Rust", "WebAssembly", "Performance", "Systems Design"],
  ["Java", "Spring", "JPA", "Hibernate"],
  ["C++", "Qt", "STL", "Embedded Systems"],
  ["Swift", "UIKit", "iOS", "Objective-C"],
  ["Kotlin", "Android", "Jetpack", "MVVM"],
  ["React Native", "JavaScript", "Mobile", "Redux"],
  ["Solidity", "Ethereum", "Smart Contracts", "Web3"],
  ["Cybersecurity", "Penetration Testing", "Network Security", "Encryption"],
  ["AWS", "Azure", "GCP", "Cloud Architecture"],
  ["GraphQL", "Apollo", "Query Language", "API Design"],
  ["Redis", "Caching", "Performance", "Distributed Systems"],
  ["Elasticsearch", "Search", "Analytics", "Big Data"],
  ["Apache Kafka", "Streaming", "Event Processing", "Microservices"],
  ["Terraform", "AWS", "Infrastructure as Code", "DevOps"],
  ["Jenkins", "CI/CD", "Automation", "DevOps"],
  ["PostgreSQL", "Database Design", "Query Optimization", "SQL"],
  ["MongoDB", "NoSQL", "Database Design", "Scalability"],
  ["Docker", "Containers", "DevOps", "Scalability"],
];

const descriptions = [
  "Join our fast-growing startup and work on cutting-edge technology.",
  "Help us build the future of cloud computing.",
  "Work with a passionate team on innovative solutions.",
  "Be part of a mission-driven organization transforming the industry.",
  "Collaborate with top talent in a dynamic startup environment.",
  "Shape the next generation of products in this space.",
  "Work on scalable systems impacting millions of users.",
  "Join a team that values innovation and creativity.",
  "Build next-gen applications with modern tech stack.",
  "Opportunity to lead and mentor junior developers.",
  "Work on AI/ML solutions powering global scale.",
  "Create impact through elegant code and design.",
  "Join the future of fintech innovation.",
  "Build security-first applications for global audience.",
  "Work with latest cloud-native technologies.",
  "Help us revolutionize the industry with innovative solutions.",
  "Develop products that millions of users depend on.",
  "Work on distributed systems at massive scale.",
  "Join a culture of continuous learning and growth.",
  "Create beautiful, performant user experiences.",
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing jobs
    await Job.deleteMany({});
    console.log("🗑️  Cleared existing jobs");

    const citiesArray = [
      { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
      { name: "Mumbai", lat: 19.076, lng: 72.8777 },
      { name: "Delhi", lat: 28.7041, lng: 77.1025 },
      { name: "Remote", lat: 20.5937, lng: 78.9629 },
    ];

    const salaryRanges = [
      "₹ 3-5 LPA",
      "₹ 5-8 LPA",
      "₹ 8-12 LPA",
      "₹ 12-18 LPA",
      "₹ 18-25 LPA",
      "₹ 25-35 LPA",
      "₹ 35-50 LPA",
    ];

    const jobs = [];
    let jobId = 0;

    // Create 3-6 jobs for each company
    for (const company of companies) {
      const jobsPerCompany = 3 + Math.floor(Math.random() * 4); // 3-6 jobs

      for (let j = 0; j < jobsPerCompany; j++) {
        const city =
          citiesArray[Math.floor(Math.random() * citiesArray.length)];
        const lat = city.lat + (Math.random() - 0.5) * 0.1;
        const lng = city.lng + (Math.random() - 0.5) * 0.1;

        // Create fake applicants for some jobs (2-3 applicants)
        const applicants = [];
        if (Math.random() > 0.5) {
          const applicantCount = 2 + Math.floor(Math.random() * 2);
          for (let a = 0; a < applicantCount; a++) {
            const skills =
              skillSets[Math.floor(Math.random() * skillSets.length)];
            const matchingSkills = skills.filter((skill) =>
              [
                "React",
                "Node.js",
                "Python",
                "AWS",
                "Docker",
                "JavaScript",
                "TypeScript",
                "Java",
                "MongoDB",
                "PostgreSQL",
              ].includes(skill),
            ).length;
            const matchScore =
              skills.length > 0
                ? Math.round((matchingSkills / skills.length) * 100)
                : 0;

            applicants.push({
              name: generateFakeName(),
              email: `applicant${jobId}-${a}@example.com`,
              skills: skills,
              experience: Math.floor(Math.random() * 8),
              matchScore: matchScore,
              appliedAt: new Date(
                Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
              ),
            });
          }
        }

        const job = {
          title: roles[Math.floor(Math.random() * roles.length)],
          company: company,
          location: city.name,
          salary: salaryRanges[Math.floor(Math.random() * salaryRanges.length)],
          tags: skillSets[Math.floor(Math.random() * skillSets.length)],
          description:
            descriptions[Math.floor(Math.random() * descriptions.length)],
          coordinates: { lat, lng },
          postedAt: new Date(
            Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
          ),
          applicants: applicants,
        };

        jobs.push(job);
        jobId++;
      }
    }

    await Job.insertMany(jobs);
    console.log(`\n✅ Successfully seeded ${jobs.length} jobs!`);
    console.log(`📊 Companies: ${companies.length}`);
    console.log(
      `👥 Total Applicants: ${jobs.reduce((sum, job) => sum + job.applicants.length, 0)}`,
    );
    console.log(
      `📍 Locations: ${[...new Set(jobs.map((j) => j.location))].join(", ")}`,
    );

    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
    process.exit(1);
  }
}

function generateFakeName() {
  const firstNames = [
    "Arjun",
    "Priya",
    "Vikram",
    "Ananya",
    "Rohan",
    "Neha",
    "Aditya",
    "Divya",
    "Karan",
    "Isha",
    "Rahul",
    "Sneha",
    "Nikhil",
    "Pooja",
    "Varun",
  ];
  const lastNames = [
    "Sharma",
    "Patel",
    "Singh",
    "Kumar",
    "Verma",
    "Reddy",
    "Gupta",
    "Nair",
    "Rao",
    "Desai",
  ];
  return (
    firstNames[Math.floor(Math.random() * firstNames.length)] +
    " " +
    lastNames[Math.floor(Math.random() * lastNames.length)]
  );
}

seedDatabase();
