"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavBar } from "@/components/NavBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import Link from "next/link";
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
  const [applicants, setapplicants] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchapplicants = async () => {
      const toastId = toast.loading("Loading Applications...");
      try {
        const response = await axios.get(
          "http://localhost:3000/api/company-api/job-applications/"
        );
        console.log(response.data);
        setapplicants(response.data.response);
        toast.success("Applications loaded successfully", { id: toastId });
      } catch (err) {
        setError("Error fetching applicants");
        console.error(err);
        toast.error("Error fetching applicants", { id: toastId });
      } finally {
        setLoading(false);
      }
    };

    fetchapplicants();
  }, []);
  console.log("request id", applicants);
  if (loading) {
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <h1 className="font-Josefin_Sans text-3xl font-bold m-4">Applicants</h1>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-large border-b-4 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <h1 className="font-Josefin_Sans text-3xl font-bold m-4">Applicants</h1>
      <div className="mt-10">
        {applicants.map((val, index) => (
          <Link href={`job-applicants/${val.id}`} key={index}>
            <div
              key={index}
              className="flex flex-col gap-10 justify-center items-center"
            >
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
                          <p className="font-Josefin_Sans font-bold text-2xl">
                            {val.user.name}
                          </p>
                          <p className="font-Josefin_Sans font-semibold">
                            {val.title}
                          </p>
                        </div>
                      </div>
                      <h1>Application Status: {val.status}</h1>
                      <div className="flex justify-center items-center">
                        <div className="flex justify-center items-center gap-5">
                          <p className="font-Josefin_Sans font-semibold">
                            {new Date(val.createdAt).toLocaleString()}
                          </p>
                        </div>
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

export default ApplicantPage;
