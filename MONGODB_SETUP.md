# MongoDB Setup Guide

The application now supports MongoDB for persistent data storage. All analyzed resumes and job matches will be automatically saved to MongoDB.

## Option 1: Local MongoDB (Recommended for Development)

### Install MongoDB Compass

1. Download MongoDB Compass from: https://www.mongodb.com/try/download/compass
2. Install and open MongoDB Compass
3. Click "New Connection"
4. Use connection string: `mongodb://localhost:27017`
5. Click "Connect"

### Install MongoDB Community Server (if not already installed)

1. Download from: https://www.mongodb.com/try/download/community
2. Install with default settings
3. MongoDB will run automatically on `localhost:27017`

### Configure Application

Your `.env.local` already has:
```
MONGODB_URI=mongodb://localhost:27017/resume-analyzer
```

That's it! The app will automatically connect and save data.

## Option 2: MongoDB Atlas (Cloud - Free Tier)

### Create Free Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Create a free M0 cluster (512MB)

### Get Connection String

1. In Atlas dashboard, click "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password

### Update .env.local

```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/resume-analyzer?retryWrites=true&w=majority
```

## Verify Connection

1. Start the application: `npm run dev`
2. Upload and analyze a resume
3. Check terminal for: "Resume saved to MongoDB: [id]"
4. Go to http://localhost:3000/database to view saved data

## View Data in MongoDB Compass

### Connect to Local MongoDB

1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Find database: `resume-analyzer`
4. Collections:
   - `resumes` - All analyzed resumes
   - `jobmatches` - All job matching results

### Connect to MongoDB Atlas

1. Open MongoDB Compass
2. Use your Atlas connection string
3. Browse the same collections

## Database Structure

### Resumes Collection

```javascript
{
  _id: ObjectId,
  fileName: String,
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    location: String
  },
  technicalSkills: [...],
  softSkills: [...],
  experience: [...],
  education: [...],
  hackathons: [...],
  projects: [...],
  certifications: [...],
  marketRelevance: {
    overallScore: Number,
    trendingSkills: [...],
    outdatedSkills: [...],
    missingInDemandSkills: [...],
    analysis: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### JobMatches Collection

```javascript
{
  _id: ObjectId,
  resumeId: ObjectId (ref: Resume),
  jobTitle: String,
  jobDescription: String,
  matchScore: Number,
  skillsMatch: {
    matched: [...],
    missing: [...],
    additional: [...]
  },
  experienceMatch: {
    score: Number,
    analysis: String
  },
  strengths: [...],
  weaknesses: [...],
  recommendations: [...],
  fitAnalysis: {
    technical: String,
    cultural: String,
    growth: String
  },
  detailedReasoning: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Features with MongoDB

### Automatic Saving
- Every resume analysis is automatically saved
- Every job match is automatically saved
- No manual action required

### Database Dashboard
- View all resumes at `/database`
- View all job matches at `/database`
- Filter and search capabilities
- Real-time data refresh

### Data Persistence
- Data survives browser refresh
- Data survives server restart
- Historical tracking of all analyses
- Compare multiple candidates

## Troubleshooting

### "MongoDB not available, continuing without persistence"

This is normal if MongoDB is not installed. The app will work fine without it, using only localStorage.

**To enable MongoDB:**
1. Install MongoDB Compass
2. Ensure MongoDB is running
3. Check connection string in `.env.local`
4. Restart the application

### Connection Errors

**Error: "connect ECONNREFUSED"**
- MongoDB is not running
- Start MongoDB service
- Or check if port 27017 is available

**Error: "Authentication failed"**
- Check username/password in connection string
- Verify database user has correct permissions

**Error: "Network timeout"**
- Check internet connection (for Atlas)
- Verify firewall settings
- Check IP whitelist in Atlas

### Verify MongoDB is Running

**Windows:**
```bash
# Check if MongoDB service is running
sc query MongoDB

# Start MongoDB service
net start MongoDB
```

**Mac/Linux:**
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB
brew services start mongodb-community
# or
sudo systemctl start mongod
```

## Optional: Without MongoDB

The application works perfectly fine without MongoDB:
- Data is stored in browser localStorage
- All features work the same
- No persistence across devices
- Data cleared when browser cache is cleared

To disable MongoDB:
1. Comment out or remove `MONGODB_URI` from `.env.local`
2. The app will automatically skip database operations

## Benefits of Using MongoDB

✅ **Persistent Storage**: Data survives browser refresh and cache clearing
✅ **Historical Data**: Track all resumes and matches over time
✅ **Multi-User**: Share data across team members
✅ **Analytics**: Query and analyze hiring patterns
✅ **Backup**: Data is safely stored and backed up
✅ **Scalability**: Handle thousands of resumes
✅ **Search**: Find candidates by skills, experience, etc.

## Next Steps

1. Install MongoDB Compass
2. Connect to local MongoDB
3. Analyze a resume
4. Visit `/database` to see saved data
5. Explore data in MongoDB Compass

## Resources

- MongoDB Compass: https://www.mongodb.com/products/compass
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- MongoDB Documentation: https://docs.mongodb.com/
- Mongoose Documentation: https://mongoosejs.com/
