# Application Workflow

## 📊 System Architecture

```
User → Next.js Frontend → API Routes → Gemini AI → Response
                ↓
         PDF Parser (pdf-parse)
                ↓
         Text Extraction
                ↓
         AI Analysis
                ↓
         Structured Data
```

## 🔄 Resume Analysis Flow

```
1. USER ACTION
   └─ Upload PDF Resume
      │
2. FRONTEND (upload-resume/page.tsx)
   └─ File validation
   └─ FormData creation
      │
3. API ROUTE (/api/analyze-resume)
   └─ Receive file
   └─ Convert to Buffer
      │
4. PDF PARSER (lib/pdfParser.ts)
   └─ Extract text from PDF
   └─ Return plain text
      │
5. GEMINI AI (lib/gemini.ts)
   └─ Send structured prompt
   └─ Process resume text
   └─ Extract information
   └─ Analyze market relevance
      │
6. RESPONSE
   └─ Return JSON with:
      ├─ Personal Info
      ├─ Technical Skills
      ├─ Soft Skills
      ├─ Experience
      ├─ Education
      ├─ Hackathons
      ├─ Projects
      └─ Market Relevance Score
      │
7. FRONTEND DISPLAY
   └─ Render categorized results
   └─ Color-coded sections
   └─ Save to localStorage
```

## 🎯 Job Matching Flow

```
1. USER ACTION
   └─ Enter Job Description
      │
2. FRONTEND (hr-dashboard/page.tsx)
   └─ Load resume data from localStorage
   └─ Validate inputs
      │
3. API ROUTE (/api/match-job)
   └─ Receive resume data + job description
      │
4. GEMINI AI (lib/gemini.ts)
   └─ Compare resume to job requirements
   └─ Analyze skill matches
   └─ Calculate fit scores
   └─ Generate recommendations
      │
5. RESPONSE
   └─ Return JSON with:
      ├─ Match Score (0-100%)
      ├─ Skills Match Analysis
      │  ├─ Matched Skills
      │  ├─ Missing Skills
      │  └─ Additional Skills
      ├─ Experience Match
      ├─ Strengths
      ├─ Weaknesses
      ├─ Fit Analysis
      │  ├─ Technical Fit
      │  ├─ Cultural Fit
      │  └─ Growth Potential
      ├─ Recommendations
      └─ Detailed Reasoning
      │
6. FRONTEND DISPLAY
   └─ Show match percentage
   └─ Display categorized analysis
   └─ Color-coded indicators
   └─ Detailed breakdown
```

## 🗂️ Data Flow

### Resume Upload
```
PDF File → Buffer → Text → AI Prompt → JSON Response → UI Display → localStorage
```

### Job Matching
```
localStorage → Resume Data + Job Description → AI Prompt → JSON Response → UI Display
```

## 🎨 User Journey

### Path 1: Candidate Screening
```
Home Page
   ↓
Upload Resume
   ↓
View Analysis
   ↓
Check Market Relevance
   ↓
Go to HR Dashboard
   ↓
Enter Job Description
   ↓
View Match Results
   ↓
Make Hiring Decision
```

### Path 2: Quick Match
```
Home Page
   ↓
Upload Resume
   ↓
Click "Match with Job Description"
   ↓
Enter Job Description
   ↓
View Match Results
```

## 🔐 Data Storage

### Client-Side (Browser)
```
localStorage
   └─ "resumeAnalysis"
      └─ Complete resume analysis JSON
      └─ Persists across page refreshes
      └─ Cleared on browser cache clear
```

### Server-Side
```
No persistent storage
   └─ API routes process requests
   └─ No database
   └─ No file storage
   └─ Stateless architecture
```

## 🚀 API Communication

### Analyze Resume Endpoint
```
POST /api/analyze-resume

Request:
   Content-Type: multipart/form-data
   Body: { resume: File }

Response:
   {
     "success": true,
     "data": { ...resume analysis... }
   }
```

### Match Job Endpoint
```
POST /api/match-job

Request:
   Content-Type: application/json
   Body: {
     "resumeData": { ...analysis... },
     "jobDescription": "string"
   }

Response:
   {
     "success": true,
     "data": { ...match results... }
   }
```

## 🧠 AI Prompting Strategy

### Resume Analysis Prompt
```
1. Define output structure (JSON schema)
2. Provide resume text
3. Request detailed extraction
4. Ask for market relevance analysis
5. Specify trending vs outdated skills
```

### Job Matching Prompt
```
1. Provide resume data (structured)
2. Provide job description (raw text)
3. Request comparison analysis
4. Ask for percentage scoring
5. Request detailed reasoning
6. Specify output format (JSON)
```

## 📱 Component Hierarchy

```
App Layout (layout.tsx)
   │
   ├─ Home Page (page.tsx)
   │  └─ Navigation Cards
   │     ├─ Upload Resume
   │     └─ HR Dashboard
   │
   ├─ Upload Resume Page (upload-resume/page.tsx)
   │  ├─ File Upload Component
   │  ├─ Analysis Trigger
   │  └─ Results Display
   │     ├─ Personal Info
   │     ├─ Technical Skills
   │     ├─ Soft Skills
   │     ├─ Experience
   │     ├─ Hackathons
   │     └─ Market Relevance
   │
   └─ HR Dashboard (hr-dashboard/page.tsx)
      ├─ Job Description Input
      ├─ Match Trigger
      └─ Match Results Display
         ├─ Match Score
         ├─ Skills Analysis
         ├─ Experience Match
         ├─ Strengths/Weaknesses
         ├─ Fit Analysis
         └─ Recommendations
```

## ⚡ Performance Considerations

### Fast Operations
- Page navigation (instant)
- Form input (real-time)
- localStorage read/write (< 1ms)

### Moderate Operations
- PDF parsing (1-3 seconds)
- File upload (depends on size)

### Slow Operations
- AI resume analysis (10-30 seconds)
- AI job matching (10-30 seconds)

### Optimization Strategies
- Show loading states
- Cache resume analysis
- Reuse analysis for multiple jobs
- Client-side validation
- Optimistic UI updates

## 🔄 State Management

```
Component State (useState)
   ├─ File selection
   ├─ Loading states
   ├─ Analysis results
   ├─ Job description input
   └─ Match results

Browser Storage (localStorage)
   └─ Resume analysis data
      └─ Persists between sessions
      └─ Shared across pages

No Global State Management
   └─ Simple prop passing
   └─ localStorage for persistence
   └─ No Redux/Context needed
```

## 🎯 Error Handling

```
Frontend Validation
   ├─ File type check (PDF only)
   ├─ File size check
   └─ Required field validation

API Error Handling
   ├─ Try-catch blocks
   ├─ Error logging
   └─ User-friendly messages

AI Error Handling
   ├─ JSON parsing fallback
   ├─ Retry logic (optional)
   └─ Graceful degradation
```
