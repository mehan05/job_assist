"use client"
import { Badge } from "@/components/ui/badge";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import { toast } from "sonner";
interface JobData {
  title: string;
  skillsRequired:string[];
  description: string;
  location: string;
  salaryFrom: number;
  salaryTo: number;
  contactEmail:string
  employmentType: string;
  deadline: string;
}
export default function CreateJobPage() {
  const router = useRouter();
  const [skillsRequired, setskillsRequired] = useState<string[]>([]);
  const [skill, setSkill] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [jobData, setJobData] = useState<JobData>({
    title: "",
    description: "",
    skillsRequired: [],
    location: "",
    salaryFrom: 0,
    contactEmail:"",
    salaryTo: 0,
    employmentType: "Full-time",
    deadline: "",
  })

  const handleOnChange = (e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>{
    const{name,value} = e.target;
    setJobData((prev)=>({...prev,[name]:value}));
    if(name=="salaryFrom" || name==="salaryTo")
    {
      setJobData((prev)=>({...prev,[name]:+value}))
    }
  }

  useEffect(() => {
        
    const date1 = date.toISOString().split('T')[0];
    console.log(typeof date1)
    setJobData((prev)=>({...prev,skillsRequired:skillsRequired}))
    setJobData((prev)=>({...prev,deadline:date1}));
  },[skillsRequired,date]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let toastId;
    try {
      toastId = toast.loading("Creating Job...");
      const response = await axios.post("http://localhost:3000/api/company/post-job",jobData);

      if (response.status === 200) {
        toast.success("Job Created Successfully", { id: toastId });
        router.replace("/company/dashboard");
      }
      else if(response.status==401)
      {
        toast.error("Invalid Data", { id: toastId });
      }
      else if(response.status==403)
      {
        toast.warning("Fill All Details", { id: toastId });
      }
      else if(response.status==402){
        toast.error("Invalid User", { id: toastId });
      }

    } catch (error) {
        if(error instanceof AxiosError)
          { 
            console.log(error.response?.data);
            toast.error("Something went wrong", { id: toastId });
            console.log(error)  
          } 
    }

    console.log(jobData);
  };

  const HandleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("skill",skillsRequired);
      if(skill.trim())
      {
        setskillsRequired((prev)=>[...prev,skill]);
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
                name="title"
                value={jobData.title}
                onChange={handleOnChange}
                className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter job title"
              />
            </div>

            <div>
              <label className="font-Josefin_Sans text-xl font-semibold">Job Description</label>
              <textarea
              name="description"
                value={jobData.description}
                onChange={handleOnChange}
                className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={6}
                placeholder="Enter a detailed job description"
              />
            </div>

            <div>
              <label className="font-Josefin_Sans text-xl font-semibold">Required skillsRequired</label>
              <input
                type="text"
                value={skill}
                name="skillsRequired"
                onKeyDown={HandleSkillAdd}
                onChange={(e) => setSkill(e.target.value)}
                className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter required skillsRequired (e.g., React, Node.js)"
              />
            </div>

                    <div className="flex gap-5">
                        {skillsRequired.slice(0, 7).map((ele, index) => (
                          <Badge key={index} variant={"outline"}>
                            {ele}
                          </Badge>
                        ))}
                        
                        {skillsRequired.length > 7 && (
                          <Badge variant={"outline"}>
                            ...
                          </Badge>
                        )}
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
              <label className="font-Josefin_Sans text-xl font-semibold">Contact contactEmail</label>
              <input
                type="contactEmail"
                name="contactEmail"
                value={jobData.contactEmail}
                onChange={handleOnChange}
                className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter Contact contactEmail"
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
