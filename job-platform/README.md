# Startup Arena

Short, practical README that explains what each major part is and why it exists.

## What This Project Is

Startup Arena is a full-stack hiring app with two user paths:

1. Applicant path: discover jobs on a map and apply quickly.
2. HR path: review applicants, check match score, accept or reject.

Why this design:

- Map-first browsing makes job discovery faster by city.
- HR dashboard keeps screening simple in one place.
- One backend API supports both roles.

## Tech Stack and Why

### Backend

- Node.js + Express: lightweight REST API and fast development.
- MongoDB: flexible document model for jobs and nested applicants.
- Mongoose: schema validation and clean DB queries.
- dotenv: keeps secrets/config out of code.
- CORS: allows frontend and backend to run on different ports.

### Frontend

- React 18: component-based UI and predictable state handling.
- Axios: simple API request wrapper.
- Leaflet + React-Leaflet: interactive map and markers.
- CSS: custom styling for dark dashboard look.

## Architecture in 30 Seconds

1. React UI sends requests using Axios.
2. Express routes process business logic.
3. Mongoose reads/writes MongoDB.
4. JSON response updates React state.

Why this architecture:

- Clear separation of UI, API, and data.
- Easy to debug and scale module by module.

## Key Files and Why They Matter

### Backend

- backend/server.js: app bootstrap, middleware, Mongo connection, route mount.
- backend/routes/jobs.js: all hiring API logic.
- backend/models/Job.js: job and applicant schema definitions.
- backend/scripts/seeder.js: demo dataset generation for quick testing.

### Frontend

- frontend/src/index.js: React entry point.
- frontend/src/App.js: top-level role/view switching.
- frontend/src/MapView.js: map search and startup markers.
- frontend/src/JobDetails.js: job detail and apply trigger.
- frontend/src/ApplyModal.js: applicant form submit.
- frontend/src/HRDashboard.js: candidate review and actions.
- frontend/src/api.js: centralized API calls.

## Core Business Logic (Brief)

### Match Score

Compares applicant skills with job tags.

Formula:

matchScore = round((matchedSkills / requiredSkills) \* 100)

Why:

- Gives HR a quick shortlist signal.
- Keeps scoring simple and explainable.

### Application Rules

- All required fields must be present.
- Same email cannot apply twice for same job.
- Cannot apply/accept if openings are full.

Why:

- Prevents duplicate and invalid submissions.
- Keeps job capacity logic consistent.

## API Summary

Base URL: http://localhost:5000/api

- GET /jobs
- GET /jobs/:id
- GET /jobs/:id/applicants
- POST /apply
- POST /accept
- POST /reject

## Quick Start

### Prerequisites

- Node.js 18+
- npm
- MongoDB local or Atlas

### 1. Configure Backend Env

Create backend/.env:

```env
MONGO_URI=mongodb://localhost:27017/
PORT=5000
NODE_ENV=development
```

### 2. Install

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Seed Data

```bash
cd ../backend
npm run seed
```

### 4. Run App

Terminal A:

```bash
cd backend
npm start
```

Terminal B:

```bash
cd frontend
npm start
```

Open:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

Demo HR login: hr@test.com

## Docker (Optional)

```bash
docker compose up --build
```

Why Docker:

- Same setup across machines.
- Faster onboarding.

## Common Issues

- Mongo connection fails: check Mongo service and MONGO_URI.
- Frontend API fails: ensure backend is running on 5000.
- Seed fails: run from backend folder and verify env.

## Authors

- Shahadat
- Abhishek
