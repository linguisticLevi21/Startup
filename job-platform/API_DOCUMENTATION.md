# API Documentation - JobHub

## Base URL

- **Development**: `http://localhost:5000/api`
- **Production**: `https://my-jobhub-api.herokuapp.com/api`

---

## Endpoints

### 1. Get All Jobs

**Request:**

```
GET /api/jobs
```

**Response:**

```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Full Stack Developer",
    "company": "TechStartup 1",
    "location": "Bangalore",
    "salary": "₹45 - ₹75 LPA",
    "tags": ["React", "Node.js", "MongoDB", "JavaScript"],
    "description": "Join our fast-growing startup...",
    "coordinates": {
      "lat": 12.9716,
      "lng": 77.5946
    },
    "postedAt": "2024-04-07T10:30:00.000Z",
    "applicants": []
  }
]
```

**Status Codes:**

- `200` - Success
- `500` - Server error

---

### 2. Get Job by ID

**Request:**

```
GET /api/jobs/:id
```

**Parameters:**

- `id` (string, required) - MongoDB job ID

**Response:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Full Stack Developer",
  "company": "TechStartup 1",
  "location": "Bangalore",
  "salary": "₹45 - ₹75 LPA",
  "tags": ["React", "Node.js", "MongoDB", "JavaScript"],
  "description": "Join our fast-growing startup...",
  "coordinates": {
    "lat": 12.9716,
    "lng": 77.5946
  },
  "postedAt": "2024-04-07T10:30:00.000Z",
  "applicants": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com",
      "skills": ["React", "Node.js"],
      "experience": 3,
      "matchScore": 50,
      "appliedAt": "2024-04-07T11:20:00.000Z"
    }
  ]
}
```

**Status Codes:**

- `200` - Success
- `404` - Job not found
- `500` - Server error

---

### 3. Submit Application

**Request:**

```
POST /api/apply
Content-Type: application/json
```

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "skills": ["React", "Node.js", "MongoDB"],
  "experience": 3,
  "jobId": "507f1f77bcf86cd799439011"
}
```

**Required Fields:**

- `name` (string) - Applicant name
- `email` (string) - Valid email address
- `skills` (array) - Array of skills or comma-separated string
- `experience` (number) - Years of experience
- `jobId` (string) - MongoDB job ID

**Response (Success):**

```json
{
  "message": "Application submitted successfully",
  "matchScore": 75
}
```

**Response (Already Applied):**

```json
{
  "error": "Already applied to this job"
}
```

**Status Codes:**

- `201` - Application created
- `400` - Bad request (missing fields or duplicate application)
- `404` - Job not found
- `500` - Server error

**Match Score Calculation:**

```
matchScore = (matching_skills / job_required_skills) × 100

Example:
- Job tags: ["React", "Node.js", "MongoDB", "JavaScript"]
- Applicant skills: ["React", "JavaScript", "Python"]
- Matching: ["React", "JavaScript"] = 2
- matchScore = (2 / 4) × 100 = 50%
```

---

### 4. Get Job Applicants

**Request:**

```
GET /api/jobs/:id/applicants
```

**Parameters:**

- `id` (string, required) - MongoDB job ID

**Response:**

```json
[
  {
    "name": "Alice Developer",
    "email": "alice@example.com",
    "skills": ["React", "Node.js", "MongoDB", "JavaScript"],
    "experience": 5,
    "matchScore": 100,
    "appliedAt": "2024-04-07T10:00:00.000Z"
  },
  {
    "name": "Bob Coder",
    "email": "bob@example.com",
    "skills": ["React", "JavaScript"],
    "experience": 2,
    "matchScore": 50,
    "appliedAt": "2024-04-07T11:00:00.000Z"
  }
]
```

**Notes:**

- Results are sorted by `matchScore` (descending)
- Highest match score appears first

**Status Codes:**

- `200` - Success
- `404` - Job not found
- `500` - Server error

---

## Error Responses

**Bad Request (400):**

```json
{
  "error": "Missing required fields"
}
```

**Duplicate Application:**

```json
{
  "error": "Already applied to this job"
}
```

**Not Found (404):**

```json
{
  "error": "Job not found"
}
```

**Server Error (500):**

```json
{
  "error": "error message"
}
```

---

## Request Examples

### Using cURL

**Get all jobs:**

```bash
curl http://localhost:5000/api/jobs
```

**Get specific job:**

```bash
curl http://localhost:5000/api/jobs/507f1f77bcf86cd799439011
```

**Submit application:**

```bash
curl -X POST http://localhost:5000/api/apply \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "skills": ["React", "Node.js"],
    "experience": 3,
    "jobId": "507f1f77bcf86cd799439011"
  }'
```

**Get applicants for job:**

```bash
curl http://localhost:5000/api/jobs/507f1f77bcf86cd799439011/applicants
```

### Using JavaScript (Fetch API)

```javascript
// Get all jobs
fetch("http://localhost:5000/api/jobs")
  .then((res) => res.json())
  .then((jobs) => console.log(jobs));

// Submit application
fetch("http://localhost:5000/api/apply", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    skills: ["React", "Node.js"],
    experience: 3,
    jobId: "507f1f77bcf86cd799439011",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log("Match Score:", data.matchScore));
```

### Using Axios

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Get all jobs
api.get("/jobs").then((res) => console.log(res.data));

// Apply for job
api
  .post("/apply", {
    name: "John Doe",
    email: "john@example.com",
    skills: ["React", "Node.js"],
    experience: 3,
    jobId: "507f1f77bcf86cd799439011",
  })
  .then((res) => console.log("Match Score:", res.data.matchScore));
```

---

## Rate Limiting

Currently no rate limiting is implemented for demo purposes.

**Production recommendations:**

- 100 requests per 15 minutes per IP
- 1000 requests per hour per user

---

## CORS Configuration

**Currently enabled for all origins**

Production configuration:

```javascript
app.use(
  cors({
    origin: "https://yourdomain.com",
    credentials: true,
  }),
);
```

---

## Authentication

**No authentication required** for this demo version.

**Production recommendations:**

- Implement JWT for user sessions
- Add rate limiting per user
- Add role-based access (User, HR, Admin)

---

## Pagination (Future)

Currently returns all jobs. For production, add:

```
GET /api/jobs?page=1&limit=20
```

---

## Filtering (Future)

Add endpoints for filtering:

```
GET /api/jobs?location=Bangalore&minSalary=40
GET /api/jobs?skills=React,Node.js
```

---

## Webhooks (Future)

Subscribe to events:

```
POST /api/webhooks
{
  "event": "application_submitted",
  "url": "https://your-api.com/webhook"
}
```

---

## Version

**API Version:** 1.0.0  
**Last Updated:** April 2024

---

## Support

For API issues, please check:

1. Request format and headers
2. MongoDB connection
3. Server logs: `npm run dev`
4. Check for validation errors in response
