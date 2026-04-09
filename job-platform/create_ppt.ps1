$ErrorActionPreference = 'Stop'

try {
  $pp = New-Object -ComObject PowerPoint.Application
  $pp.Visible = -1

  $presentation = $pp.Presentations.Add()
  $layout = 2

  $slidesData = @(
    @{ Title = 'Startup Arena - Project Deep Dive'; Body = @('Map-based hiring platform with dual flows: Applicant and HR','Runtime: Frontend 3000, Backend 5000, MongoDB 27017') },
    @{ Title = 'Tech Stack and Why'; Body = @('Backend: Node.js, Express, MongoDB, Mongoose, dotenv, CORS','Frontend: React 18, Axios, Leaflet, React-Leaflet','Why: fast API iteration + interactive map UX + flexible schema') },
    @{ Title = 'Architecture'; Body = @('Frontend components call API through Axios','Express routes handle business logic','Mongoose reads/writes MongoDB','Single JSON API contract across UI states') },
    @{ Title = 'Core Endpoints'; Body = @('GET /api/jobs','GET /api/jobs/:id','GET /api/jobs/:id/applicants','POST /api/apply','POST /api/accept','POST /api/reject') },
    @{ Title = 'Business Rules'; Body = @('Required field validation on apply','Duplicate application blocked by email per job','Openings cap enforced on apply/accept','Applicants sorted by match score for HR') },
    @{ Title = 'Match Score Logic'; Body = @('Normalize tags + skills to lowercase trimmed values','Compute overlap against required tags','Formula: round((matches / totalRequired) * 100)') },
    @{ Title = 'Data Model'; Body = @('Job: title, company, location, salary, tags, description, openings, coordinates, postedAt','Applicant: name, email, skills, experience, portfolio, matchScore, status, appliedAt') },
    @{ Title = 'Frontend User Flows'; Body = @('Applicant: Login -> Landing -> City -> Map -> JobDetails -> Apply','HR: Login (hr@test.com) -> Dashboard -> Applicants -> Accept/Reject') },
    @{ Title = 'Current Gaps'; Body = @('Frontend-only auth simulation','Docs mismatch for some endpoints','Duplicate legacy files in project tree','Dev script nodemon config issue') },
    @{ Title = 'Next Improvements'; Body = @('JWT auth + role-protected API','Request schema validation','Better weighted skill matching','Route/integration tests + cleanup') }
  )

  foreach ($item in $slidesData) {
    $slide = $presentation.Slides.Add($presentation.Slides.Count + 1, $layout)
    $slide.Shapes.Title.TextFrame.TextRange.Text = $item.Title
    $slide.Shapes.Item(2).TextFrame.TextRange.Text = ($item.Body -join "`r`n")
  }

  $outPath = 'D:\Arena\job-platform\PROJECT_DEEP_DIVE.pptx'
  $presentation.SaveAs($outPath)
  $presentation.Close()
  $pp.Quit()

  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($presentation) | Out-Null
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($pp) | Out-Null

  Write-Output "PPT_CREATED:$outPath"
}
catch {
  Write-Output "PPT_ERROR:$($_.Exception.Message)"
  exit 1
}
