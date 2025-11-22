import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    personalInfo: {
      name: String,
      email: String,
      phone: String,
      location: String,
    },
    technicalSkills: [
      {
        skill: String,
        proficiency: String,
        yearsOfExperience: String,
        details: String,
      },
    ],
    softSkills: [
      {
        skill: String,
        description: String,
        examples: String,
      },
    ],
    experience: [
      {
        company: String,
        role: String,
        duration: String,
        responsibilities: [String],
        achievements: [String],
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        year: String,
        gpa: String,
      },
    ],
    hackathons: [
      {
        name: String,
        year: String,
        project: String,
        achievement: String,
        technologiesUsed: [String],
      },
    ],
    projects: [
      {
        name: String,
        description: String,
        technologies: [String],
        impact: String,
      },
    ],
    certifications: [String],
    marketRelevance: {
      overallScore: Number,
      trendingSkills: [String],
      outdatedSkills: [String],
      missingInDemandSkills: [String],
      analysis: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);
