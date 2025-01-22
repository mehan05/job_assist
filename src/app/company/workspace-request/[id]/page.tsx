"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavBar } from "@/components/NavBar";
import { toast } from "sonner";
import { useParams } from "next/navigation";

interface WorkspaceRequestData {
  id: string;
  description: string;
  requestedById: string;
  requestedBy: string;
  createdAt: string;
  updatedAt: string;
  workSpaceId: string;
  workSpace: {
    id: string;
    name: string;
    category: string[];
    createdAt: string;
    updatedAt: string;
    createdBy: string;
  };
  skills: string[];
}

export default function WorkspaceRequestPage() {
  const params = useParams();
  const id = params.id;
  const [requests, setRequests] = useState<WorkspaceRequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      const toastId = toast.loading("Fetching workspace requests...");
      try {
        const response = await axios.get(
          `/api/company-api/workspace/request/${id}`
        );
        setRequests(response.data.data);
        toast.success("Workspace requests loaded successfully", {
          id: toastId,
        });
      } catch (err) {
        console.error(err);
        setError("Error fetching workspace requests");
        toast.error("Failed to load workspace requests", { id: toastId });
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="overflow-hidden">
      <NavBar />

      <div className="mt-10 mx-5 sm:mx-10">
        <h1 className="font-Josefin_Sans text-3xl md:text-4xl lg:text-6xl font-bold">
          Workspace Requests
        </h1>

        {requests.map((request) => (
          <div key={request.id} className="mt-5 p-5 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Request ID: {request.id}</h2>
            <p>
              <strong>Requested By:</strong> {request.requestedBy} (
              {request.requestedById})
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(request.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Last Updated At:</strong>{" "}
              {new Date(request.updatedAt).toLocaleString()}
            </p>
            <p>
              <strong>Workspace Name:</strong> {request.workSpace.name}
            </p>
            <p>
              <strong>Workspace Categories:</strong>{" "}
              {request.workSpace.category.join(", ")}
            </p>
            <p>
              <strong>Description:</strong> {request.description}
            </p>
            <p>
              <strong>Skills Required:</strong> {request.skills.join(", ")}
            </p>
            <div className="flex justify-center mt-4">
              <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:scale-110 hover:shadow-lg transition-transform">
                Accept
              </button>
              <button className="ml-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:scale-110 hover:shadow-lg transition-transform">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
