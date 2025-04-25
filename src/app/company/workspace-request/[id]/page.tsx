"use client";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
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
  requestedByUser: {
    name: string;
    email: string;
  };
}

export default function WorkspaceRequestPage() {
  const params = useParams();
  const id = params.id;
  const [requests, setRequests] = useState<WorkspaceRequestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestAction, setRequestAction] = useState("");
  useEffect(() => {
    const fetchRequests = async () => {
      const toastId = toast.loading("Fetching workspace requests...");
      try {
        const response = await axios.get(
          `https://job-assist.vercel.app/api/company-api/workspace/request/${id}`
        );
        setRequests(response.data.data);
        setRequests((prev) => {
          const newRequest = response.data.data;
          const mergedData = [...prev, ...newRequest];

          return mergedData.filter(
            (item, index, self) =>
              index === self.findIndex((workspace) => workspace.id === item.id)
          );
        });
        toast.success("Workspace requests loaded successfully", {
          id: toastId,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch workspace requests. Please try again later.");
        toast.error("Failed to load workspace requests", { id: toastId });
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [id]);
  const handleRequestAction = async (requestID: string) => {
    const toastId = toast.loading("Updating Status...");
    if (requestAction == "APPROVED") {
      try {
        const response = await axios.post(
          "https://job-assist.vercel.app/api/company-api/workspace/request/requested-status/accept/" +
            requestID,
          { workspaceId: id }
        );
        if (response.status == 200) {
          toast.success("Status Updated", { id: toastId });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message, { id: toastId });
        }
      }
    } else {
      try {
        const response = await axios.post(
          "https://job-assist.vercel.app/api/company-api/workspace/request/requested-status/rejected/" +
            id
        );
        if (response.status == 200) {
          toast.success("Status Updated", { id: toastId });
        }
        if (response.status == 404) {
          toast.message("No Request to display.");
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data.message, { id: toastId });
        }
      }
    }
  };
  if (loading) {
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-large border-b-4 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div>
          <NavBar />
        </div>

        <div className="flex items-center justify-center min-h-screen">
          <p className="text-red-500">No Request to display </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <NavBar />

      <div className="mt-10 mx-10">
        <h1 className="font-Josefin_Sans text-4xl font-bold mb-5">
          Workspace Requests
        </h1>

        {requests.length > 0 ? (
          <div className="p-6 border-2 border-purple-600 rounded-lg shadow-md">
            <h2 className="font-Josefin_Sans text-2xl font-semibold mb-4">
              Request List
            </h2>
            <hr className="text-violet-600 mb-4" />
            <div className="overflow-x-auto">
              <table className="table-auto w-full text-left border-collapse">
                <thead className="border-b border-purple-300">
                  <tr>
                    <th className="px-4 py-2">Request ID</th>
                    <th className="px-4 py-2">Workspace Name</th>
                    <th className="px-4 py-2">Categories</th>
                    <th className="px-4 py-2">Created At</th>
                    <th className="px-4 py-2">Last Updated</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length > 0 &&
                    requests.map((request) => (
                      <tr
                        key={request.id}
                        className=" border-b border-purple-300"
                      >
                        <td className="px-4 py-2">{request.id}</td>
                        <td className="px-4 py-2">{request.workSpace.name}</td>
                        <td className="px-4 py-2">
                          {request.workSpace.category.join(", ")}
                        </td>
                        <td className="px-4 py-2">
                          {new Date(request.createdAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-2">
                          {new Date(request.updatedAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex space-x-2">
                            <button
                              className="px-3 py-1 bg-green-500 text-white rounded hover:scale-105 hover:shadow"
                              onClick={() => {
                                setRequestAction("APPROVED");
                                handleRequestAction(request.id);
                              }}
                            >
                              Accept
                            </button>
                            <button
                              className="px-3 py-1 bg-red-500 text-white rounded hover:scale-105 hover:shadow"
                              onClick={() => {
                                setRequestAction("REJECTED");
                                handleRequestAction(request.id);
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-center mt-10 text-lg">
            No workspace requests available.
          </p>
        )}

        {requests.length > 0 &&
          requests.map((request) => (
            <div
              key={request.id}
              className="mt-8 p-6 border-2 border-purple-600 rounded-lg shadow-md"
            >
              <h2 className="font-Josefin_Sans text-2xl font-semibold mb-4">
                Request Details
              </h2>
              <hr className="text-violet-600 mb-4" />
              <p>
                <span className="font-bold">Requested By:</span>{" "}
                {request.requestedByUser.name} ({request.requestedByUser.email})
              </p>
              <p className="mt-4">
                <span className="font-bold">Description:</span>{" "}
                {request.description}
              </p>
              <p className="mt-4">
                <span className="font-bold">Skills Required:</span>{" "}
                {request.skills.join(", ")}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
