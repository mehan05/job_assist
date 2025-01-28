import React from "react";
import JobAlertCard from "./JobAlertCard/JobAlertCard";
import axios from "axios";

interface JobBoard {
  id: string;
  title: string;
  description: string;
  location: string;
  postById: string;
  postBy: string;
  deadline: Date;
  skillsRequired: string[];
  contactEmail: string;
  workSpaceId: string;
  salaryFrom: number;
  salaryTo: number;
  employmentType: string;
  createdAt: Date;
  UpdatedAt: Date;
}

const fetchJobs = async (): Promise<JobBoard[]> => {
  try {
    const response = await axios.get(`/api/user-api/dashboard/job/`);
    if (response.status === 200) {
      console.log("Response:", response.data);
      return response.data.response;
    }
    return [];
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return [];
  }
};

const JobAlerts = async () => {
  const jobs = await fetchJobs();

  if (!jobs || jobs.length === 0) {
    return <div>No job alerts available.</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="m-2">
        <h1 className="text-2xl font-semibold font-Josefin_Sans">Job Alerts</h1>
      </div>
      {jobs.map((job: JobBoard, index: number) => (
        <div key={index}>
          <JobAlertCard job={job} />
        </div>
      ))}
    </div>
  );
};

export default JobAlerts;
