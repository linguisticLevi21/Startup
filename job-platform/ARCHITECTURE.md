# Project Structure & Architecture

## 📁 Complete File Structure

```
job-platform/
│
├── README.md                      # Main documentation
├── QUICK_START.md                # 5-minute quick start
├── TESTING_GUIDE.md              # Comprehensive testing guide
├── DEPLOYMENT.md                 # Production deployment guide
├── API_DOCUMENTATION.md          # API endpoint reference
├── docker-compose.yml            # Docker Compose configuration
├── .gitignore                    # Git ignore rules
│
├── backend/
│   ├── package.json              # Node dependencies
│   ├── server.js                 # Express server entry point
│   ├── Dockerfile                # Docker configuration
│   ├── .gitignore               # Backend git ignore
│   ├── .env.example             # Environment template
│   │
│   ├── models/
│   │   └── Job.js               # Mongoose Job schema
│   │
│   ├── routes/
│   │   └── jobs.js              # API routes & controllers
│   │
│   └── scripts/
│       └── seeder.js            # Database seeder (200 jobs)
│
└── frontend/
    ├── package.json             # React dependencies
    ├── Dockerfile               # Frontend Docker
    ├── .gitignore              # Frontend git ignore
    │
    ├── public/
    │   ├── index.html           # Main HTML file
    │   └── manifest.json        # PWA manifest
    │
    └── src/
        ├── index.js             # React entry point
        ├── App.js               # Main component
        ├── api.js               # API client
        │
        ├── Components/
        │   ├── MapView.js       # Map interface
        │   ├── JobDetails.js    # Job modal
        │   ├── ApplyForm.js     # Application form
        │   └── HRDashboard.js   # HR management
        │
        └── Styles/
            ├── index.css        # Global styles
            ├── App.css          # Main app styles
            ├── MapView.css      # Map styles
            ├── JobDetails.css   # Modal styles
            ├── ApplyForm.css    # Form styles
            └── HRDashboard.css  # Dashboard styles
```

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Browser (Port 3000)                                 │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │ App.js (Navigation)                              │ │   │
│  │  │ ┌──────────────┬──────────────────────────────┐  │ │   │
│  │  │ │ MapView      │ HRDashboard                  │  │ │   │
│  │  │ │ - Jobs Map   │ - Job List                   │  │ │   │
│  │  │ │ - Markers    │ - Applicants                 │  │ │   │
│  │  │ │ - Search     │ - Sorting                    │  │ │   │
│  │  │ └──────────────┴──────────────────────────────┘  │ │   │
│  │  │           ↓                                       │ │   │
│  │  │ ┌─────────────────────────────────────────────┐ │ │   │
│  │  │ │ JobDetails Modal │ ApplyForm Modal         │ │ │   │
│  │  │ └─────────────────────────────────────────────┘ │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────┬───────────────────────────────────────────┘
                   │ HTTP Requests
                   │ (Axios)
                   ↓
┌─────────────────────────────────────────────────────────────┐
│                     Backend (Express)                        │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Server (Port 5000)                                   │   │
│  │ ┌─────────────────────────────────────────────────┐  │   │
│  │ │ Middleware                                      │  │   │
│  │ │ - CORS                                          │  │   │
│  │ │ - express.json()                               │  │   │
│  │ └─────────────────────────────────────────────────┘  │   │
│  │           ↓                                          │   │
│  │ ┌─────────────────────────────────────────────────┐  │   │
│  │ │ API Routes (/api/jobs)                          │  │   │
│  │ │ GET    /jobs          → getJobs()              │  │   │
│  │ │ GET    /jobs/:id      → getJobById()           │  │   │
│  │ │ POST   /apply         → applyForJob()          │  │   │
│  │ │ GET    /jobs/:id/applicants → getApplicants() │  │   │
│  │ └─────────────────────────────────────────────────┘  │   │
│  │           ↓                                          │   │
│  │ ┌─────────────────────────────────────────────────┐  │   │
│  │ │ Models (Mongoose Schemas)                       │  │   │
│  │ │ Job {                                           │  │   │
│  │ │   title, company, location, salary             │  │   │
│  │ │   tags, description, coordinates               │  │   │
│  │ │   postedAt, applicants[]                       │  │   │
│  │ │ }                                               │  │   │
│  │ └─────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────┬───────────────────────────────────────────┘
                   │ Query
                   ↓
