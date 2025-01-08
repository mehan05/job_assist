import { NavBar } from "@/components/NavBar";
import React from "react";
import FiltersComponent from "./(components)/filters/FiltersComponent";
import JobCardsComponent from "./(components)/JobCards/JobCardsComponent";

const page = () => {
  return (
    <div className="scale-90 overflow-hidden">
      <div>
        <div>
          <NavBar />
        </div>
        <div className="">
          <h1 className="font-Josefin_Sans text-3xl font-bold m-2 ">Filters</h1>
          <div className="flex gap-5 ">
            <div className="flex flex-col gap-10 w-auto min-w-64 h-[650px] overflow-y-auto  scrollable-element ">
              <FiltersComponent />
            </div>
            <div className="border-r-2  ml-2 border-black dark:border-white/[0.2] dark:group-hover:border-slate-700  "></div>

            <div className="  w-full m-5">
                <JobCardsComponent/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
