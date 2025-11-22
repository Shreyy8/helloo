# Troubleshooting Guide

## Common Issues and Solutions

### 1. PDF Parsing Errors

#### Error: "Failed to parse PDF"

**Causes:**
- PDF is a scanned image (not text-based)
- PDF is password-protected
- PDF is corrupted
- Unsupported PDF format

**Solutions:**
1. Ensure the PDF contains actual text (you should be able to select and copy text)
2. Remove password protection from the PDF
3. Try converting the PDF to a newer format
4. Use a different PDF if possible

**How to check if PDF is text-based:**
- Open the PDF in a viewer
- Try to select text with your mouse
- If you can select and copy text, it's text-based ✓
- If you can't select text, it's likely a scanned image ✗

### 2. API Key Issues

#### Error: "Failed to analyze resume" or API errors

**Causes:**
- Invalid API key
- API key not set in `.env.local`
- API quota exceeded
- Network connectivity issues

**Solutions:**
1. Verify your API key in `.env.local`:
   ```
   GEMINI_API_KEY=AIzaSy...your_actual_key
   ```
2. Check API key is active at https://makersuite.google.com/app/apikey
3. Verify you have remaining quota
4. Restart the development server after changing `.env.local`
5. Check your internet connection

### 3. Resume Data Not Found

#### Error: "No resume data found"

**Causes:**
- Resume not uploaded yet
- localStorage cleared
- Different browser/incognito mode

**Solutions:**
1. Upload and analyze a resume first
2. Don't use incognito/private browsing mode
3. Check browser localStorage is enabled
4. Try uploading the resume again

### 4. Slow Performance

#### Issue: Analysis takes too long

**Normal behavior:**
- Resume analysis: 10-30 seconds
- Job matching: 10-30 seconds

**If slower than expected:**
1. Check internet connection speed
2. Verify Gemini API status
3. Try with a shorter resume
4. Check browser console for errors

### 5. Development Server Issues

#### Error: Port already in use

**Solution:**
```bash
# Kill the process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Then restart:
npm run dev
```

#### Error: Module not found

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
rm package-lock.json
npm install
```

### 6. Build Errors

#### TypeScript errors

**Solution:**
```bash
# Check for type errors
npx tsc --noEmit

# If errors persist, check:
# - All imports are correct
# - Types are properly defined
# - No syntax errors
```

#### ESLint errors

**Solution:**
```bash
# Run linter
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

### 7. PDF Library Issues

#### Error: "pdf-parse" import errors

**Already Fixed:**
The project uses `require()` for pdf-parse to avoid ESM/CJS compatibility issues.

**If still having issues:**
```bash
# Reinstall pdf-parse
npm uninstall pdf-parse
npm install pdf-parse
```

### 8. Environment Variables

#### Changes not taking effect

**Solution:**
1. Restart the development server after changing `.env.local`
2. Clear browser cache
3. Verify `.env.local` is in the root of `resume-analyzer` folder
4. Check for typos in variable names

### 9. Browser Issues

#### UI not displaying correctly

**Solutions:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Try a different browser
4. Check browser console for JavaScript errors (F12)

#### localStorage issues

**Solutions:**
1. Check localStorage is enabled in browser settings
2. Clear localStorage: Open DevTools (F12) → Application → Local Storage → Clear
3. Don't use incognito/private mode

### 10. Network Issues

#### CORS errors

**Solution:**
This shouldn't happen with Next.js API routes, but if it does:
1. Ensure you're accessing via `localhost:3000` not `127.0.0.1:3000`
2. Check next.config.ts has correct settings
3. Restart development server

#### Timeout errors

**Solutions:**
1. Check internet connection
2. Verify Gemini API is accessible
3. Try again (temporary network issue)
4. Check firewall settings

## Debugging Tips

### Enable Verbose Logging

Add to your API routes:
```typescript
console.log("Request received:", request);
console.log("Processing...");
console.log("Response:", response);
```

### Check Browser Console

1. Open DevTools (F12)
2. Go to Console tab
3. Look for red error messages
4. Check Network tab for failed requests

### Check Server Logs

Look at the terminal where `npm run dev` is running for:
- Error messages
- Stack traces
- API call logs

### Test API Directly

Use tools like Postman or curl to test API endpoints:

```bash
# Test analyze-resume endpoint
curl -X POST http://localhost:3000/api/analyze-resume \
  -F "resume=@path/to/resume.pdf"

# Test match-job endpoint
curl -X POST http://localhost:3000/api/match-job \
  -H "Content-Type: application/json" \
  -d '{"resumeData": {...}, "jobDescription": "..."}'
```

## Getting Help

### Before Asking for Help

1. Check this troubleshooting guide
2. Read error messages carefully
3. Check browser console (F12)
4. Check server terminal logs
5. Try the solutions above

### Information to Provide

When reporting issues, include:
- Error message (full text)
- Browser console logs
- Server terminal output
- Steps to reproduce
- Operating system
- Node.js version (`node --version`)
- npm version (`npm --version`)

### Useful Commands

```bash
# Check versions
node --version
npm --version

# Clear everything and reinstall
rm -rf node_modules package-lock.json .next
npm install

# Check for outdated packages
npm outdated

# Update packages
npm update
```

## Still Having Issues?

1. Check the README.md for setup instructions
2. Review SETUP_GUIDE.md for detailed steps
3. Verify all files are present
4. Try with a fresh installation
5. Check Next.js documentation
6. Check Gemini API documentation

## Known Limitations

1. **PDF Format**: Only text-based PDFs work (not scanned images)
2. **File Size**: Large PDFs (>10MB) may be slow
3. **API Limits**: Free tier has rate limits (60 requests/minute)
4. **Browser Storage**: localStorage has size limits (~5-10MB)
5. **AI Accuracy**: Results depend on resume quality and formatting

## Quick Fixes Checklist

- [ ] Restart development server
- [ ] Clear browser cache
- [ ] Check `.env.local` has correct API key
- [ ] Verify PDF is text-based
- [ ] Check internet connection
- [ ] Try a different browser
- [ ] Reinstall node_modules
- [ ] Check for typos in code
- [ ] Verify all files are present
- [ ] Check console for errors
