import { NextRequest, NextResponse } from "next/server";
import { matchResumeToJob } from "@/lib/gemini";
import connectDB from "@/lib/mongodb";
import JobMatch from "@/models/JobMatch";

export async function POST(request: NextRequest) {
  try {
    const { resumeData, jobDescription, resumeId, jobTitle } = await request.json();

    if (!resumeData || !jobDescription) {
      return NextResponse.json(
        { error: "Missing resume data or job description" },
        { status: 400 }
      );
    }

    const matchResult = await matchResumeToJob(resumeData, jobDescription);

    // Save to MongoDB if connected
    try {
      await connectDB();
      await JobMatch.create({
        resumeId: resumeId || null,
        jobTitle: jobTitle || "Untitled Position",
        jobDescription,
        ...matchResult,
      });
      console.log("Job match saved to MongoDB");
    } catch (dbError) {
      console.log("MongoDB not available, continuing without persistence");
    }

    return NextResponse.json({ success: true, data: matchResult });
  } catch (error) {
    console.error("Error matching job:", error);
    return NextResponse.json(
      { error: "Failed to match job" },
      { status: 500 }
    );
  }
}
