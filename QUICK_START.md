# 🚀 Quick Start Guide

## Get Running in 5 Minutes!

### Step 1: Get Your API Key (2 minutes)
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key (starts with `AIza...`)

### Step 2: Configure (30 seconds)
1. Open the file `.env.local` in the `resume-analyzer` folder
2. Replace `your_gemini_api_key_here` with your actual API key
3. Save the file

### Step 3: Install & Run (2 minutes)

#### Option A: Windows Quick Start
Double-click `start.bat` - Done! 🎉

#### Option B: Manual Start
```bash
cd resume-analyzer
npm install
npm run dev
```

### Step 4: Open Browser
Go to http://localhost:3000

---

## 🎯 First Test

### Test Resume Analysis (1 minute)
1. Click "Upload Resume"
2. Select any PDF resume
3. Click "Analyze Resume"
4. Wait 10-30 seconds
5. See detailed analysis!

### Test Job Matching (1 minute)
1. After analyzing a resume, click "Match with Job Description"
2. Copy content from `SAMPLE_JOB_DESCRIPTION.txt`
3. Paste into the text area
4. Click "Match Resume to Job"
5. Wait 10-30 seconds
6. See match score and analysis!

---

## ✅ You're Done!

The app is now running and ready to use. 

### What You Can Do:
- ✅ Upload and analyze PDF resumes
- ✅ Extract skills, experience, education
- ✅ Get market relevance scores
- ✅ Match resumes to job descriptions
- ✅ Get AI-powered hiring recommendations

### Next Steps:
- Try with different resumes
- Test various job descriptions
- Explore all the features
- Read FEATURES.md for complete capabilities

---

## 🆘 Having Issues?

### "Failed to analyze resume"
→ Check your API key in `.env.local`

### "No resume data found"
→ Upload a resume first before job matching

### PDF not working
→ Make sure it's a text-based PDF (not a scanned image)

### Still stuck?
→ Check CHECKLIST.md for detailed troubleshooting

---

## 🎉 Success!

If you can see the home page and upload a resume, you're all set!

Enjoy using the AI Resume Analyzer! 🚀
