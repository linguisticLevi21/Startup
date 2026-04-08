# � Job Hiring Platform

A modern, map-based job hiring platform with dual modes for job applicants and HR professionals. Browse startups on an interactive map, apply for positions, and manage applicants through an intuitive dark-themed dashboard.

![Status](https://img.shields.io/badge/status-active-brightgreen) ![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-green) ![React](https://img.shields.io/badge/react-18.2.0-blue) ![MongoDB](https://img.shields.io/badge/mongodb-7.0-green)

## ✨ Features

### Applicant Mode

- 🗺️ **Interactive Map View** - Browse job locations with company markers overlaid on OpenStreetMap
- 🔍 **Job Search & Filter** - Browse by company, location, and tech stack
- 💼 **One-Click Apply** - Quick application form with name, email, skills, and experience
- 🏙️ **City-Based Navigation** - Select from Bangalore, Mumbai, Delhi, and Remote positions
- 🌙 **Dark Theme UI** - Modern, eye-friendly interface with professional styling

### HR Mode

- 📊 **HR Dashboard** - Comprehensive view of all jobs and their applicants
- 👥 **Applicant Management** - View complete applicant list for each job
- 📋 **Applicant Details** - Name, email, skills, and experience information
- 🎯 **Applicant Sorting** - Sort candidates by experience level
- 🔗 **Quick Navigation** - Click any job to instantly view all applicants

### General Features

- 🔄 **Real-time Data** - MongoDB database with live updates
- 🎨 **Professional Dark Theme** - Eye-friendly interface with dark navy base (#0a0e27)
- 📱 **Responsive Design** - Works seamlessly on desktop and tablet
- 🏢 **15+ Real Companies** - Razorpay, Swiggy, Zomato, Flipkart, CRED, and more
- 💾 **60+ Pre-seeded Jobs** - Realistic startup positions across India
- 👨‍💼 **78+ Demo Applicants** - Test data for HR dashboard functionality

## 🛠️ Tech Stack

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Lightweight web framework
- **MongoDB** - NoSQL database for job and applicant storage
- **Mongoose** - MongoDB object modeling
- **Nodemon** - Development auto-reload
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend

- **React 18** - Modern UI library with hooks
- **Leaflet** - Lightweight interactive mapping library
- **React-Leaflet** - React wrapper for Leaflet
- **Axios** - Promise-based HTTP client
- **CSS3** - Modern styling with dark theme support
- **Responsive Design** - Mobile-first approach

## � Project Structure

````
job-platform/
├── backend/
│   ├── models/
│   │   └── Job.js              # MongoDB Job schema with applicants array
│   ├── routes/
│   │   └── jobs.js             # RESTful API endpoints
│   ├── scripts/
│   │   └── seeder.js           # Database seeding script (60 jobs, 78 applicants)
│   ├── server.js               # Express server configuration
│   ├── .env                    # Environment variables
│   ├── nodemon.json            # Nodemon configuration
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.js          # Main app with mode toggle and routing
│   │   │   ├── LandingPage.js  # Welcome screen with city selection
│   │   │   ├── MapView.js      # Interactive map and job browsing
│   │   │   ├── HRDashboard.js  # HR applicant management interface
│   │   │   ├── ApplyForm.js    # Job application form modal
│   │   │   └── JobDetails.js   # Detailed job information view
│   │   ├── api.js              # Axios API client configuration
│   │   ├── App.css             # Navbar and main layout styling
│   │   ├── LandingPage.css     # Landing page dark theme styling
│   │   ├── MapView.css         # Map container and panel styling
│   │   ├── HRDashboard.css     # Dashboard layout and card styling
│   │   └── index.js            # React app entry point
│   └── package.json
│
└── README.md                   # Documentation

## ⚙️ Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
````

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**
   Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb://localhost:27017/job-platform
PORT=5000
NODE_ENV=development
```

For MongoDB Atlas, use:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/job-platform?retryWrites=true&w=majority
```

4. **Seed the database with demo data**

```bash
npm run seed
```

This creates:

- 60 jobs across 15 companies
- 78 applicants
- 4 locations (Bangalore, Mumbai, Delhi, Remote)

5. **Start the backend server**

```bash
npm start
# or with auto-reload:
npm run dev
```

Server runs on **http://localhost:5000**

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
# or:
npm run dev
```

Frontend runs on **http://localhost:3000** (or next available port if 3000 is busy)

## 🚀 Running the Application

### One-Time Setup

```bash
# Terminal 1: Start MongoDB (if using local)
mongod

# Terminal 2: Start Backend
cd backend
npm run seed  # First time only
npm start

# Terminal 3: Start Frontend
cd frontend
npm start
```

### Accessing the Application

- **Main Application**: http://localhost:3000 (or assigned port)
- **Backend API**: http://localhost:5000/api
- **API Documentation**: See below for endpoint details

## 📚 API Endpoints

### Jobs Endpoints

| Method | Endpoint                   | Description                              |
| ------ | -------------------------- | ---------------------------------------- |
| GET    | `/api/jobs`                | Get all jobs with full applicant details |
| GET    | `/api/jobs/:id`            | Get specific job by ID with applicants   |
| GET    | `/api/jobs/:id/applicants` | Get applicants array for a specific job  |

### Application Endpoints

| Method | Endpoint     | Description              |
| ------ | ------------ | ------------------------ |
| POST   | `/api/apply` | Submit a job application |

### Request/Response Examples

**Get All Jobs**

```bash
GET http://localhost:5000/api/jobs
```

**Response Example:**

```json
[
  {
    "_id": "job_id_123",
    "title": "Frontend Developer",
    "company": "Razorpay",
    "location": "Bangalore",
    "salary": "₹12-18 LPA",
    "tags": ["React", "JavaScript", "CSS"],
    "description": "Build amazing UIs...",
    "coordinates": {
      "lat": 12.9716,
      "lng": 77.5946
    },
    "postedAt": "2024-04-08T10:00:00Z",
    "applicants": [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "skills": ["React", "JavaScript"],
        "experience": 3,
        "appliedAt": "2024-04-08T12:30:00Z"
      }
    ]
  }
]
```

**Apply for Job**

```bash
POST http://localhost:5000/api/apply
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "skills": ["React", "Node.js", "MongoDB"],
  "experience": 4,
  "jobId": "job_id_123"
}
```

**Response:**

```json
{
  "message": "Application submitted successfully"
}
```

**Get Job Applicants**

```bash
GET http://localhost:5000/api/jobs/job_id_123/applicants
```

**Response:**

```json
[
  {
    "name": "John Doe",
    "email": "john@example.com",
    "skills": ["React", "JavaScript"],
    "experience": 3,
    "appliedAt": "2024-04-08T12:30:00Z"
  },
  {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "skills": ["React", "Node.js", "MongoDB"],
    "experience": 4,
    "appliedAt": "2024-04-08T14:15:00Z"
  }
]
```

## 🎯 How It Works

### Application Workflow

```
1. Landing Page → Select city (Bangalore, Mumbai, Delhi, Remote)
   ↓
