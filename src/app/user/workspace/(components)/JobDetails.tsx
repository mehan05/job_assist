/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { NavBar } from "@/components/NavBar";
import axios from "axios";
import { toast } from "sonner";

interface JobBoard {
  id: string;
  title: string;
  description: string;
  location: string;
  postById: string;
  postBy: string;
  deadline: string;
  skillsRequired: string[];
  contactEmail: string;
  workSpaceId: string;
  salaryFrom: number;
  salaryTo: number;
  employmentType: string;
  createdAt: string;
  UpdatedAt: string;
}


export default function JobBoardDetails({
  jobBoards,
}: {
  jobBoards: JobBoard[];
}) {
  const handleApply = async (jobId: string) => {
    const toastId = toast.loading("Applying...");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/company-api/job-applications/apply",
        { jobId }
      );
      console.log(response);
      if (response.status == 200) {
        toast.success("Applied Successfully", { id: toastId });
      } else if (response.status == 401) {
        toast.error("Unauthorised user", { id: toastId });
      } else if (response.status == 402) {
        toast.error("Job Id Not found", { id: toastId });
      } else if (response.status == 404) {
        toast.error("Job Not found", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <div>
      <div>
        <h1 className="font-Josefin_Sans text-4xl font-bold mb-5">
          Job Details
        </h1>
      </div>
      {jobBoards.map((jobBoardData, index) => (
        <div className="overflow-hidden" key={index}>
          <div className="mt-10 mx-10">
            <div className="p-6 border-2 border-purple-600 rounded-lg shadow-md mb-10 flex flex-col gap-5">
              <h2 className="font-Josefin_Sans text-2xl font-semibold mb-4">
                Job Information
              </h2>
              <hr className="text-violet-600 mb-4" />
              <table className="w-full text-left border-collapse">
                <tbody>
                  <tr>
                    <td className="font-bold p-2 border-b border-purple-300 w-1/3">
                      Job Title:
                    </td>
                    <td className="p-2 border-b border-purple-300">
                      {jobBoardData.title}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold p-2 border-b border-purple-300">
                      Description:
                    </td>
                    <td className="p-2 border-b border-purple-300">
                      {jobBoardData.description}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold p-2 border-b border-purple-300">
                      Location:
                    </td>
                    <td className="p-2 border-b border-purple-300">
                      {jobBoardData.location}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold p-2 border-b border-purple-300">
                      Posted By:
                    </td>
                    <td className="p-2 border-b border-purple-300">
                      {jobBoardData.postBy}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold p-2 border-b border-purple-300">
                      Contact Email:
                    </td>
                    <td className="p-2 border-b border-purple-300">
                      {jobBoardData.contactEmail}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold p-2 border-b border-purple-300">
                      Salary Range:
                    </td>
                    <td className="p-2 border-b border-purple-300">
                      ${jobBoardData.salaryFrom}k - ${jobBoardData.salaryTo}k
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold p-2 border-b border-purple-300">
                      Employment Type:
                    </td>
                    <td className="p-2 border-b border-purple-300">
                      {jobBoardData.employmentType}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold p-2 border-b border-purple-300">
                      Application Deadline:
                    </td>
                    <td className="p-2 border-b border-purple-300">
                      {new Date(jobBoardData.deadline).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-bold p-2">Created On:</td>
                    <td className="p-2">
                      {new Date(jobBoardData.createdAt).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="   m-2">
                <div className="flex justify-end items-center">
                  <button
                    className="bg-[#9574e2] hover:bg-[#9574e2]  font-bold py-2 px-4 rounded justify-center text-white hover:scale-105  "
                    onClick={() => handleApply(jobBoardData.id)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
