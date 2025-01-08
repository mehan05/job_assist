import { NavBar } from "@/components/NavBar";
import React from "react";
import ProfileAvatar from "./(profilePage)/ProfileAvatar";
import AboutRectangle from "./(profilePage)/aboutRectangle/AboutRectangle";
import BioRectangle from "./(profilePage)/BioRectangle/BioRectangle";

const page = () => {
  return (
    <div className="scale-90">
      <div>
        <NavBar />
      </div>

      <div className="flex flex-col gap-5 items-center justify-center mt-5">
        <div className="flex flex-col gap-5 items-center">
          <ProfileAvatar />
          <div className="flex flex-col items-center justify-between gap-5">
            <h1 className="text-2xl font-Josefin_Sans font-bold">Name</h1>
            <p className="font-Josefin_Sans font-semibold">
              HeadLines about the user
            </p>
          </div>

          <AboutRectangle />
          <div className=" w-[90%] h-28 max-w-[90%] ">
          <BioRectangle/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
