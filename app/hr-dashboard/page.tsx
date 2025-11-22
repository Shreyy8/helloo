"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HRDashboard() {
  const [resumeData, setResumeData] = useState<any>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("resumeAnalysis");
    if (stored) {
      setResumeData(JSON.parse(stored));
    }
  }, []);

  const handleMatch = async () => {
    if (!resumeData || !jobDescription) {
      alert("Please upload a resume first and enter a job description");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/match-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeData,
          jobDescription,
          resumeId: resumeData.resumeId,
          jobTitle: jobDescription.split('\n')[0] || "Untitled Position",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setMatchResult(result.data);
      } else {
        alert("Error matching job: " + result.error);
      }
    } catch (error) {
      alert("Error processing match");
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

        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            HR Dashboard - Job Matching
          </h1>

          {!resumeData && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <p className="text-yellow-700">
                No resume data found. Please{" "}
                <Link href="/upload-resume" className="underline font-semibold">
                  upload a resume
                </Link>{" "}
                first.
              </p>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Job Description
            </h2>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here including required skills, experience, and qualifications..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleMatch}
              disabled={!resumeData || !jobDescription || loading}
              className="mt-4 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Analyzing Match..." : "Match Resume to Job"}
            </button>
          </div>

          {matchResult && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Match Results
              </h2>

              {/* Match Score */}
              <div className="mb-8 text-center">
                <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8">
                  <p className="text-lg mb-2">Overall Match Score</p>
                  <p className="text-6xl font-bold">{matchResult.matchScore}%</p>
                </div>
              </div>

              {/* Skills Match */}
              {matchResult.skillsMatch && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4">Skills Analysis</h3>
                  
                  {matchResult.skillsMatch.matched?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-green-700 mb-2">
                        ✓ Matched Skills
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {matchResult.skillsMatch.matched.map((skill: any, idx: number) => (
                          <div key={idx} className="bg-green-50 p-3 rounded">
                            <p className="font-semibold">{skill.skill}</p>
                            <p className="text-sm text-gray-600">{skill.relevance}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchResult.skillsMatch.missing?.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-red-700 mb-2">
                        ✗ Missing Skills
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {matchResult.skillsMatch.missing.map((skill: any, idx: number) => (
                          <div key={idx} className="bg-red-50 p-3 rounded">
                            <p className="font-semibold">{skill.skill}</p>
                            <p className="text-sm text-gray-600">Importance: {skill.importance}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchResult.skillsMatch.additional?.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-blue-700 mb-2">
                        + Additional Skills
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {matchResult.skillsMatch.additional.map((skill: any, idx: number) => (
                          <div key={idx} className="bg-blue-50 p-3 rounded">
                            <p className="font-semibold">{skill.skill}</p>
                            <p className="text-sm text-gray-600">{skill.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Experience Match */}
              {matchResult.experienceMatch && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4">Experience Match</h3>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <p className="text-3xl font-bold text-purple-900 mb-3">
                      {matchResult.experienceMatch.score}%
                    </p>
                    <p className="text-gray-700">{matchResult.experienceMatch.analysis}</p>
                  </div>
                </div>
              )}

              {/* Strengths & Weaknesses */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {matchResult.strengths?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-green-700">
                      Strengths
                    </h3>
                    <ul className="space-y-2">
                      {matchResult.strengths.map((strength: string, idx: number) => (
                        <li key={idx} className="bg-green-50 p-3 rounded flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {matchResult.weaknesses?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-red-700">
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-2">
                      {matchResult.weaknesses.map((weakness: string, idx: number) => (
                        <li key={idx} className="bg-red-50 p-3 rounded flex items-start">
                          <span className="text-red-600 mr-2">!</span>
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Fit Analysis */}
              {matchResult.fitAnalysis && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4">Detailed Fit Analysis</h3>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded">
                      <h4 className="font-semibold text-blue-900 mb-2">Technical Fit</h4>
                      <p className="text-gray-700">{matchResult.fitAnalysis.technical}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded">
                      <h4 className="font-semibold text-green-900 mb-2">Cultural Fit</h4>
                      <p className="text-gray-700">{matchResult.fitAnalysis.cultural}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded">
                      <h4 className="font-semibold text-purple-900 mb-2">Growth Potential</h4>
                      <p className="text-gray-700">{matchResult.fitAnalysis.growth}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {matchResult.recommendations?.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4">Recommendations</h3>
                  <ul className="space-y-2">
                    {matchResult.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="bg-yellow-50 p-4 rounded flex items-start">
                        <span className="text-yellow-600 mr-2">💡</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Detailed Reasoning */}
              {matchResult.detailedReasoning && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-4">
                    Why This Candidate?
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {matchResult.detailedReasoning}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
