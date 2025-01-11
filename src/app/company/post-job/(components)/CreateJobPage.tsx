"use client"
import { useState } from "react";

export default function CreateJobPage() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [employmentType, setEmploymentType] = useState("Full-time");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="overflow-hidden scale-90">
      <div className=" ml-10 m-2">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-Josefin_Sans text-5xl font-bold mb-6">
            Create a New Job Posting
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="font-Josefin_Sans text-xl font-semibold">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter job title"
              />
            </div>

            <div>
              <label className="font-Josefin_Sans text-xl font-semibold">Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={6}
                placeholder="Enter a detailed job description"
              />
            </div>

            <div>
              <label className="font-Josefin_Sans text-xl font-semibold">Required Skills</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter required skills (e.g., React, Node.js)"
              />
            </div>

            <div>
              <label className="font-Josefin_Sans text-xl font-semibold">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter job location"
              />
            </div>

            <div>
              <label className="font-Josefin_Sans text-xl font-semibold">Employment Type</label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="font-Josefin_Sans text-xl font-semibold">Salary Range</label>
              <div className="flex space-x-4 mt-2">
                <input
                  type="number"
                  value={salaryFrom}
                  onChange={(e) => setSalaryFrom(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="From"
                />
                <input
                  type="number"
                  value={salaryTo}
                  onChange={(e) => setSalaryTo(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="To"
                />
              </div>
            </div>

            <div>
              <label className="font-Josefin_Sans text-xl font-semibold">Application Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="font-Josefin_Sans text-xl font-semibold mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4 rounded-3xl w-full hover:scale-105 hover:transition-all hover:duration-300"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>

     
    </div>
  );
}
