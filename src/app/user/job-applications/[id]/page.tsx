import { NavBar } from "@/components/NavBar";
import React from "react";
import MyApplications from "../(components)/MyApplication";
import axios, { AxiosError } from "axios";
interface JobApplication {
  id: string;
  title: string;
  status: string;
  jobId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

const fetchApplications = async (userId: string) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/user-api/dashboard/job-applications",
      { params: { userId } }
    );
    if (response.status == 200) {
      return response.data.response.jobApplications as JobApplication[];
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error fetching job applications:", error);
      return [];
    }
  }
  return [];
};
const JobApplications = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;
  const applications: JobApplication[] = await fetchApplications(id);

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="scale-90">
        <MyApplications applications={applications} />
      </div>
    </div>
  );
};

export default JobApplications;
