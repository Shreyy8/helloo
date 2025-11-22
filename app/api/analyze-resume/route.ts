import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdfParser";
import { analyzeResume } from "@/lib/gemini";
import connectDB from "@/lib/mongodb";
import Resume from "@/models/Resume";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("resume") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const resumeText = await extractTextFromPDF(buffer);
    const analysis = await analyzeResume(resumeText);

    // Save to MongoDB if connected
    let savedResume = null;
    try {
      await connectDB();
      savedResume = await Resume.create({
        fileName: file.name,
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