2. Map View → Browse companies and their job markers
   ↓
3. Click Company Marker → View available jobs in modal
   ↓
4. Select Job → View detailed job information
   ↓
5. Click "Apply" → Fill application form
   ↓
6. Submit → Get success confirmation
```

### HR Dashboard Workflow

```
1. Click "HR Mode" in navbar
   ↓
2. View all jobs in left sidebar
   ↓
3. Click any job → See all applicants
   ↓
4. Review applicant details (Name, Email, Skills, Experience)
   ↓
5. Applicants auto-sorted by experience level
```

## 🌱 Pre-Seeded Data

The database includes realistic startup data:

### Companies (15)

Razorpay, Swiggy, Zomato, Flipkart, CRED, Meesho, Groww, Zerodha, Freshworks, Postman, InMobi, Dream11, Unacademy, OYO, Ola

### Locations (4)

- **Bangalore** (12.9716°N, 77.5946°E)
- **Mumbai** (19.0760°N, 72.8777°E)
- **Delhi** (28.7041°N, 77.1025°E)
- **Remote**

### Jobs (60 Total)

- Distribution: 3-6 jobs per company
- Roles: Frontend Developer, Backend Developer, Full Stack, ML Engineer, Data Analyst, DevOps, Intern
- Salary Range: ₹10-120 LPA
- Tech Stack: React, Node.js, Python, AWS, Docker, Kubernetes, etc.

### Applicants (78 Total)

- Average 2-3 applicants per job
- 70% with relevant skills for target job
- 30% with different skill sets
- Real-like names and email addresses
- Experience ranging from 0-10 years

## 🎨 UI/UX Design

### Dark Theme Color Palette

| Element              | Color     | Usage                    |
| -------------------- | --------- | ------------------------ |
| Base Background      | `#0a0e27` | Main page background     |
| Secondary Background | `#111827` | Panels and cards         |
| Border Color         | `#2d3748` | Card and section borders |
| Accent Color         | `#58a6ff` | Links and highlights     |
| Primary Text         | `#c9d1d9` | Main text content        |
| Secondary Text       | `#8b949e` | Subtle text and labels   |

### Interface Components

**Landing Page**

- City selection with cards (Bangalore, Mumbai, Delhi, Remote)
- Feature highlights section
- Illustration display area
- Smooth gradient transitions

**Map View**

- 70/30 layout (map on left, companies panel on right)
- Company markers with color-coded initials
- Company cards showing name, location, job count
- Responsive panel with job list modal
- Dark map tiles with reduced brightness for visibility

**HR Dashboard**

- Left sidebar with job list
- Right panel with applicant cards
- Quick switcher to select jobs
- Applicant information: Name, Email, Skills, Experience
- Auto-sorted by experience (highest to lowest)

### Design Features

