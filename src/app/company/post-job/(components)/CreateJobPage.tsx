"use client"
import {  useEffect, useState } from "react";
interface JobData {
  jobTitle: string;
  skills:string[];
  jobDescription: string;
  location: string;
  salaryFrom: number;
  salaryTo: number;
  employmentType: string;
  deadline: string;
}
export default function CreateJobPage() {
  const [skills, setSkills] = useState<string[]>([]);
  const [skill, setSkill] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [jobData, setJobData] = useState<JobData>({
    jobTitle: "",
    jobDescription: "",
    skills: [],
    location: "",
    salaryFrom: 0,
    salaryTo: 0,
    employmentType: "Full-time",
    deadline: "",
  })

  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>{
    const{name,value} = e.target;
    setJobData((prev)=>({...prev,[name]:value}));
  }

  useEffect(() => {
        
        setJobData((prev)=>({...prev,skills:skills}))
  },[skills]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const date1 = date.toISOString().split('T')[0];
    setJobData((prev)=>({...prev,deadline:date1}));

    console.log(jobData);
  };

  const HandleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("skill",skills);
      if(skill.trim())
      {
        e.preventDefault();
        setSkills((prev)=>[...prev,skill]);
        setSkill("");
      }
    }
  }
  console.log(jobData);
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
                name="jobTitle"
                value={jobData.jobTitle}
                onChange={handleOnChange}
                className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter job title"
              />
            </div>

            <div>
              <label className="font-Josefin_Sans text-xl font-semibold">Job Description</label>
              <textarea
              name="jobDescription"
                value={jobData.jobDescription}
                onChange={handleOnChange}
                className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={6}
                placeholder="Enter a detailed job description"
              />
            </div>

            <div>
              <label className="font-Josefin_Sans text-xl font-semibold">Required Skills</label>
              <input
                type="text"
                value={skill}
                name="skills"
                onKeyDown={HandleSkillAdd}
                onChange={(e) => setSkill(e.target.value)}
                className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter required skills (e.g., React, Node.js)"
              />
            </div>

            <div>
              <label className="font-Josefin_Sans text-xl font-semibold">Location</label>
              <input
                type="text"
                name="location"
                value={jobData.location}
                onChange={handleOnChange}
                className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter job location"
              />
            </div>

            <div>
              <label className="font-Josefin_Sans text-xl font-semibold">Employment Type</label>
              <select
                value={jobData.employmentType}
                onChange={handleOnChange}
                name="employmentType"
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
                  value={jobData.salaryFrom}
                  onChange={handleOnChange}
                  name="salaryFrom"
                  className="w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="From"
                />
                <input
                  type="number"
                  value={jobData.salaryTo}
                  onChange={handleOnChange}
                  name="salaryTo"
                  className="w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="To"
                />
              </div>
            </div>

            <div>
              <label className="font-Josefin_Sans text-xl font-semibold">Application Deadline</label>
              <input
                type="date"
                value={jobData.deadline}
                name="deadline"
                onChange={(e)=>setDate(e.target.valueAsDate!)}
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
