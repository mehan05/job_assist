"use client";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { NavBar } from "@/components/NavBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  age: number;
  headlines: string;
  bio: string;
  gender: string;
  place: string;
  role: "USER" | "COMPANY";
  skills: string[];
  dob: string;
  email: string;
  password: string;
}

export interface JobApplication {
  id: string;
  title: string;
  jobId: string;
  userId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

const ApplicantPage = () => {
  const [applicants, setApplicants] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      const toastId = toast.loading("Loading Applications...");
      try {
        const response = await axios.get(
          "https://job-assist.vercel.app/api/company-api/job-applications/"
        );
        setApplicants(response.data.response);
        toast.success("Applications loaded successfully", { id: toastId });
      } catch (err) {
        setError("Error fetching applicants");
        console.error(err);
        toast.error("Error fetching applicants", { id: toastId });
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  const handleAction = async (id: string, action: "approve" | "reject") => {
    const toastId = toast.loading(
      `${action === "approve" ? "Approving" : "Rejecting"} application...`
    );
    try {
      const response = await axios.put(
        `https://job-assist.vercel.app/api/company-api/job-applications/${id}`,
        { status: action === "approve" ? "ACCEPTED" : "REJECTED" }
      );
      if (response.status == 200) {
        const updatedApplicants = applicants.map((applicant) => {
          if (applicant.id === id) {
            return {
              ...applicant,
              status: action === "approve" ? "ACCEPTED" : "REJECTED",
            };
          }
          return applicant;
        });
        setApplicants(updatedApplicants);
        toast.success(
          `${
            action === "approve" ? "Approved" : "Rejected"
          } application with ID: ${id}`,
          { id: toastId }
        );
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        toast(error.response?.data.message, { id: toastId });
        return false;
      }
    }
  };

  if (loading) {
    return (
      <div>
        <NavBar />
        <h1 className="font-Josefin_Sans text-3xl font-bold m-4">Applicants</h1>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar />
        <h1 className="font-Josefin_Sans text-3xl font-bold m-4">Applicants</h1>
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <h1 className="font-Josefin_Sans text-3xl font-bold m-4 text-center">
        Applicants
      </h1>
      <div className="flex justify-center items-center mt-10">
        <div className="overflow-x-auto w-[90%] rounded-xl  max-w-7xl">
          <table className="table-auto  w-full  border-collapse  shadow-lg">
            <thead className="bg-purple-500 text-white">
              <tr>
                <th className="border border-gray-300 p-4">Avatar</th>
                <th className="border border-gray-300 p-4">Name</th>
                <th className="border border-gray-300 p-4">Title</th>
                <th className="border border-gray-300 p-4">Status</th>
                <th className="border border-gray-300 p-4">Email</th>
                <th className="border border-gray-300 p-4">Gender</th>
                <th className="border border-gray-300 p-4">Place</th>
                <th className="border border-gray-300 p-4">Skills</th>
                <th className="border border-gray-300 p-4">Application Date</th>
                <th className="border border-gray-300 p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((val) => (
                <tr key={val.id} className=" transition-colors border-b ">
                  <td className="border border-gray-300 p-4 text-center">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>{val.user.name[0]}</AvatarFallback>
                    </Avatar>
                  </td>
                  <td className="border border-gray-300 p-4">
                    {val.user.name}
                  </td>
                  <td className="border border-gray-300 p-4">{val.title}</td>
                  <td className="border border-gray-300 p-4">{val.status}</td>
                  <td className="border border-gray-300 p-4">
                    {val.user.email}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {val.user.gender}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {val.user.place}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {val.user.skills.join(", ")}
                  </td>
                  <td className="border border-gray-300 p-4">
                    {new Date(val.createdAt).toLocaleString()}
                  </td>
                  <td className=" p-4 flex gap-3 justify-center">
                    <button
                      className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
                      onClick={() => handleAction(val.id, "approve")}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={() => handleAction(val.id, "reject")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicantPage;
