"use client";

import { useState } from "react";
import Link from "next/link";

export default function UploadResume() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [useTextInput, setUseTextInput] = useState(false);
  const [resumeText, setResumeText] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setAnalysis(null);
    }
  };

  const handleUpload = async () => {
    if (!file && !resumeText) return;

    setLoading(true);

    try {
      let response;
      
      if (useTextInput && resumeText) {
        // Use text input API
        response = await fetch("/api/analyze-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            resumeText,
            fileName: "text-input.txt"
          }),
        });
      } else if (file) {
        // Use PDF upload API
        const formData = new FormData();
        formData.append("resume", file);
        response = await fetch("/api/analyze-resume", {
          method: "POST",
          body: formData,
        });
      } else {
        alert("Please provide a resume file or text");
        setLoading(false);
        return;
      }

      const result = await response.json();
      if (result.success) {
        setAnalysis(result.data);
        const dataToStore = {
          ...result.data,
          resumeId: result.resumeId,
        };
        localStorage.setItem("resumeAnalysis", JSON.stringify(dataToStore));
      } else {
        alert("Error analyzing resume: " + result.error);
      }
    } catch (error) {
      alert("Error uploading resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Upload Resume for Analysis
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            {/* Toggle between PDF and Text input */}
            <div className="mb-6 flex gap-4">
              <button
                onClick={() => setUseTextInput(false)}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                  !useTextInput
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                📄 Upload PDF
              </button>
              <button
                onClick={() => setUseTextInput(true)}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                  useTextInput
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                📝 Paste Text
              </button>
            </div>

            {!useTextInput ? (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Resume (PDF)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Having trouble with PDF? Try the "Paste Text" option above
                </p>
              </div>
            ) : (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paste Resume Text
                </label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste the resume text here (copy from PDF, Word, or any text source)..."
                  className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Copy and paste resume content directly if PDF upload isn't working
                </p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={(!file && !resumeText) || loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>

          {analysis && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Analysis Results
              </h2>

              {/* Personal Info */}
              {analysis.personalInfo && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
                  <div className="bg-gray-50 p-4 rounded">
                    <p><strong>Name:</strong> {analysis.personalInfo.name}</p>
                    <p><strong>Email:</strong> {analysis.personalInfo.email}</p>
                    <p><strong>Phone:</strong> {analysis.personalInfo.phone}</p>
                    <p><strong>Location:</strong> {analysis.personalInfo.location}</p>
                  </div>
                </div>
              )}

              {/* Technical Skills */}
              {analysis.technicalSkills && analysis.technicalSkills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Technical Skills</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {analysis.technicalSkills.map((skill: any, idx: number) => (
                      <div key={idx} className="bg-blue-50 p-4 rounded">
                        <p className="font-semibold text-blue-900">{skill.skill}</p>
                        <p className="text-sm text-gray-600">Proficiency: {skill.proficiency}</p>
                        <p className="text-sm text-gray-600">Experience: {skill.yearsOfExperience}</p>
                        <p className="text-sm mt-2">{skill.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Soft Skills */}
              {analysis.softSkills && analysis.softSkills.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Soft Skills</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {analysis.softSkills.map((skill: any, idx: number) => (
                      <div key={idx} className="bg-green-50 p-4 rounded">
                        <p className="font-semibold text-green-900">{skill.skill}</p>
                        <p className="text-sm text-gray-600">{skill.description}</p>
                        <p className="text-sm mt-2 italic">{skill.examples}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hackathons */}
              {analysis.hackathons && analysis.hackathons.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Hackathons & Competitions</h3>
                  {analysis.hackathons.map((hack: any, idx: number) => (
                    <div key={idx} className="bg-purple-50 p-4 rounded mb-3">
                      <p className="font-semibold text-purple-900">{hack.name} ({hack.year})</p>
                      <p className="text-sm"><strong>Project:</strong> {hack.project}</p>
                      <p className="text-sm"><strong>Achievement:</strong> {hack.achievement}</p>
                      <p className="text-sm"><strong>Technologies:</strong> {hack.technologiesUsed?.join(", ")}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Market Relevance */}
              {analysis.marketRelevance && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Market Relevance Analysis</h3>
                  <div className="bg-yellow-50 p-4 rounded">
                    <p className="text-2xl font-bold mb-2">
                      Score: {analysis.marketRelevance.overallScore}/100
                    </p>
                    <p className="mb-3">{analysis.marketRelevance.analysis}</p>
                    {analysis.marketRelevance.trendingSkills?.length > 0 && (
                      <div className="mb-2">
                        <strong>Trending Skills:</strong> {analysis.marketRelevance.trendingSkills.join(", ")}
                      </div>
                    )}
                    {analysis.marketRelevance.missingInDemandSkills?.length > 0 && (
                      <div>
                        <strong>Missing In-Demand Skills:</strong> {analysis.marketRelevance.missingInDemandSkills.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-8">
                <Link
                  href="/hr-dashboard"
                  className="inline-block bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Match with Job Description →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
