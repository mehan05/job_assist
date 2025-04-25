"use client";

import { useState, useEffect } from "react";
import { NavBar } from "@/components/NavBar";
import CandidateSearchCard from "./(components)/CandidateSearchCard";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  age: number;
  headlines: string;
  bio: string;
  gender: string;
  place: string;
  role: string;
  skills: string[];
  dob: string;
  email: string;
  profileImage?: string;
  professionalRole?: string;
  password: string;
}

const CandidateSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState<User[]>([]);
  const [candidates, setCandidates] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidateData = async () => {
      const toastId = toast.loading("Fetching candidates...");
      try {
        const response = await axios.get(
          "https://job-assist.vercel.app/api/company-api/get-candidate"
        );
        if (response.status === 200) {
          setCandidates(response.data.response);
          toast.success("Candidates fetched successfully", { id: toastId });
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error("An error occurred while fetching candidates", {
            id: toastId,
          });
          console.log(error);
          setError(
            error.response?.data ||
              "An error occurred while fetching candidates"
          );
        }
      }
    };

    fetchCandidateData();
  }, []);

  useEffect(() => {
    if (candidates) {
      const filteredCandidates = candidates.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          candidate.place.toLowerCase().includes(searchQuery.toLowerCase()) ||
          candidate.skills
            .join(", ")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
      setFilteredCandidates(filteredCandidates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div>
      <NavBar />
      <div>
        <div className="flex justify-center m-10 gap-6 items-center">
          <label htmlFor="search" className="font-Josefin_Sans text-2xl ">
            Search By Name, Location, Skills:{" "}
          </label>
          <input
            type="text"
            id="search"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-[#9b58ff]  p-2 rounded-lg w-80 focus:outline-none "
            placeholder="Search your talent "
          />
        </div>

        {error ? (
          <div>
            <p className="font-Josefin_Sans text-xl">{error}</p>
          </div>
        ) : filteredCandidates.length > 0 ? (
          filteredCandidates.map((val: User, index: number) => (
            <div
              className="flex flex-col gap-10 justify-center items-center"
              key={index}
            >
              <Link href={`/user/profile/${val.id}`}>
                <CandidateSearchCard val={val} />
              </Link>
            </div>
          ))
        ) : (
          candidates.length > 0 &&
          candidates.map((val: User, index: number) => (
            <div
              className="flex flex-col gap-10 justify-center items-center"
              key={index}
            >
              <Link href={`/user/profile/${val.id}`}>
                <CandidateSearchCard val={val} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CandidateSearchPage;
