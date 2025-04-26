"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
interface WorkSpaceTableProps {
  id: string;
  name: string;
  members: number;
  jobPosted: number;
  joinRequests: number;
}

const WorkSpaceTables = () => {
  const router = useRouter();

  const [workSpaceData, setWorkSpaceData] = useState<WorkSpaceTableProps[]>([]);

  const handleDeleteWorkspace = async (id: string) => {
    const toastId = toast.loading("Deleting Workspace...");
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/company-api/workspace/delete/${id}`
      );

      if (response.status == 200) {
        toast.success("Workspace Deleted Successfully", { id: toastId });
        getAllWorkSpaces();
      } else if (response.status == 401) {
        toast.warning("Invalid User", { id: toastId });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Something went wrong", { id: toastId });
      }
    }
  };
  const getAllWorkSpaces = async () => {
    try {
      const workSpaceData = await axios.get(
        "http://localhost:3000/api/company-api/workspace"
      );
      if (workSpaceData.status === 200) {
        setWorkSpaceData(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          workSpaceData.data.data.map((val: any) => ({
            id: val.id,
            name: val.name,
            members: val._count.members,
            jobPosted: val._count.jobBoards,
          }))
        );
      } else if (workSpaceData.status === 401) {
        toast.warning("Invalid User");
        router.replace("/company/auth/login");
      } else if (workSpaceData.status === 404) {
        setWorkSpaceData([]);
      } else if (workSpaceData.status === 500) {
        toast.error("cant Load Workspaces");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

  useEffect(() => {
    getAllWorkSpaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="  dark:bg-black border border-black dark:border-white/[0.2] dark:group-hover:border-slate-700  rounded-xl p-5 w-full h-80 max-h-80 min-h-72 scrollable-element  overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Workspace Name </TableHead>
            <TableHead> Members </TableHead>
            <TableHead>Jobs Posted</TableHead>
            <TableHead>Join Requests </TableHead>
            <TableHead>Actions </TableHead>
            <TableHead>Create Job</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workSpaceData.map((val, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{val.name}</TableCell>
              <TableCell>{val.members}</TableCell>
              <TableCell>{val.jobPosted}</TableCell>
              <TableCell>{val.joinRequests || 0}</TableCell>

              <TableCell>
                <div className="flex gap-2  items-center">
                  <div>
                    <Link href={`/company/workspace/edit/${val.id}`}>
                      <button className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl dark:group-hover:border-slate-700  ">
                        Edit
                      </button>
                    </Link>
                  </div>
                  <div>/</div>
                  <div>
                    <button
                      className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl dark:group-hover:border-slate-700  "
                      onClick={() => handleDeleteWorkspace(val.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Link
                  href={{
                    pathname: "/company/post-job",
                    query: { workspaceId: val.id },
                  }}
                >
                  <div className="flex   items-center">
                    <div>
                      <button className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl   hover:scale-105 hover:transition-all hover:duration-300 hover:ease-in-out  hover:border-[#9574e2]dark:group-hover:border-slate-700  ">
                        Create Job
                      </button>
                    </div>
                  </div>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WorkSpaceTables;
