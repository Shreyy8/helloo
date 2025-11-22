import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

export async function analyzeResume(resumeText: string) {
  const prompt = `Analyze this resume in detail and extract the following information in JSON format:
  
  {
    "personalInfo": {
      "name": "",
      "email": "",
      "phone": "",
      "location": ""
    },
    "technicalSkills": [
      {
        "skill": "",
        "proficiency": "",
        "yearsOfExperience": "",
        "details": ""
      }
    ],
    "softSkills": [
      {
        "skill": "",
        "description": "",
        "examples": ""
      }
    ],
    "experience": [
      {
        "company": "",
        "role": "",
        "duration": "",
        "responsibilities": [],
        "achievements": []
      }
    ],
    "education": [
      {
        "degree": "",
        "institution": "",
        "year": "",
        "gpa": ""
      }
    ],
    "hackathons": [
      {
        "name": "",
        "year": "",
        "project": "",
        "achievement": "",
        "technologiesUsed": []
      }
    ],
    "projects": [
      {
        "name": "",
        "description": "",
        "technologies": [],
        "impact": ""
      }
    ],
    "certifications": [],
    "marketRelevance": {
      "overallScore": 0,
      "trendingSkills": [],
      "outdatedSkills": [],
      "missingInDemandSkills": [],
      "analysis": ""
    }
  }
  
  Resume Text:
  ${resumeText}
  
  Provide detailed analysis with market relevance based on current tech industry trends.`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();
  
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  return JSON.parse(response);
}

export async function matchResumeToJob(resumeData: any, jobDescription: string) {
  const prompt = `You are an expert HR analyst. Match this resume against the job description and provide a detailed analysis.
  
  Resume Data:
  ${JSON.stringify(resumeData, null, 2)}
  
  Job Description:
  ${jobDescription}
  
  Provide a JSON response with:
  {
    "matchScore": 0-100,
    "skillsMatch": {
      "matched": [{"skill": "", "relevance": ""}],
      "missing": [{"skill": "", "importance": ""}],
      "additional": [{"skill": "", "value": ""}]
    },
    "experienceMatch": {
      "score": 0-100,
      "analysis": ""
    },
    "strengths": [],
    "weaknesses": [],
    "recommendations": [],
    "fitAnalysis": {
      "technical": "",
      "cultural": "",
      "growth": ""
    },
    "detailedReasoning": ""
  }`;

  const result = await model.generateContent(prompt);
  const response = result.response.text();
  
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  
  return JSON.parse(response);
}
