# Testing & Features Guide - JobHub

## 🧪 Complete Testing Workflow

### Pre-Flight Checklist

- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:3000`
- [ ] MongoDB connected
- [ ] 200 jobs seeded successfully
- [ ] No console errors

---

## Part 1: Map View Testing

### Feature: Job Discovery

**Test Case 1: View All Jobs on Map**

1. Navigate to `http://localhost:3000`
2. Click "🗺️ Jobs Map" tab
3. Map should show with job markers spread across India

**Expected Results:**

- ✅ Map centered on India
- ✅ Multiple colored markers visible
- ✅ Zoom controls present
- ✅ Pan interactions work

---

### Feature: Job Markers

**Test Case 2: Click On Marker**

1. On map view, click any marker
2. Popup should appear with job info

**Expected Data:**

- Job title
- Company name
- Location
- Salary

**Test Case 3: Marker Clustering**

1. Zoom out to see multiple markers
2. Notice markers appear closer together in same cities
3. Zoom in to spread them out

**Expected:** Natural marker distribution across cities

---

### Feature: Search Functionality

**Test Case 4: Search by Job Title**

1. In search box, type "React"
2. Map should filter to show only React jobs
3. Counter updates showing results

**Test Case 5: Search by Company**

1. Type "TechStartup" in search
2. Filter by company name works

**Test Case 6: Search by Location**

1. Type "Bangalore" or "Remote"
2. Shows jobs in that location
3. Counter updates correctly

**Test Case 7: Clear Search**

1. Clear search box
2. All 200 jobs appear again
3. Counter shows "200 of 200 jobs"

**Expected Results:**

- ✅ Real-time filtering
- ✅ Case-insensitive search
- ✅ Counter updates accurately

---

## Part 2: Job Application Testing

### Feature: View Job Details

**Test Case 8: Click Marker and View Details**

1. Click any map marker
2. Job details modal should appear

**Modal should show:**

- Job title (large)
- Company name
- Location with 📍
- Salary with 💰
- Posted date
- Description
- Required skills (as blue tags)
- Apply button

**Test Case 9: Open Details from Search Results**

1. Search for specific job
2. Click marker
3. Modal shows correct job details

---

### Feature: Application Form

**Test Case 10: Basic Application - Perfect Match**

1. Click "Apply Now" button
2. Fill form:
   - Name: `John Developer`
   - Email: `john@example.com`
   - Skills: Copy paste required skills exactly
   - Experience: `5`
3. Click "Apply Now"

**Expected Results:**

- ✅ Success message appears
- ✅ Match Score shows **100%**
- ✅ Modal closes after 1.5 seconds

**Example:**

```
Job requires: React, Node.js, MongoDB, JavaScript
Apply with: React, Node.js, MongoDB, JavaScript
Match: 4/4 = 100% ✅
```

---

**Test Case 11: Partial Match Application**

1. Apply to React job with:
   - Skills: `React, JavaScript, Python`
   - Where job requires: `React, Node.js, MongoDB, JavaScript`

**Expected Results:**

- ✅ Match Score shows **50%** (2/4 matching)
- ✅ Success message appears

---

**Test Case 12: No Match Application**

1. Apply with completely different skills:
   - Skills: `Java, Spring Boot, MySQL`
   - Job requires: `React, Node.js, MongoDB`

**Expected Results:**

- ✅ Match Score shows **0%**
- ✅ Application still accepted

---

**Test Case 13: Duplicate Application Prevention**

1. Apply to same job twice with same email
2. Try to apply again

**Expected Results:**

- ❌ Error message: "Already applied to this job"
- ✅ Cannot submit duplicate

---

**Test Case 14: Validation Tests**

1. Try submitting empty form
2. Try empty name
3. Try invalid email

**Expected Results:**

- ✅ Required field validation
- ✅ Email validation works
- ✅ Cannot submit incomplete form

---

**Test Case 15: Skill Format Handling**
Try different skill input formats:

1. "React, Node.js, MongoDB" ✅ Comma-separated
2. "React" ✅ Single skill
3. "React,Node.js,MongoDB" ✅ No spaces
4. "React , Node.js , MongoDB" ✅ Extra spaces

