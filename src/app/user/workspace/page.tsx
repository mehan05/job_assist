"use client";
import { NavBar } from "@/components/NavBar";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface WorkSpace {
  id: string;
  name: string;
  description: string;
  createdById: string;
  createdBy: string;
  isPublic: boolean;
  jobPosted: number;
  joinRequests: number;
  category: string[];
}

export default function BrowseWorkspaces() {
  const [workspaces, setWorkspaces] = useState<WorkSpace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const toastId = toast.loading("Loading workspaces...");
      try {
        const response = await axios.get(
          "https://job-assist.vercel.app/api/user-api/workspace"
        );
        if (response.status === 200) {
          toast.success("Workspaces loaded successfully", { id: toastId });
          setWorkspaces(response.data.workspaces);
          setLoading(false);
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
  }, []);

  return (
    <div className="overflow-hidden">
      <NavBar />
      <div className="mt-10 mx-10">
        <h1 className="font-Josefin_Sans text-4xl font-bold mb-5">
          Browse Workspaces
        </h1>

        <div className="p-6 border-2 border-purple-600 rounded-lg shadow-md mb-10">
          <h2 className="font-Josefin_Sans text-2xl font-semibold mb-4">
            Search and Filter
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter workspace name..."
              className="p-1 h-12 min-h-12 border rounded-md w-full md:w-1/2"
            />
            <select className="p-3 h-12 min-h-12 border rounded-md w-full md:w-1/4">
              <option hidden>Filter by Category</option>
              <option>Category 1</option>
              <option>Category 2</option>
              <option>Category 3</option>
            </select>
            <select className="p-3 border h-12 min-h-12 rounded-md w-full md:w-1/4">
              <option hidden>Privacy: Public/Private</option>
              <option>Public</option>
              <option>Private</option>
            </select>
            <button className="px-6 h-12 min-h-12 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 text-white rounded-md">
              Search
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Failed to load workspaces</div>
          ) : (
            workspaces.map((workspace) => (
              <div
                key={workspace.id}
                className="p-5 border-2 border-purple-600 rounded-xl shadow-md"
              >
                <div className="flex flex-col gap-5">
                  <h3 className="text-2xl font-Josefin_Sans font-semibold">
                    {workspace.name}
                  </h3>
                  <hr className="text-purple-600" />
                  <p className="font-Josefin_Sans">
                    <span className="font-bold">Description: </span>
                    {workspace.description}
                  </p>
                  <p className="font-Josefin_Sans">
                    <span className="font-bold">Category: </span>
                    {workspace.category.join(", ")}
                  </p>
                  <p className="font-Josefin_Sans">
                    <span className="font-bold">Privacy: </span>
                    {workspace.isPublic ? "Public" : "Private"}
                  </p>
                  <Link
                    href={`workspace/${workspace.id}`}
                    className="text-purple-600 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
