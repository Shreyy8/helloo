import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Resume from "@/models/Resume";

export async function GET() {
  try {
    await connectDB();
    const resumes = await Resume.find().sort({ createdAt: -1 }).limit(50);
    return NextResponse.json({ success: true, data: resumes });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return NextResponse.json(
      { error: "Failed to fetch resumes" },
      { status: 500 }
    );
  }
}
