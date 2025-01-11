import { NavBar } from "@/components/NavBar";
import React from "react";
import CandidateSearchCard from "./(components)/CandidateSearchCard";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div>
        <div className="flex justify-center m-10 gap-6 items-center">
          <label htmlFor="search" className="font-Josefin_Sans text-2xl ">
            Search By Name, Location, Skills:{" "}
          </label>
          <input
            type="text"
            id="search"
            className="border-2 border-[#9b58ff]  p-2 rounded-lg w-80 focus:outline-none "
            placeholder="Search your talent "
          />
        </div>

        <div className="flex flex-col gap-5 justify-center items-center">
          <Link href="/">
            <CandidateSearchCard />
          </Link>
          <Link href="/">
            <CandidateSearchCard />
          </Link>
          <Link href="/">
            <CandidateSearchCard />
          </Link>
          <Link href="/">
            <CandidateSearchCard />
          </Link>
          <Link href="/">
            <CandidateSearchCard />
          </Link>
          <Link href="/">
            <CandidateSearchCard />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