┌─────────────────────────────────────────────────────────────┐
│                     Database (MongoDB)                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Collections                                          │   │
│  │ ┌───────────────────────────────────────────────┐    │   │
│  │ │ jobs (200 documents)                          │    │   │
│  │ │ {                                              │    │   │
│  │ │   _id, title, company, location, salary,      │    │   │
│  │ │   tags, description, coordinates, postedAt,   │    │   │
│  │ │   applicants: [                                │    │   │
│  │ │     { name, email, skills, experience,        │    │   │
│  │ │       matchScore, appliedAt }                  │    │   │
│  │ │   ]                                             │    │   │
│  │ │ }                                               │    │   │
│  │ └───────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow Diagrams

### Application Submission Flow

```
User (Frontend)
    ↓ Fills Form
    ↓ name, email, skills, experience, jobId
Application Form Component
    ↓ On Submit
    ↓ Call api.applyForJob(data)
Axios HTTP
    ↓ POST /api/apply
Express Backend
    ↓ Route Handler
    ↓ Find Job by ID
MongoDB
    ↓ Get Job Document
    ↓ Calculate Match Score
    ↓ (matching_skills / total_tags) × 100
Express
    ↓ Push Applicant to job.applicants
    ↓ job.save()
MongoDB
    ↓ Store Updated Job
Express
    ↓ Return { message, matchScore }
Axios
    ↓ Response
Frontend
    ↓ Show Success with Match Score
User
```

### HR Dashboard Data Fetch

```
User Clicks HR Dashboard
    ↓
Frontend App.js
    ↓ state: currentView = 'hr'
    ↓ Render <HRDashboard />
HRDashboard Component
    ↓ useEffect() on mount
    ↓ Call api.getJobs()
Axios HTTP
    ↓ GET /api/jobs
Express Backend
    ↓ Route Handler
MongoDB
    ↓ job.find() (exclude applicants)
    ↓ Return 200 jobs
Axios
    ↓ Store in state.jobs
Frontend
    ↓ Render jobs list
User sees job list
    ↓ Clicks job
    ↓ handleSelectJob(job)
Frontend
    ↓ Set selectedJob state
    ↓ Call api.getApplicants(jobId)
Axios HTTP
    ↓ GET /api/jobs/:id/applicants
Express Backend
    ↓ Route Handler
MongoDB
    ↓ findById - get full job with applicants
    ↓ Sort applicants by matchScore DESC
Express
    ↓ Return sorted applicants[]
Axios
    ↓ Store in state.applicants
Frontend
    ↓ Render applicants grid
    ↓ Color-coded by match score
User sees applicants
```

### Match Score Calculation

```
Job Requirements:
- tags: ["React", "Node.js", "MongoDB", "JavaScript"]
- Total: 4 skills

Applicant Skills:
- skills: ["React", "JavaScript", "Python"]

Matching Algorithm:
    matchingSkills = []
    for each applicant.skill:
        if job.tags.includes(skill):
            matchingSkills.push(skill)

    # Result: ["React", "JavaScript"] = 2 matches

Match Score Formula:
    matchScore = (2 / 4) × 100 = 50%

Result: 50% Match Score ✅
```

## 📊 Database Schema

### Job Collection

