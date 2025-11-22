"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            AI Resume Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powered by Gemini Flash 2.5 - Analyze resumes and match candidates to job requirements with AI precision
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Link href="/upload-resume">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500">
              <div className="text-4xl mb-4">📄</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Upload Resume
              </h2>
              <p className="text-gray-600">
                Upload a candidate's resume in PDF format for detailed AI analysis including skills, experience, and market relevance
              </p>
            </div>
          </Link>

          <Link href="/hr-dashboard">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500">
              <div className="text-4xl mb-4">👔</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                HR Dashboard
              </h2>
              <p className="text-gray-600">
                Match analyzed resumes against job descriptions and get AI-powered candidate scoring and recommendations
              </p>
            </div>
          </Link>

          <Link href="/database">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500">
              <div className="text-4xl mb-4">💾</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Database
              </h2>
              <p className="text-gray-600">
                View all analyzed resumes and job matches stored in MongoDB Compass
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Key Features
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold text-lg mb-2">Detailed Analysis</h4>
              <p className="text-gray-600 text-sm">
                Extract and categorize technical skills, soft skills, experience, hackathons, and projects
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-bold text-lg mb-2">Market Relevance</h4>
              <p className="text-gray-600 text-sm">
                Assess skills against current market trends and identify gaps
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="text-3xl mb-3">🤝</div>
              <h4 className="font-bold text-lg mb-2">Smart Matching</h4>
              <p className="text-gray-600 text-sm">
                Get percentage-based candidate fit scores with detailed reasoning
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