- 🌙 Professional dark theme for eye comfort
- 🎯 Minimalist, clean interface
- ⚡ Smooth transitions and animations
- 📱 Fully responsive (desktop, tablet, mobile)
- ♿ Good contrast ratios for accessibility
- 🎨 Consistent color scheme throughout

## 🚀 Deployment

### Backend Deployment (Heroku)

```bash
# Create Heroku app
heroku create job-platform-api

# Set environment variables
heroku config:set MONGO_URI=your_mongodb_connection_string
heroku config:set NODE_ENV=production

# Push to Heroku
git push heroku main

# Seed remote database
heroku run npm run seed
```

### Frontend Deployment (Vercel/Netlify)

**Vercel:**

```bash
npm install -g vercel
vercel
```

**Netlify:**

```bash
npm run build
# Deploy the 'build' folder to Netlify
```

**Environment Configuration for Deployed Frontend:**
Update `api.js` to point to deployed backend:

```javascript
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://your-api.herokuapp.com/api";
```

## 🛠️ Development

### Available Scripts

**Backend**

```bash
npm start                 # Run production server
npm run dev              # Run with nodemon (auto-reload)
npm run seed             # Reseed database with demo data
```

**Frontend**

```bash
npm start                # Start dev server with hot-reload
npm run build            # Create production build
npm run eject            # Eject from Create React App (not reversible)
```

### Development Tips

- Backend supports hot-reload with nodemon
- Frontend hot-reloads on file changes
- CORS enabled for frontend-backend communication
- MongoDB Atlas can be used instead of local MongoDB
- Use `.env` files for configuration management

### Database Management

**Reset Database**

```bash
cd backend
npm run seed
```

**Connect to MongoDB**

```bash
# Local MongoDB
mongosh
use job-platform
db.jobs.find()

# MongoDB Atlas
mongosh "mongodb+srv://username:password@cluster.mongodb.net/job-platform"
```

## 📊 Statistics

| Metric                 | Value |
| ---------------------- | ----- |
| Companies              | 15    |
| Jobs                   | 60    |
| Applicants             | 78    |
| Locations              | 4     |
| Tech Tags              | 30+   |
| API Routes             | 4     |
| React Components       | 6+    |
| CSS Files              | 6     |
| Lines of Backend Code  | 300+  |
| Lines of Frontend Code | 1000+ |

## 📝 Future Enhancements

- [ ] **User Authentication** - JWT-based login/signup for applicants and HR
- [ ] **Email Notifications** - Send confirmation emails on job application
- [ ] **Advanced Filtering** - Search by salary range, experience level, tech stack
- [ ] **Job Bookmarking** - Applicants can save favorite jobs
- [ ] **Applicant Messaging** - HR can communicate with applicants
- [ ] **Analytics Dashboard** - View application trends and statistics
- [ ] **Job Posting** - Allow companies to create and manage jobs
- [ ] **Resume Upload** - Applicants can upload resumes
- [ ] **Video Interviews** - Integrated video interview scheduling
- [ ] **Ratings & Reviews** - Applicants can rate companies
- [ ] **Multiple Languages** - i18n support (Hindi, Tamil, Telugu, etc.)
- [ ] **Mobile App** - React Native version for iOS and Android
- [ ] **Skill Verification** - Badges for verified skills
- [ ] **Job Recommendations** - ML-based job suggestions

## ⚠️ Limitations & Notes

- **No Authentication** - This is a demo version with no login system
- **No Email Sending** - Email functionality not implemented
- **No Resume Storage** - Applicants only provide text details
- **In-Memory Data** - All data is in MongoDB, resets when database is cleared
- **No Payment** - No premium features or payment integration
- **CORS Enabled** - Accepts requests from any origin (for demo purposes)

## 🐛 Troubleshooting

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:** Change port in `.env` or kill the process:

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:** Ensure MongoDB is running:

```bash
# Windows (installed globally)
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Module Not Found Error

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### CORS Error

Make sure backend is running on port 5000 and frontend API calls point to `http://localhost:5000`

### Map Not Loading

- Check browser console for Leaflet errors
- Ensure internet connection (map tiles load from CDN)
- Clear browser cache and reload

## 🔐 Security Considerations

**For Production:**

- Add JWT authentication
- Validate and sanitize all inputs
- Use HTTPS/TLS
- Implement rate limiting
- Add CSRF protection
- Use environment variables for sensitive data
- Add input validation on both frontend and backend
- Implement proper error handling (don't expose stack traces)
- Add logging and monitoring
- Use MongoDB role-based access control

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Leaflet Documentation](https://leafletjs.com/)
- [REST API Best Practices](https://restfulapi.net/)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the **MIT License**. Feel free to use, modify, and distribute.

## 🙋 Support & Questions

For issues, questions, or suggestions:

- Open an issue in the repository
- Check existing issues for similar problems
- Provide detailed error messages and steps to reproduce

## 📞 Contact

Built with ❤️ for the startup ecosystem

---

**Last Updated:** April 8, 2026  
**Version:** 2.0 (Dark Theme, No Match Score)  
**Maintainer:** Development Team
