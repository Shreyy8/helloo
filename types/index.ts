export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface TechnicalSkill {
  skill: string;
  proficiency: string;
  yearsOfExperience: string;
  details: string;
}

export interface SoftSkill {
  skill: string;
  description: string;
  examples: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  gpa: string;
}

export interface Hackathon {
  name: string;
  year: string;
  project: string;
  achievement: string;
  technologiesUsed: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  impact: string;
}

export interface MarketRelevance {
  overallScore: number;
  trendingSkills: string[];
  outdatedSkills: string[];
  missingInDemandSkills: string[];
  analysis: string;
}

export interface ResumeAnalysis {
  personalInfo: PersonalInfo;
  technicalSkills: TechnicalSkill[];
  softSkills: SoftSkill[];
  experience: Experience[];
  education: Education[];
  hackathons: Hackathon[];
  projects: Project[];
  certifications: string[];
  marketRelevance: MarketRelevance;
}

export interface SkillMatch {
  skill: string;
  relevance?: string;
  importance?: string;
  value?: string;
}

export interface SkillsMatch {
  matched: SkillMatch[];
  missing: SkillMatch[];
  additional: SkillMatch[];
}

export interface ExperienceMatch {
  score: number;
  analysis: string;
}

export interface FitAnalysis {
  technical: string;
  cultural: string;
  growth: string;
}

export interface JobMatchResult {
  matchScore: number;
  skillsMatch: SkillsMatch;
  experienceMatch: ExperienceMatch;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  fitAnalysis: FitAnalysis;
  detailedReasoning: string;
}
