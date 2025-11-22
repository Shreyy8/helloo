# Setup Guide - AI Resume Analyzer

## Prerequisites

- Node.js 18+ installed
- A Google Gemini API key

## Step-by-Step Setup

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables

1. Navigate to the `resume-analyzer` folder
2. Open the `.env.local` file
3. Replace `your_gemini_api_key_here` with your actual API key:

```
GEMINI_API_KEY=AIzaSy...your_actual_key_here
```

### 3. Install Dependencies

```bash
cd resume-analyzer
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## How to Use

### Analyzing a Resume

1. Click "Upload Resume" on the home page
2. Select a PDF resume file
3. Click "Analyze Resume"
4. Wait for AI analysis (usually 10-30 seconds)
5. Review the detailed breakdown:
   - Personal information
   - Technical skills with proficiency
   - Soft skills
   - Experience and achievements
   - Hackathons and projects
   - Market relevance score

### Matching to a Job

1. After analyzing a resume, click "Match with Job Description"
2. Or go directly to "HR Dashboard"
3. Paste the complete job description including:
   - Required skills
   - Experience requirements
   - Qualifications
   - Responsibilities
4. Click "Match Resume to Job"
5. Review the comprehensive match report:
   - Overall match percentage
   - Matched, missing, and additional skills
   - Experience fit analysis
   - Strengths and weaknesses
   - Hiring recommendations
   - Detailed reasoning

## Troubleshooting

### "Failed to analyze resume"
- Check that your Gemini API key is correct
- Ensure the PDF is text-based (not a scanned image)
- Verify you have API quota remaining

### "No resume data found"
- Make sure to upload and analyze a resume first
- Check browser localStorage is enabled

### PDF parsing errors
- Ensure the PDF is not password-protected
- Try a different PDF if the format is unusual
- The PDF should contain actual text, not just images

## Production Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variable: `GEMINI_API_KEY`
4. Deploy

### Other Platforms

Make sure to:
- Set the `GEMINI_API_KEY` environment variable
- Use Node.js 18+ runtime
- Build command: `npm run build`
- Start command: `npm start`

## API Rate Limits

- Free tier: 60 requests per minute
- Consider implementing rate limiting for production
- Monitor your API usage in Google AI Studio

## Security Notes

- Never commit `.env.local` to version control
- Keep your API key secure
- Consider implementing authentication for production use
- Add file size limits for PDF uploads
