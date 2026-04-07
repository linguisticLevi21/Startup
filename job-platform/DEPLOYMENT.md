# Deployment Guide - JobHub

## 🌐 Deploying to Production

### Prerequisites

- GitHub account
- Heroku account (for backend)
- Netlify/Vercel account (for frontend)
- MongoDB Atlas account (free tier)

---

## Backend Deployment (Heroku)

### Step 1: Prepare Heroku

```bash
npm install -g heroku
heroku login
cd backend
```

### Step 2: Create Heroku App

```bash
heroku create job-platform-backend
# or specify a name:
heroku create my-jobhub-api
```

### Step 3: Set Environment Variables

```bash
heroku config:set MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/job-platform
heroku config:set NODE_ENV=production
heroku config:set PORT=3000
```

### Step 4: Deploy

```bash
git push heroku main
# or if on development branch:
git push heroku development:main
```

### Step 5: Verify Deployment

```bash
# Check logs
heroku logs --tail

# Test API
curl https://my-jobhub-api.herokuapp.com/api/jobs
```

---

## Frontend Deployment (Netlify)

### Option A: Using Netlify CLI

```bash
npm install -g netlify-cli
cd frontend

# Build the app
npm run build

# Deploy
netlify deploy --prod --dir=build
```

### Option B: Using GitHub Integration

1. Push frontend to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "New site from Git"
4. Connect GitHub repository
5. Set build command: `npm run build`
6. Set publish directory: `build`
7. Add environment variable: `REACT_APP_API_URL=https://my-jobhub-api.herokuapp.com`

### Step 3: Update Frontend API URL

In `frontend/src/api.js`:

```javascript
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
```

---

## Frontend Deployment (Vercel)

### Step 1: Push to GitHub

```bash
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Set root directory: `frontend`
5. Add environment variable:
   - `REACT_APP_API_URL=https://my-jobhub-api.herokuapp.com`

### Step 3: Deploy

- Vercel will auto-deploy on every push to main

---

## Database: MongoDB Atlas (Cloud)

### Already Using Cloud? Great!

- No additional setup needed
- Keep your connection string secure in environment variables
- Set IP whitelist to allow app IPs

### Backup & Restore

```bash
# Create backup
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/job-platform"

# Restore
mongorestore --uri "mongodb+srv://user:pass@cluster.mongodb.net/job-platform" dump/
```

---

## Configuration Checklist

### Backend (.env)

```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/job-platform
PORT=3000
NODE_ENV=production
```

### Frontend Environment

```
REACT_APP_API_URL=https://my-jobhub-api.herokuapp.com
REACT_APP_ENVIRONMENT=production
```

---

## Domain Setup

### Backend (Heroku)

1. Buy domain on GoDaddy/Namecheap/Route53
2. In Heroku app settings: Add domain
3. Update DNS to point to Heroku

```
CNAME: my-api.jobhub.com → my-jobhub-api.herokuapp.com
```

### Frontend (Netlify/Vercel)

1. In Netlify/Vercel settings: Add custom domain
2. Automatic SSL certificate included

---

## Monitoring & Maintenance

### Heroku

```bash
# Check logs
heroku logs --tail

# Monitor metrics
heroku ps

# Scale dynos if needed
heroku ps:scale web=2
```

### Netlify/Vercel

- Dashboard shows deployment history
- Analytics available
- Automatic rollback on failed builds

---

## Cost Estimates

| Service       | Free Tier    | Cost            |
| ------------- | ------------ | --------------- |
| MongoDB Atlas | 512 MB       | Free (generous) |
| Heroku        | ✅ (limited) | $7-50+/month    |
| Netlify       | ✅           | Free (generous) |
| Vercel        | ✅           | Free (generous) |
| Domain        | -            | $10-15/year     |

**Total Monthly Cost: $7-30** (for small-medium traffic)

---

## Performance Tips

### Backend Optimization

```javascript
// Add caching headers
app.use((req, res, next) => {
  res.set("Cache-Control", "public, max-age=300");
  next();
});

// Add compression
const compression = require("compression");
app.use(compression());

// Add rate limiting
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);
```

### Frontend Optimization

- Code splitting: Already done by Create React App
- Lazy loading: Implement for routes
- Image optimization: Use WebP format

---

## Troubleshooting

### Heroku Build Fails

```bash
# Clear cache
heroku builds:cache:purge

# Rebuild
git push heroku main
```

### CORS Issues

```javascript
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  }),
);
```

### MongoDB Connection Timeout

- Add IP to MongoDB Atlas whitelist
- Check connection string
- Verify network connectivity

---

## CI/CD Pipeline (Optional)

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: |
          git push https://heroku:$HEROKU_API_KEY@git.heroku.com/my-jobhub-api.git main
```

---

## Post-Deployment

1. ✅ Test all APIs in production
2. ✅ Test user flows (apply, search, HR dashboard)
3. ✅ Monitor logs for errors
4. ✅ Set up automated backups
5. ✅ Configure error tracking (Sentry)
6. ✅ Set up analytics (Google Analytics)

---

## Rollback Procedure

### Heroku

```bash
heroku releases
heroku rollback v10  # rollback to previous version
```

### Netlify/Vercel

- One-click rollback from dashboard
- Automatic if build fails

---

## Security Checklist

- ✅ HTTPS enabled
- ✅ Environment variables not in code
- ✅ API rate limiting
- ✅ CORS properly configured
- ✅ MongoDB authentication enabled
- ✅ Input validation on backend
- ✅ Error messages don't leak sensitive data

---

## Support

For deployment issues:

1. Check Heroku documentation
2. Check Netlify/Vercel documentation
3. Review application logs
4. Test locally first

Happy deploying! 🚀
