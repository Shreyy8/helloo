# Setup Checklist

## ✅ Before You Start

- [ ] Node.js 18+ installed
- [ ] npm or yarn package manager
- [ ] Google account for Gemini API

## 🔑 API Key Setup

- [ ] Visit https://makersuite.google.com/app/apikey
- [ ] Create a new API key
- [ ] Copy the API key
- [ ] Open `.env.local` file
- [ ] Replace `your_gemini_api_key_here` with your actual key
- [ ] Save the file

## 📦 Installation

- [ ] Open terminal in `resume-analyzer` folder
- [ ] Run `npm install`
- [ ] Wait for dependencies to install
- [ ] Check for any error messages

## 🚀 First Run

- [ ] Run `npm run dev` (or double-click `start.bat` on Windows)
- [ ] Wait for "Ready" message
- [ ] Open browser to http://localhost:3000
- [ ] Verify home page loads correctly

## 🧪 Testing

### Test Resume Upload
- [ ] Click "Upload Resume"
- [ ] Select a PDF resume
- [ ] Click "Analyze Resume"
- [ ] Wait for analysis (10-30 seconds)
- [ ] Verify all sections display:
  - [ ] Personal Information
  - [ ] Technical Skills
  - [ ] Soft Skills
  - [ ] Experience
  - [ ] Education
  - [ ] Hackathons (if applicable)
  - [ ] Market Relevance Score

### Test Job Matching
- [ ] After resume analysis, click "Match with Job Description"
- [ ] Or go to "HR Dashboard"
- [ ] Paste a job description (use SAMPLE_JOB_DESCRIPTION.txt)
- [ ] Click "Match Resume to Job"
- [ ] Wait for matching (10-30 seconds)
- [ ] Verify match results display:
  - [ ] Overall Match Score
  - [ ] Matched Skills
  - [ ] Missing Skills
  - [ ] Additional Skills
  - [ ] Experience Match
  - [ ] Strengths
  - [ ] Weaknesses
  - [ ] Fit Analysis
  - [ ] Recommendations
  - [ ] Detailed Reasoning

## 🐛 Troubleshooting

If something doesn't work:

- [ ] Check `.env.local` has correct API key
- [ ] Verify API key is active in Google AI Studio
- [ ] Check console for error messages (F12 in browser)
- [ ] Ensure PDF is text-based (not scanned image)
- [ ] Try a different PDF if parsing fails
- [ ] Check internet connection
- [ ] Restart development server
- [ ] Clear browser cache and localStorage

## 📝 Common Issues

### "Failed to analyze resume"
- [ ] API key is correct
- [ ] API key has quota remaining
- [ ] PDF is valid and text-based

### "No resume data found"
- [ ] Upload and analyze resume first
- [ ] Check browser localStorage is enabled
- [ ] Try uploading again

### Slow performance
- [ ] Normal for AI processing (10-30 seconds)
- [ ] Check internet speed
- [ ] Verify Gemini API status

## 🎉 Success Criteria

You're ready when:
- [ ] Home page loads without errors
- [ ] Can upload and analyze a PDF resume
- [ ] Resume analysis shows detailed results
- [ ] Can match resume to job description
- [ ] Match results show percentage and details
- [ ] All sections display correctly
- [ ] No console errors

## 📚 Next Steps

- [ ] Read FEATURES.md for complete feature list
- [ ] Review PROJECT_SUMMARY.md for architecture
- [ ] Test with multiple resumes
- [ ] Try different job descriptions
- [ ] Customize styling if needed
- [ ] Consider deployment options

## 🚀 Ready for Production?

Before deploying:
- [ ] Test with various resume formats
- [ ] Verify API rate limits
- [ ] Add error handling improvements
- [ ] Implement file size limits
- [ ] Add loading states
- [ ] Consider authentication
- [ ] Set up monitoring
- [ ] Configure environment variables on hosting platform
- [ ] Test in production environment

## 📞 Need Help?

- Check README.md for quick reference
- Review SETUP_GUIDE.md for detailed instructions
- Read FEATURES.md for functionality details
- Check Google Gemini API documentation
- Verify all files are present in project structure
