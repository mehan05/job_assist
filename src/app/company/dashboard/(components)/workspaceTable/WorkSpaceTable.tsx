"use client";
import {

  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios, {  AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
interface WorkSpaceTableProps {
  name:string,
  members:number,
  jobPosted:number
}
const WorkSpaceTables = () => {
  const router = useRouter();
  const[error,setError] = useState(false);
  const[loading,setLoading] = useState(true);
  const[workSpaceData,setWorkSpaceData] = useState<WorkSpaceTableProps[]>([]);
  const getAllWorkSpaces = async()=>{

    try {
      
      const workSpaceData = await axios.get("http://localhost:3000/api/company/workspace");
      if(workSpaceData.status === 200)
        {
          setLoading(false);
          console.log("workspaceData:",workSpaceData);
          setWorkSpaceData(workSpaceData.data); 
        }
      else if(workSpaceData.status === 401)
      {
        toast.warning("Invalid User");
        router.replace("/company/auth/login");
      }
      else if(workSpaceData.status === 404)
      {
          setWorkSpaceData([]);
      }
      else if(workSpaceData.status === 500)
      {
        setError(true);
      }
    } catch (error) {
        if(error instanceof AxiosError)
        {
            console.log(error.response?.data);  

        }
    }

  }

  useEffect(()=>{
    
      getAllWorkSpaces();
  },[])
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
          {workSpaceData.map((val,index)=>(
              
            <TableRow key={index}>
              <TableCell className="font-medium">{val.name}</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>

              <TableCell>
                  <div className="flex gap-2  items-center">
                    <div>
                      <button className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl dark:group-hover:border-slate-700  ">
                        Edit
                      </button>
                    </div>
                    <div>/</div>
                    <div>
                      <button className="p-2  dark:bg-black border border-black dark:border-white/[0.2]   rounded-xl dark:group-hover:border-slate-700  ">
                        Delete
                      </button>
                    </div>
                  </div>
              </TableCell>
              <TableCell>
                  <Link href={{
                      pathname:"/company/post-job",
                      query:{workspaceId:"08de30cb-defa-4d0c-8909-7cd684b0ec9c"}
                  }}>

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
