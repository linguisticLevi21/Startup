# Quick Start Guide - JobHub

## 🚀 Get Started in 5 Minutes

### Step 1: MongoDB Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (M0 free tier)
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/job-platform?retryWrites=true&w=majority`

### Step 2: Backend Setup

```bash
cd backend
npm install
cp .env.example .env

# Edit .env with your MongoDB URI
# MONGO_URI=mongodb+srv://...

npm run seed      # Seed 200 jobs
npm run dev       # Start server on port 5000
```

### Step 3: Frontend Setup (New Terminal)

```bash
cd frontend
npm install
npm start         # Starts on http://localhost:3000
```

### Step 4: Explore!

**Map View (User Side)**

- Click "🗺️ Jobs Map" button
- Search for jobs by title or location
- Click markers to see job details
- Fill application form to apply

**HR Dashboard (Recruiter Side)**

- Click "👥 HR Dashboard" button
- Select a job to view applicants
- Sort by match score or experience
- See color-coded skill matching

## 📊 What Happens When You Apply?

1. User enters: name, email, skills (comma-separated), experience
2. Backend removes spaces and splits skills
3. Calculates match score: `(skills overlap / job required skills) × 100`
4. Stores application in database
5. Shows match percentage to user

Example:

```
Job needs: React, Node.js, MongoDB, JavaScript
You have: React, JavaScript, Python
Match Score: (2/4) × 100 = 50%
```

## 🗺️ Seeded Job Locations

- **Bangalore** (12.9716° N, 77.5946° E) - Tech Hub
- **Delhi** (28.7041° N, 77.1025° E) - Capital
- **Mumbai** (19.0760° N, 72.8777° E) - Financial Center
- **Remote** (20.5937° N, 78.9629° E) - Distributed

Total: 200 jobs across all cities

## 🔧 Troubleshooting

### MongoDB Connection Error

- Check your connection string in `.env`
- Ensure IP whitelist includes your IP in MongoDB Atlas
- Verify username/password are correct

### Port Already in Use

- Backend: Change `PORT=5001` in `.env`
- Frontend: Run `npm start -- --port 3001`

### Module Not Found

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Map Not Loading

- Check browser console for errors
- Ensure internet connection (needs OpenStreetMap tiles)

## 📱 Testing Scenarios

### Scenario 1: Perfect Match

- Job: React, Node.js, MongoDB, JavaScript
- Apply with: React, Node.js, MongoDB, JavaScript
- Result: ✅ 100% Match

### Scenario 2: Partial Match

- Job: React, Node.js, MongoDB, JavaScript
- Apply with: React, JavaScript
- Result: ⚠️ 50% Match

### Scenario 3: No Match

- Job: Java, Spring Boot, MySQL
- Apply with: Python, Django, PostgreSQL
- Result: ❌ 0% Match

## 📊 Sample Test Data

**Test Application Details:**

- Name: John Developer
- Email: john@example.com
- Skills: React, Node.js, MongoDB, TypeScript
- Experience: 4 years

## 🎯 Features You Can Try

1. **Search**: Filter jobs by title/company/location
2. **Map Interactions**: Zoom, pan, click markers
3. **Applications**: Apply to multiple jobs
4. **Duplicate Check**: Can't apply to same job twice
5. **Sorting**: View best matches first in HR dashboard

## 🚀 Next Steps

After exploring:

1. Customize the seeded jobs in `scripts/seeder.js`
2. Add authentication with JWT
3. Deploy to Heroku (backend) and Netlify (frontend)
4. Add email notifications
5. Implement resume uploads

## 💡 Pro Tips

- Open DevTools (F12) to see API calls in Network tab
- Check browser console for any errors
- Test with different skill combinations
- Try filtering on the HR dashboard
- Check applicant match scores for each job

---

Need help? Check the main [README.md](README.md) for detailed documentation!
