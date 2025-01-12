"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export const RootNavigatorComponent = () => {
  return (
    <div className="w-auto h-auto border-2 rounded-xl p-10 shadow-md hover:shadow-lg transition-shadow duration-300 bg-black ">
      <h1 className="font-Josefin_Sans font-semibold text-lg mb-5">Choose one:</h1>
      <div className="flex gap-5">
        <Link href="/user/auth/signup" className="w-full">
          <div className="w-full h-full p-10 border-2 rounded-xl border-black dark:border-white/[0.2] hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-md transition-transform transform hover:scale-105">
            <div className="flex flex-col items-center gap-5">
              <Image
                src="/job_seeker_icon.png"
                alt="Job Seeker Icon"
                height={50}
                width={50}
              />
              <h1 className="font-Josefin_Sans font-semibold text-lg text-gray-800 dark:text-white">
                Job Seeker
              </h1>
            </div>
          </div>
        </Link>

        <Link href="/company/auth/signup" className="w-full">
          <div className="w-full h-full p-10 border-2 rounded-xl border-black dark:border-white/[0.2] hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-md transition-transform transform hover:scale-105">
            <div className="flex flex-col items-center gap-5">
              <Image
                src="/HR_icon.png"
                alt="Searching Talent Icon"
                height={50}
                width={50}
              />
              <h1 className="font-Josefin_Sans font-semibold text-lg text-gray-800 dark:text-white">
                Searching Talent
              </h1>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