**Expected Results:**

- ✅ All formats accepted
- ✅ Skills correctly parsed
- ✅ Match score calculates correctly

---

**Test Case 16: Experience Input**

1. Try experience: `0` (fresher)
2. Try experience: `10` (veteran)
3. Try experience: `-5` (negative - should fail)
4. Try experience: `999` (very high)

**Expected Results:**

- ✅ 0 accepted
- ✅ 10 accepted
- ✅ Negative rejected
- ✅ Large numbers accepted

---

## Part 3: HR Dashboard Testing

### Feature: Job Selection

**Test Case 17: Load HR Dashboard**

1. Click "👥 HR Dashboard" tab
2. Dashboard should load with two panels:
   - Left: List of jobs
   - Right: Applicants (empty until job selected)

**Expected Results:**

- ✅ All 200 jobs listed on left
- ✅ Jobs sorted (first applied jobs shown first)
- ✅ Each job shows applicant count
- ✅ Right panel shows "Select a job to view applicants"

---

**Test Case 18: Select Job**

1. Click on any job in left panel
2. Job should highlight (blue border)
3. Right panel should populate

**Expected Results:**

- ✅ Job highlights in blue
- ✅ Applicants appear instantly
- ✅ Title shows selected job name

---

### Feature: Applicant Viewing

**Test Case 19: View Applicant Cards**

1. Select job with applicants
2. Cards should display for each applicant

**Each Card shows:**

- ✅ Applicant name
- ✅ Email address
- ✅ Years of experience
- ✅ Skills as tags
- ✅ Applied date
- ✅ Match score % with color coding

---

**Test Case 20: Match Score Color Coding**

1. View applicants with different scores
2. Verify colors:

| Score   | Color     | Example       |
| ------- | --------- | ------------- |
| 70-100% | Green ✅  | Good fit      |
| 40-69%  | Orange ⚠️ | Partial match |
| 0-39%   | Red ❌    | Low match     |

**Expected Results:**

- ✅ Green for high matches
- ✅ Orange for medium matches
- ✅ Red for low matches

---

### Feature: Sorting

**Test Case 21: Sort by Match Score (Default)**

1. Select job
2. Verify applicants sorted by match score descending
3. Top applicant has highest score

**Expected Results:**

- ✅ 100% matches appear first
- ✅ Scores decrease going down
- ✅ Default sorting active

---

**Test Case 22: Sort by Experience**

1. Click dropdown: "Sort by: Experience"
2. Applicants reorder by experience (highest first)

**Expected Results:**

- ✅ Card order changes
- ✅ Most experienced at top
- ✅ Can toggle back to match score

---

### Feature: Applicant Filtering

**Test Case 23: Filter by Skills**

1. View applicants
2. Look at skill tags
3. Identify high-skill applicants

**Expected Results:**

- ✅ Can see all applicant skills
- ✅ Can identify who has specific skills
- ✅ Skills displayed as tags

---

**Test Case 24: Responsive Design**

1. Resize browser window
2. On mobile width, panels stack vertically
3. On tablet width, panels side-by-side
4. On desktop, full layout

**Expected Results:**

- ✅ Responsive grid layout
- ✅ Mobile friendly
- ✅ No horizontal scrolling

---

## Part 4: End-to-End Scenarios

### Scenario A: Fresh Applicant Application

1. **User Journey:**
   - New user opens JobHub
   - Sees map with job markers
   - Clicks on Node.js role in Bangalore
   - Reviews job details
   - Fills application form
   - Gets instant match score feedback

2. **Expected Outcome:**
   - Application saved to database
   - HR can see applicant in dashboard
   - Match score calculated correctly

---

### Scenario B: Recruiter Selection

1. **Recruiter Journey:**
   - Opens HR Dashboard
   - Sees 10 jobs with applicant counts
   - Clicks on "React Developer" job
   - Sees 25 applicants
   - Sorts by match score
   - Identifies top 5 candidates
   - Reviews their skills and experience

2. **Expected Outcome:**
   - Quick applicant overview
   - Easy candidate ranking
   - Skill matching visible at a glance

---

### Scenario C: Multi-City Job Browse

