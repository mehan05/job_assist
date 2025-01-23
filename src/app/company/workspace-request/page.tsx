"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { NavBar } from "@/components/NavBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import Link from "next/link";
interface WorkspaceRequestData {
    id: string;
    description: string;
    requestedBy: string;
    requestedById: string;
    createdAt: string;
    updatedAt: string;
    skills: string[];
    workSpace: {
      id: string;
      name: string;
      description: string;
      createdBy: string;
      createdById: string;
      isPublic: boolean;
      jobPosted: number;
      joinRequests: number;
      category: string[];
      createdAt: string;
      updatedAt: string;
    };
  }
  

const WorkspaceRequestPage = () => {
  const [requests, setRequests] = useState<WorkspaceRequestData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
        const toastId = toast.loading("Loading workspaces...");
      try {
        const response = await axios.get("/api/company-api/workspace/request");
        console.log(response.data.data);
        setRequests(response.data.data);
        toast.success("Workspaces loaded successfully", { id: toastId });
      } catch (err) {
        setError("Error fetching requests");
        console.error(err);
        toast.error("Error fetching requests", { id: toastId });
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);
  console.log("request id",requests);
  if (loading) {
    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-large border-b-4 border-purple-500"></div>
    </div>
        </div>

    )
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="mt-10">
        {requests.map((val, index) => (
        <Link href={`workspace-request/${val.workSpace.id}`} key={index}>

            <div key={index} className="flex flex-col gap-10 justify-center items-center">
                <div className="hover:scale-105 transition-all duration-100 ease-in mb-6">
                <div className="border-2 border-[#9b58ff] w-[1000px] h-24 min-w-64 max-w-[1000px] lg:w-[1000px] lg:h-24 min-h-24 rounded-xl text-wrap">
                    <div className="p-5">
                    <div className="flex gap-3 items-center justify-between">
                        <div className="flex justify-start items-center gap-5">
                        <div>
                            <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>US</AvatarFallback>
                            </Avatar>
                        </div>
                        <div>
                            <p className="font-Josefin_Sans font-bold text-2xl">{val.requestedBy}</p>
                            <p className="font-Josefin_Sans font-semibold">{val.workSpace.name}</p>
                        </div>
                        </div>
                        <div className="flex justify-center items-center">
                        <div className="flex justify-center items-center gap-5">
                            <p className="font-Josefin_Sans font-semibold">{new Date(val.workSpace.createdAt).toLocaleString()}</p>
                        </div>    
                        </div>
                        <div className="flex justify-end items-center">
                        <h1 className="font-Josefin_Sans font-semibold">Skills: {val.skills.join(", ")}</h1>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceRequestPage;
