import React from "react";
import Image from "next/image";
import Link from "next/link";
const RootNavigatorComponent = () => {
  return (
    <div className="w-96 h-95 sm:w-32 sm:h-32 md:w-32 md:h-32 p-5 ">
      <div></div>
      <div>
        <Link href="/user/auth/signup">
          <div className="w-full h-full p-10 border-2 rounded-xl border-black dark:border-white/[0.2] dark:group-hover:border-slate-700">
            <div className="flex flex-col items-center gap-5">
              <Image
                src="/job_seeker_icon.png"
                alt="Job_Seeker_Icon"
                height={50}
                width={50}
              />
              <h1 className="font-Josefin_Sans font-semibold text-lg">
                Job Seeker
              </h1>
            </div>
          </div>
        </Link>

        <Link href="/company/auth/signup">
          <div className="w-full h-full p-10 border-2 rounded-xl border-black dark:border-white/[0.2] dark:group-hover:border-slate-700">
            <div className="flex flex-col items-center gap-5">
              <Image
                src="/HR_icon.png"
                alt="Job_Seeker_Icon"
                height={50}
                width={50}
              />
              <h1 className="font-Josefin_Sans font-semibold text-lg">
                Searching Talent
              </h1>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RootNavigatorComponent;
