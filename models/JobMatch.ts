import mongoose from "mongoose";

const JobMatchSchema = new mongoose.Schema(
  {
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    jobTitle: String,
    jobDescription: { type: String, required: true },
    matchScore: { type: Number, required: true },
    skillsMatch: {
      matched: [
        {
          skill: String,
          relevance: String,
        },
      ],
      missing: [
        {
          skill: String,
          importance: String,
        },
      ],
      additional: [
        {
          skill: String,
          value: String,
        },
      ],
    },
    experienceMatch: {
      score: Number,
      analysis: String,
    },
    strengths: [String],
    weaknesses: [String],
    recommendations: [String],
    fitAnalysis: {
      technical: String,
      cultural: String,
      growth: String,
    },
    detailedReasoning: String,
  },
  { timestamps: true }
);

export default mongoose.models.JobMatch ||
  mongoose.model("JobMatch", JobMatchSchema);
