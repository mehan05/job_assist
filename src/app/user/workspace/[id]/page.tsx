/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { NavBar } from "@/components/NavBar";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import Cookies from "js-cookie";
import JobBoardDetails from "../(components)/JobDetails";
interface TokenPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
export interface User {
  id: string;
  name: string;
  age: number;
  headlines: string;
  bio: string;
  gender: string;
  place: string;
  role: "USER" | "ADMIN";
  skills: string[];
  dob: string;
  email: string;
  password: string;
}
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
interface WorkSpace {
  createdAt: string;
  id: string;
  name: string;
  description: string;
  createdById: string;
  createdBy: string;
  jobPosted: number;
  joinRequests: number;
  category: string[];
  members: User[];
  jobBoards: JobBoard[];
}

export default function WorkspaceDetails() {
  const { id } = useParams();
  const [ismember, setIsMember] = useState<boolean | null>(null);
  const [workspaces, setWorkspaces] = useState<WorkSpace>({
    createdAt: "",
    id: "",
    name: "",
    description: "",
    createdById: "",
    createdBy: "",
    jobPosted: 0,
    joinRequests: 0,
    category: [],
    members: [],
    jobBoards: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // State for the form data
  const [formData, setFormData] = useState({
    message: "",
    skills: "",
  });
  useEffect(() => {
    const fetchWorkspaces = async () => {
      const toastId = toast.loading("Loading workspaces...");
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user-api/workspace/" + id
        );
        if (response.status === 200) {
          toast.success("Workspaces loaded successfully", { id: toastId });
          setWorkspaces(response.data.workspaces);
          setLoading(false);
          setIsMember(response.data.isMember);
        } else {
          toast.error("Failed to load workspaces", { id: toastId });
          setError(true);
          toast.warning("Failed to load workspaces.");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error("Error fetching workspaces");
        }
      }
    };

    fetchWorkspaces();
  }, [id]);
  console.log("workspacesjobboards", workspaces.jobBoards);
  console.log("memeber status:", ismember);
  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const formDataNew = {
      message: formData.message,
      skills: formData.skills.split(","),
    };
    console.log("formdatanew", formDataNew);
    console.log("Submitted Data:", formData);
    console.log("type:", typeof formData.skills);

    const toastId = toast.loading("Submitting request...");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/company-api/workspace/request/" + id,
        formDataNew
      );
      if (response.status === 201) {
        toast.success("Request submitted successfully!", { id: toastId });
        setFormData({ message: "", skills: "" });
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request. Please try again.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="overflow-hidden">
      <NavBar />
      <div className="mt-10 mx-10">
        <h1 className="font-Josefin_Sans text-4xl font-bold mb-5">
          Workspace Details
        </h1>

        <div className="p-6 border-2 border-purple-600 rounded-lg shadow-md mb-10">
          <h2 className="font-Josefin_Sans text-2xl font-semibold mb-4">
            Workspace Information
          </h2>
          <hr className="text-violet-600 mb-4" />
          <table className="w-full text-left border-collapse">
            <tbody>
              <tr>
                <td className="font-bold p-2 border-b border-purple-300 w-1/3">
                  Workspace Name:
                </td>
                <td className="p-2 border-b border-purple-300">
                  {workspaces?.name}
                </td>
              </tr>
              <tr>
                <td className="font-bold p-2 border-b border-purple-300">
                  Description:
                </td>
                <td className="p-2 border-b border-purple-300">
                  {workspaces?.description}
                </td>
              </tr>
              <tr>
                <td className="font-bold p-2 border-b border-purple-300">
                  Category:
                </td>
                <td className="p-2 border-b border-purple-300">
                  {workspaces?.category &&
                    workspaces.category.map((category, index) => (
                      <span key={index}>
                        {category}
                        {index < workspaces.category.length - 1 ? ", " : ""}
                      </span>
                    ))}
                </td>
              </tr>
              <tr>
                <td className="font-bold p-2 border-b border-purple-300">
                  Created By:
                </td>
                <td className="p-2 border-b border-purple-300">
                  {workspaces?.createdBy}
                </td>
              </tr>
              <tr>
                <td className="font-bold p-2">Created On:</td>
                <td className="p-2">
                  {workspaces?.createdAt &&
                    new Date(workspaces.createdAt).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {ismember != null && ismember == true ? (
          <JobBoardDetails jobBoards={workspaces.jobBoards} />
        ) : (
          ismember == false && (
            <div className="p-6 border-2 border-purple-600 rounded-lg shadow-md mb-10">
              <h2 className="font-Josefin_Sans text-2xl font-semibold mb-4">
                Request to Join
              </h2>
              <textarea
                name="message"
                placeholder="Write a short message explaining why you'd like to join this workspace. (Max 250 characters)"
                className="w-full h-28 border rounded-md p-3 mb-4"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
              <input
                name="skills"
                type="text"
                placeholder="Relevant Skills (e.g., Skill 1, Skill 2)"
                className="w-full border rounded-md p-3 mb-4"
                value={formData.skills}
                onChange={handleInputChange}
              />
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 text-white rounded-md"
              >
                Submit Request
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
