/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { NavBar } from "@/components/NavBar";

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

const jobBoardData: JobBoard = {
  id: "d9f35cce-6b1b-4c4f-9a31-55ca2df7930a",
  title: "mehanjob",
  description: "mehanjob",
  location: "salem",
  postById: "7414bd58-fa68-4133-aeb5-a654ece5588b",
  postBy: "mehanmehan6@gmail.com",
  deadline: "2025-01-09T00:00:00.000Z",
  skillsRequired: [],
  contactEmail: "mehanmehan6@gmail.com",
  workSpaceId: "08de30cb-defa-4d0c-8909-7cd684b0ec9c",
  salaryFrom: 23,
  salaryTo: 34,
  employmentType: "Contract",
  createdAt: "2025-01-14T09:51:14.980Z",
  UpdatedAt: "2025-01-17T19:44:52.908Z",
};

export default function JobBoardDetails({jobBoards}: {jobBoards: JobBoard[]}) {
  return (
    <div>

      <div>
        
        <h1 className="font-Josefin_Sans text-4xl font-bold mb-5">Job Details</h1>
      </div>
      {

          jobBoards.map((jobBoardData,index) => (
          <div className="overflow-hidden" key={index}>
            <div className="mt-10 mx-10">

              <div className="p-6 border-2 border-purple-600 rounded-lg shadow-md mb-10 flex flex-col gap-5">
                <h2 className="font-Josefin_Sans text-2xl font-semibold mb-4">Job Information</h2>
                <hr className="text-violet-600 mb-4" />
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr>
                      <td className="font-bold p-2 border-b border-purple-300 w-1/3">Job Title:</td>
                      <td className="p-2 border-b border-purple-300">{jobBoardData.title}</td>
                    </tr>
                    <tr>
                      <td className="font-bold p-2 border-b border-purple-300">Description:</td>
                      <td className="p-2 border-b border-purple-300">{jobBoardData.description}</td>
                    </tr>
                    <tr>
                      <td className="font-bold p-2 border-b border-purple-300">Location:</td>
                      <td className="p-2 border-b border-purple-300">{jobBoardData.location}</td>
                    </tr>
                    <tr>
                      <td className="font-bold p-2 border-b border-purple-300">Posted By:</td>
                      <td className="p-2 border-b border-purple-300">{jobBoardData.postBy}</td>
                    </tr>
                    <tr>
                      <td className="font-bold p-2 border-b border-purple-300">Contact Email:</td>
                      <td className="p-2 border-b border-purple-300">{jobBoardData.contactEmail}</td>
                    </tr>
                    <tr>
                      <td className="font-bold p-2 border-b border-purple-300">Salary Range:</td>
                      <td className="p-2 border-b border-purple-300">
                        ${jobBoardData.salaryFrom}k - ${jobBoardData.salaryTo}k
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold p-2 border-b border-purple-300">Employment Type:</td>
                      <td className="p-2 border-b border-purple-300">{jobBoardData.employmentType}</td>
                    </tr>
                    <tr>
                      <td className="font-bold p-2 border-b border-purple-300">Application Deadline:</td>
                      <td className="p-2 border-b border-purple-300">
                        {new Date(jobBoardData.deadline).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold p-2">Created On:</td>
                      <td className="p-2">{new Date(jobBoardData.createdAt).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="   m-2">
                  <div className="flex justify-end items-center">

                      <button className="bg-[#9574e2] hover:bg-[#9574e2]  font-bold py-2 px-4 rounded justify-center text-white hover:scale-105  ">Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        ))
      }

    </div>

      )
  
}