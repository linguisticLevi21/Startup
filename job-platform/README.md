# 💼 JobHub - Map-Based Job Hiring Platform

A full-stack job hiring platform where jobs are displayed on a map, users can apply, and HR can view and filter applicants with intelligent skill-based matching.

## 🚀 Features

- **Map-Based Job Viewing**: Interactive map showing all available jobs in India (Bangalore, Delhi, Mumbai, Remote)
- **Job Applications**: Users can apply with their skills and experience
- **Smart Matching**: Automatic skill-based matching algorithm (0-100%)
- **HR Dashboard**: Comprehensive applicant management system
- **Applicant Filtering**: Sort by match score or experience
- **Real-time Data**: 200 pre-seeded startup jobs across India

## 🏗️ Tech Stack

### Backend

- Node.js + Express.js
- MongoDB + Mongoose
- CORS enabled
- RESTful API architecture

### Frontend

- React 18
- React Leaflet (OpenStreetMap integration)
- Axios for API calls
- Modern CSS with gradient designs
- Fully responsive UI

## 📋 Project Structure

```
job-platform/
├── backend/
│   ├── models/
│   │   └── Job.js              # Mongoose Job schema
│   ├── routes/
│   │   └── jobs.js             # API routes
│   ├── scripts/
│   │   └── seeder.js           # Database seeder (200 jobs)
│   ├── server.js               # Express server
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js              # Main app
│   │   ├── MapView.js          # Map interface
│   │   ├── JobDetails.js       # Job details modal
│   │   ├── ApplyForm.js        # Application form
│   │   ├── HRDashboard.js      # HR management
│   │   ├── api.js              # API service
│   │   ├── index.js
│   │   ├── App.css
│   │   ├── MapView.css
│   │   ├── JobDetails.css
│   │   ├── ApplyForm.css
│   │   └── HRDashboard.css
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   └── package.json
└── README.md
```

## ⚙️ Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (free tier available)

### Backend Setup

1. **Navigate to backend directory**

```bash
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB connection string:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/job-platform?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

4. **Seed the database with 200 jobs**

```bash
npm run seed
```

5. **Start the backend server**

```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**

```bash
cd frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 📚 API Endpoints

### Jobs

- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get job details

### Applications

- `POST /api/apply` - Submit job application
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "skills": ["React", "Node.js"],
    "experience": 3,
    "jobId": "..."
  }
  ```

### Applicants

- `GET /api/jobs/:id/applicants` - Get applicants for a job (sorted by matchScore)

## 🎯 How It Works

### Application Flow

1. User opens JobHub and sees the map with job markers
2. User searches or clicks a marker to view job details
3. User fills the application form with skills
4. System calculates match score based on skill overlap:
   - MatchScore = (Matching Skills / Job Required Skills) × 100

### HR Dashboard

1. HR logs into dashboard (no authentication required for demo)
2. Selects a job from the list
3. Views all applicants sorted by match score
4. Can filter by experience or other criteria
5. Green score (70+%), Orange (40-70%), Red (<40%)

## 🌍 Seeded Jobs

The seeder script creates 200 realistic startup jobs with:

- **Locations**: Bangalore, Delhi, Mumbai, Remote
- **Roles**: Full Stack Developer, React, Node.js, DevOps, ML Engineer, etc.
- **Companies**: TechStartup, InnovateLabs, CloudSync, etc.
- **Salary Range**: ₹15-115 LPA
- **Posted Within**: Last 30 days
- **Skills**: JavaScript, React, Node.js, Python, AWS, Docker, etc.

## 🎨 UI/UX Features

- **Clean Startup Design**: Modern gradient backgrounds, smooth animations
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Dark & Light contrast**: Easy to read with good accessibility
- **Interactive Elements**: Hover effects, smooth transitions
- **Color-coded Matching**: Green (high match), Orange (medium), Red (low)

## 🔍 Skill Matching Algorithm

```javascript
matchingSkills = applicant.skills ∩ job.tags
matchScore = (matchingSkills.length / job.tags.length) × 100
```

Example:

- Job requires: ["React", "Node.js", "MongoDB", "JavaScript"]
- Applicant has: ["React", "JavaScript"]
- Match Score: (2/4) × 100 = **50%**

## 📱 Features Breakdown

### Map View

- OpenStreetMap integration
- Markers for each job
- Search/filter functionality
- Click marker to see job details
- Real-time applicant count

### Job Details Modal

- Job title, company, location
- Salary information
- Job description
- Required skills
- Apply button

### Application Form

- Name, email, skills (comma-separated)
- Years of experience
- Real-time validation
- Match score feedback

### HR Dashboard

- Two-panel layout (jobs + applicants)
- Sort by match score or experience
- Color-coded skill matching
- Applicant contact information
- Skills display
- Application date

## 🚀 Deployment

### Backend (Heroku)

```bash
# Create Heroku app
heroku create job-platform-api

# Set environment variables
heroku config:set MONGO_URI=your_mongo_uri

# Deploy
git push heroku main
```

### Frontend (Netlify/Vercel)

```bash
npm run build
# Deploy the build folder to Netlify or Vercel
```

## 🛠️ Development Tips

- **Hot Reload**: Frontend has hot reload enabled
- **CORS**: Backend allows requests from any origin
- **Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error messages

## 📝 Future Enhancements

- User authentication (JWT)
- Email notifications
- Advanced filtering by salary, skills, location
- Job bookmarking
- Applicant messaging system
- Analytics dashboard
- Job posting by companies
- Resume uploads
- Video interviews

## 🤝 Contributing

Feel free to fork and contribute! Make a pull request with your improvements.

## 📄 License

MIT License - feel free to use this project for learning

## 🙋 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ for the startup ecosystem** 🚀
