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
interface JobTableInterface {
  id: string;
  name: string;
  members: number;
  title: string;
  salaryFrom: number;
  salaryTo: number;
  jobPosted: number;
  joinRequests: number;
  applications: number;
  workSpace: WorkSpace;
}
interface WorkSpace {
  id: string;
  name: string;
  description: string;
  createdById: string;
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
}
const PostJobTable = () => {
  const router = useRouter();
  const [JobData, setJobData] = useState<JobTableInterface[]>([]);
  useEffect(() => {
    console.log("workspcateData:", JobData);
  });
  const handleDeleteWorkspace = async (id: string) => {
    const toastId = toast.loading("Deleting Workspace...");
    try {
      const response = await axios.delete(
        `/api/company-api/workspace/delete/${id}`
      );

      if (response.status == 200) {
        toast.success("Workspace Deleted Successfully", { id: toastId });
        getJobData();
      } else if (response.status == 401) {
        toast.warning("Invalid User", { id: toastId });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Something went wrong", { id: toastId });
      }
    }
  };
  const getJobData = async () => {
    try {
      const JobData = await axios.get("/api/company-api/post-job");
      if (JobData.status === 200) {
        console.log("postJob Data:", JobData.data);
        console.log("postJob DataType:", typeof JobData.data);

        setJobData(JobData.data.reponse);

        console.log("Job state data");
      } else if (JobData.status === 401) {
        toast.warning("Invalid User");
        router.replace("/company/auth/login");
      } else if (JobData.status === 404) {
        setJobData([]);
      } else if (JobData.status === 500) {
        toast.error("Something went wrong");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
    console.log("workspace StateData:", JobData);
  };

  useEffect(() => {
    getJobData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="  dark:bg-black border border-black dark:border-white/[0.2] dark:group-hover:border-slate-700  rounded-xl p-5 w-full h-80 max-h-80 min-h-72 scrollable-element  overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> Workspace Name </TableHead>
            <TableHead> Job Title </TableHead>
            <TableHead> Applications </TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Actions </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {JobData.map((val, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {val.workSpace.name}
              </TableCell>
              <TableCell className="font-medium">{val.title}</TableCell>
              <TableCell className="font-medium">
                {Array.isArray(val.applications) ? val.applications.length : 0}
              </TableCell>
              <TableCell>
                {val.salaryFrom || 0}/{val.salaryTo || 0}
              </TableCell>

              <TableCell>
                <div className="flex gap-2  items-center">
                  <div>
                    <Link href={`/company/post-job/edit/${val.id}`}>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostJobTable;
