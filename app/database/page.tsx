"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function DatabasePage() {
  const [resumes, setResumes] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"resumes" | "matches">("resumes");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resumesRes, matchesRes] = await Promise.all([
        fetch("/api/resumes"),
        fetch("/api/job-matches"),
      ]);

      if (resumesRes.ok) {
        const resumesData = await resumesRes.json();
        setResumes(resumesData.data || []);
      }

      if (matchesRes.ok) {
        const matchesData = await matchesRes.json();
        setMatches(matchesData.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex justify-between items-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Database Dashboard
          </h1>

          {loading ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <p className="text-gray-600">Loading data...</p>
            </div>
          ) : resumes.length === 0 && matches.length === 0 ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <p className="text-yellow-700 mb-2">
                <strong>No data found in MongoDB</strong>
              </p>
              <p className="text-sm text-yellow-600">
                Make sure MongoDB is running and connected. Data will be saved
                automatically when you analyze resumes and match jobs.
              </p>
              <p className="text-sm text-yellow-600 mt-2">
                Connection string: Check MONGODB_URI in .env.local
              </p>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="bg-white rounded-t-lg shadow-lg">
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveTab("resumes")}
                    className={`flex-1 py-4 px-6 font-semibold ${
                      activeTab === "resumes"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Resumes ({resumes.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("matches")}
                    className={`flex-1 py-4 px-6 font-semibold ${
                      activeTab === "matches"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Job Matches ({matches.length})
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="bg-white rounded-b-lg shadow-lg p-6">
                {activeTab === "resumes" ? (
                  <div className="space-y-4">
                    {resumes.map((resume) => (
                      <div
                        key={resume._id}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {resume.personalInfo?.name || "Unknown"}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {resume.fileName}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(resume.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                              Market Score:{" "}
                              {resume.marketRelevance?.overallScore || "N/A"}
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">
                              <strong>Email:</strong>{" "}
                              {resume.personalInfo?.email || "N/A"}
                            </p>
                            <p className="text-gray-600">
                              <strong>Phone:</strong>{" "}
                              {resume.personalInfo?.phone || "N/A"}
                            </p>
                            <p className="text-gray-600">
                              <strong>Location:</strong>{" "}
                              {resume.personalInfo?.location || "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">
                              <strong>Technical Skills:</strong>{" "}
                              {resume.technicalSkills?.length || 0}
                            </p>
                            <p className="text-gray-600">
                              <strong>Experience:</strong>{" "}
                              {resume.experience?.length || 0} positions
                            </p>
                            <p className="text-gray-600">
                              <strong>Hackathons:</strong>{" "}
                              {resume.hackathons?.length || 0}
                            </p>
                          </div>
                        </div>

                        {resume.technicalSkills?.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-semibold text-gray-700 mb-2">
                              Top Skills:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {resume.technicalSkills
                                .slice(0, 8)
                                .map((skill: any, idx: number) => (
                                  <span
                                    key={idx}
                                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                                  >
                                    {skill.skill}
                                  </span>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {matches.map((match) => (
                      <div
                        key={match._id}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {match.jobTitle || "Untitled Position"}
                            </h3>
                            <p className="text-xs text-gray-400">
                              {new Date(match.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div
                              className={`px-4 py-2 rounded-full text-lg font-bold ${
                                match.matchScore >= 80
                                  ? "bg-green-100 text-green-800"
                                  : match.matchScore >= 60
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {match.matchScore}%
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-green-50 p-3 rounded">
                            <p className="text-xs text-gray-600 mb-1">
                              Matched Skills
                            </p>
                            <p className="text-2xl font-bold text-green-700">
                              {match.skillsMatch?.matched?.length || 0}
                            </p>
                          </div>
                          <div className="bg-red-50 p-3 rounded">
                            <p className="text-xs text-gray-600 mb-1">
                              Missing Skills
                            </p>
                            <p className="text-2xl font-bold text-red-700">
                              {match.skillsMatch?.missing?.length || 0}
                            </p>
                          </div>
                          <div className="bg-purple-50 p-3 rounded">
                            <p className="text-xs text-gray-600 mb-1">
                              Experience Match
                            </p>
                            <p className="text-2xl font-bold text-purple-700">
                              {match.experienceMatch?.score || 0}%
                            </p>
                          </div>
                        </div>

                        {match.strengths?.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-semibold text-green-700 mb-2">
                              Key Strengths:
                            </p>
                            <ul className="text-sm text-gray-700 space-y-1">
                              {match.strengths.slice(0, 3).map((s: string, i: number) => (
                                <li key={i}>✓ {s}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {match.detailedReasoning && (
                          <div className="mt-4 bg-gray-50 p-4 rounded">
                            <p className="text-sm text-gray-700 line-clamp-3">
                              {match.detailedReasoning}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
