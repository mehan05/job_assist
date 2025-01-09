import { NavBar } from "@/components/NavBar";
import React from "react";
import UsersArea from "./(components)/CompanyArea/CompanyArea";
import ChatingArea from "./(components)/ChattingArea/ChatingArea";

const page = () => {
  return (
    <div className="overflow-hidden">
      <div className="">
        <NavBar />
      </div>
      <div className="flex gap-2 m-5 ">
        <div className="flex flex-col gap-10 w-96 min-w-96 h-auto overflow-y-auto   ">
          <UsersArea />
        </div>
        <div className="border-r-2  ml-5 border-black dark:border-white/[0.2] dark:group-hover:border-slate-700  "></div>
        <div className="w-full">
          <ChatingArea />
        </div>
      </div>
    </div>
  );
};

export default page;