```javascript
{
  _id: ObjectId,
  title: String,                    // "Full Stack Developer"
  company: String,                  // "TechStartup 1"
  location: String,                 // "Bangalore"
  salary: String,                   // "₹45 - ₹75 LPA"
  tags: [String],                   // ["React", "Node.js", "MongoDB"]
  description: String,              // Job description
  coordinates: {
    lat: Number,                    // 12.9716
    lng: Number                     // 77.5946
  },
  postedAt: Date,                   // 2024-04-07T10:30:00Z
  applicants: [{                    // Array of applicants
    name: String,
    email: String,
    skills: [String],
    experience: Number,
    matchScore: Number,             // 0-100
    appliedAt: Date
  }],
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🔐 Security Features

### Current (Demo)

- CORS enabled for all origins
- No authentication required
- Input validation on backend
- MongoDB injection prevention (Mongoose)

### Production Ready (Recommendations)

```
Security Checklist:
- [ ] JWT authentication
- [ ] HTTPS/TLS encryption
- [ ] Rate limiting
- [ ] Input sanitization
- [ ] CORS whitelist specific domains
- [ ] API key rotation
- [ ] Audit logging
- [ ] CSRF protection
- [ ] Password hashing
- [ ] Data encryption at rest
```

## 🚀 Performance Optimization

### Current State

- RESTful API (stateless)
- MongoDB indexing on \_id
- Frontend optimized with React hooks
- Leaflet map with lazy loading
- CSS Grid for responsive layout

### Optimization Opportunities

```
Backend:
- [ ] Add database indexes on {location, tags}
- [ ] Implement pagination
- [ ] Add caching (Redis)
- [ ] Compress API responses
- [ ] Add CDN for static assets

Frontend:
- [ ] Code splitting by routes
- [ ] Image optimization
- [ ] Service Worker caching
- [ ] Lazy load components
- [ ] Bundle size optimization
```

## 🔄 Deployment Architecture

### Development

```
Local Machine (Port 3000 & 5000)
  ├── Frontend (npm start)
  ├── Backend (npm run dev)
  └── MongoDB Local/Cloud
```

### Production

```
CDN
  ↓
Frontend (Netlify/Vercel)
  ↓
Backend (Heroku)
  ↓
MongoDB Atlas (Cloud)
```

## 📈 Scalability Plan

### Phase 1 (Current - 200 jobs)

- Single Express server
- Single MongoDB collection
- Frontend on CDN

### Phase 2 (1000+ jobs)

- Database indexing
- Redis caching layer
- Load balancing

### Phase 3 (10000+ jobs)

- Microservices architecture
- Elasticsearch for search
- GraphQL API
- Message queues

## 🛠️ Tech Stack Rationale

| Layer      | Tech         | Why                              |
| ---------- | ------------ | -------------------------------- |
| Frontend   | React        | Component-based, large ecosystem |
| Routing    | React Router | Standard for SPAs                |
| HTTP       | Axios        | Promise-based, interceptors      |
| Maps       | Leaflet      | Lightweight, open-source         |
| Backend    | Express      | Minimal, flexible, fast          |
| Database   | MongoDB      | Document-based, scalable         |
| ODM        | Mongoose     | Schema validation, hooks         |
| Deployment | Docker       | Containerization, consistency    |

## 📚 Key Concepts

### RESTful API

```
POST   /api/apply
GET    /api/jobs
GET    /api/jobs/:id
GET    /api/jobs/:id/applicants
```

### Matching Algorithm

```
Score = (Matching Skills / Total Required) × 100
```

### Component Hierarchy

```
App
  ├── MapView (Map + JobDetails + ApplyForm)
  └── HRDashboard
```

### State Management

- React hooks (useState, useEffect)
- Props drilling for data
- API calls on component mount

## 🎯 File Dependencies

```
Frontend:
App.js
  ├── MapView.js
  │   ├── JobDetails.js
  │   │   └── ApplyForm.js
  │   └── api.js
  └── HRDashboard.js
      └── api.js

Backend:
server.js
  ├── mongoose.connect()
  ├── middleware
  └── routes/jobs.js
      └── models/Job.js

Scripts:
seeder.js
  └── models/Job.js
```

## 📝 Environment Variables

### Backend (.env)

```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
PORT=5000
NODE_ENV=development
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

## 🧪 Testing Coverage

- Unit: API endpoints
- Integration: Frontend ↔ Backend
- E2E: Complete user workflows
- Performance: Load times
- Responsive: Mobile ↔ Desktop

---

**This architecture provides:**

- ⚡ Performance
- 🔒 Security
- 📈 Scalability
- 🚀 Ease of deployment
- 🛠️ Maintainability
