import { NextRequest, NextResponse } from "next/server";
import { analyzeResume } from "@/lib/gemini";
import connectDB from "@/lib/mongodb";
import Resume from "@/models/Resume";

export async function POST(request: NextRequest) {
  try {
    const { resumeText, fileName } = await request.json();

    if (!resumeText) {
      return NextResponse.json({ error: "No resume text provided" }, { status: 400 });
    }

    const analysis = await analyzeResume(resumeText);

    // Save to MongoDB if connected
    let savedResume = null;
    try {
      await connectDB();
      savedResume = await Resume.create({
        fileName: fileName || "text-input.txt",
        ...analysis,
      });
      console.log("Resume saved to MongoDB:", savedResume._id);
    } catch (dbError) {
      console.log("MongoDB not available, continuing without persistence");
    }

    return NextResponse.json({
      success: true,
      data: analysis,
      resumeId: savedResume?._id?.toString(),
    });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume" },
      { status: 500 }
    );
  }
}
