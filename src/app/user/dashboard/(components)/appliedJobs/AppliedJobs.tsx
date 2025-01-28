import React from "react";
import CompanyCard from "./companyCard/CompanyCard";
import Link from "next/link";
import axios from "axios";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
interface TokenPayLoad {
  payload: {
    email: string;
    id: string;
    role: string;
  };
  exp: number;
  iat: number;
  nbf: number;
}
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
const fetchAppliedJobs = async () => {
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
const AppliedJobs = async () => {
  const Secret = process.env.SECRET_KEY as string;
  const AppliedJobs = await fetchAppliedJobs();
  const token = (await cookies()).get("token")?.value;
  const decodedToken =
    token && (jwt.verify(token, Secret) as unknown as TokenPayLoad);
  console.log("decrypt token", decodedToken);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between ">
          <div className="m-2">
            <h1 className="text-2xl font-semibold font-Josefin_Sans   bg-white dark:bg-black ">
              Applied Jobs
            </h1>
          </div>
          {decodedToken && (
            <div className="m-2">
              <div className="hover:scale-105 hover:text-lg">
                <Link
                  href={`job-applications/${decodedToken.payload.id}`}
                  className="text-sm font-semibold font-Josefin_Sans hover:text-violet-600 "
                >
                  View All Applications
                </Link>
              </div>
            </div>
          )}
        </div>

        {AppliedJobs.map((appliedJob: JobBoard, index: number) => (
          <div key={index}>
            <CompanyCard appliedJob={appliedJob} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
