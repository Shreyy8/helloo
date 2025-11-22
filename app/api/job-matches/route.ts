import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import JobMatch from "@/models/JobMatch";

export async function GET() {
  try {
    await connectDB();
    const matches = await JobMatch.find()
      .populate("resumeId")
      .sort({ createdAt: -1 })
      .limit(50);
    return NextResponse.json({ success: true, data: matches });
  } catch (error) {
    console.error("Error fetching job matches:", error);
    return NextResponse.json(
      { error: "Failed to fetch job matches" },
      { status: 500 }
    );
  }
}
