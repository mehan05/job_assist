"use client"
import { useState } from "react";

interface Application {
  jobTitle: string;
  status: string;
  dateApplied: string;
}

export default function MyApplications() {
  const [applications, setApplications] = useState<Application[]>([
    {
      jobTitle: "Senior Frontend Developer",
      status: "Under Review",
      dateApplied: "Jan 5, 2025",
    },
    {
      jobTitle: "UX/UI Designer",
      status: "Rejected",
      dateApplied: "Dec 15, 2024",
    },
    {
      jobTitle: "Backend Engineer",
      status: "Interviewing",
      dateApplied: "Dec 20, 2024",
    },
    {
      jobTitle: "Data Scientist",
      status: "Accepted",
      dateApplied: "Jan 2, 2025",
    },
  ]);

  return (
    <div className="overflow-hidden  ">
      <div className=" ml-10 mr-10">
        <div className="h-64 w-auto max-w-3/4 flex items-center">
          <div className="w-full">
            <h1 className="font-Josefin_Sans text-4xl font-bold">
              My Job Applications
            </h1>
            <br />
            <p className="font-Josefin_Sans text-xl font-semibold mb-3">
              View and track the status of all the jobs you&apos;ve applied to.
            </p>
          </div>
        </div>

        <div className="">
          <div>
            <h1 className="font-Josefin_Sans text-2xl font-bold">
              Your Applications
            </h1>
          </div>

          <div className="">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="text-left px-4 py-2 border-b">Job Title</th>
                  <th className="text-left px-4 py-2 border-b">Status</th>
                  <th className="text-left px-4 py-2 border-b">Date Applied</th>
                  <th className="text-left px-4 py-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{application.jobTitle}</td>
                    <td
                      className={`px-4 py-2 border-b ${
                        application.status === "Under Review"
                          ? "text-yellow-500"
                          : application.status === "Rejected"
                          ? "text-red-500"
                          : application.status === "Interviewing"
                          ? "text-blue-500"
                          : "text-green-500"
                      }`}
                    >
                      {application.status}
                    </td>
                    <td className="px-4 py-2 border-b">{application.dateApplied}</td>
                    <td className="px-4 py-2 border-b">
                      <button className="text-indigo-500 hover:underline">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        

        <div className="mt-10">
          <div className="flex justify-between">
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-full hover:scale-110 hover:shadow-lg transition-transform duration-300">
              Apply for More Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
