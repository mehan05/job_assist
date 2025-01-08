import React from "react";
import UserAvatar from "./UserAvatar";

const UserBox = () => {
  return (
    <div>
      <div className="dark:bg-black  border-black border m-3  rounded-xl dark:border-white/[0.2]   dark:group-hover:border-slate-700  p-5 hover:scale-105 transition-all hover:duration-300 hover:ease-in-out dark:hover:border-[#9574e2] dark:hover:border-2 ">
        <div className="flex gap-3  ">
          <div className="flex gap-3 w-full">
            <div>
              <UserAvatar/>
            </div>
            <div className="flex justify-between w-full items-center">
              <div className="">
                <h1 className="font-Josefin_Sans font-bold">User Name</h1>
                <p className=" ml-2 font-Josefin_Sans text-gray-400">message from the user</p>
              </div>

                <div className="w-3 h-3 rounded-full bg-[#9574e2]">
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