1. **User Journey:**
   - Opens map
   - Zooms to see India
   - Identifies Bangalore cluster
   - Zooms in to Bangalore
   - Sees individual jobs
   - Clicks different locations
   - Discovered remote options

2. **Expected Outcome:**
   - Map interaction smooth
   - Geographic awareness clear
   - All locations accessible

---

## Part 5: Data Validation Testing

### Test Case 25: Seeded Data Quality

1. Check backend: `/api/jobs`
2. Verify 200 jobs exist
3. Sample checks:

```javascript
// Should all exist:
jobs[0].title ✅
jobs[0].company ✅
jobs[0].location ✅
jobs[0].salary ✅
jobs[0].tags.length > 0 ✅
jobs[0].description ✅
jobs[0].coordinates.lat ✅
jobs[0].coordinates.lng ✅
```

---

### Test Case 26: Coordinates Accuracy

**Location Bounds Check:**

- Bangalore: ~12-13°N, ~77-78°E
- Delhi: ~28-29°N, ~76-78°E
- Mumbai: ~18-20°N, ~72-73°E
- Remote: ~20°N, ~78°E (center of India)

**Expected Results:**

- ✅ All coordinates within India bounds
- ✅ No coordinates outside India
- ✅ Markers appear in correct cities on map

---

## Part 6: Performance Testing

### Test Case 27: Load Time

1. **Map Loading:**
   - Time map appears: Should be < 2 seconds
   - Time markers appear: Should be instant

2. **Dashboard Loading:**
   - Time all 200 jobs load: Should be < 1 second
   - Time applicants load on job click: Should be instant

**Expected Results:**

- ✅ Snappy performance
- ✅ No lag or stuttering
- ✅ Smooth transitions

---

### Test Case 28: Large Data Test

1. Apply to multiple jobs (test with 10+ applications)
2. Dashboard should still load quickly
3. Sorting should be instant

**Expected Results:**

- ✅ No performance degradation
- ✅ Handles full dataset
- ✅ Smooth scrolling

---

## Part 7: Error Handling Testing

### Test Case 29: Network Error Handling

**Simulate offline:**

1. Disconnect internet
2. Try to load jobs
3. Try to apply

**Expected:**

- ✅ Error message shown
- ✅ User can retry
- ✅ No blank screens

---

### Test Case 30: Invalid Data

1. Try invalid job ID in URL
2. Try submitting form with special characters
3. Try very long email input

**Expected Results:**

- ✅ Graceful error handling
- ✅ Helpful error messages
- ✅ No crashes

---

## Quick Test Checklist

- [ ] Map loads and shows 200 jobs
- [ ] Map markers clickable
- [ ] Search filters work
- [ ] Job details modal displays correctly
- [ ] Apply form validates inputs
- [ ] Match score calculates correctly
- [ ] Duplicate application rejected
- [ ] HR Dashboard loads all jobs
- [ ] Applicants display correctly
- [ ] Sorting by match score works
- [ ] Sorting by experience works
- [ ] Match score colors correct
- [ ] Responsive design works
- [ ] No console errors
- [ ] API endpoints all working

---

## Performance Benchmarks

| Action          | Target  | Actual |
| --------------- | ------- | ------ |
| Map load        | < 2s    | —      |
| Job search      | < 100ms | —      |
| Dashboard load  | < 1s    | —      |
| Apply submit    | < 500ms | —      |
| Sort applicants | < 100ms | —      |
| Marker click    | < 50ms  | —      |

---

## Demo Flow (5 Minutes)

1. **(1 min) Map Overview**
   - Show map with 200 jobs
   - Search to filter
   - Zoom and pan

2. **(2 min) Application**
   - Click job marker
   - Show job details
   - Apply with perfect match
   - Show 100% match score

3. **(2 min) HR Dashboard**
   - Show all 200 jobs
   - Click job with applicants
   - Show sorted applicants
   - Highlight color-coded matches

---

## Success Criteria

✅ All tests pass without errors
✅ UI responsive on all screen sizes
✅ Performance acceptable
✅ Data integrity maintained
✅ User flows intuitive
✅ Error handling graceful

**You're ready to demo!** 🚀
