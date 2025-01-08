import React from "react";
import UserName from "./UserName/UserName";

const ChatingArea = () => {
  return (
    <div className="w-full ">
      <div className="w-full">
        <header className="w-full">
              <UserName/>
        </header>

        <main className="">

        <div className="flex flex-col  h-[500px]">
          <div className="mt-auto">
                <div className="flex gap-5 items-center justify-center">

                  <input placeholder="Enter Message" type="text" className="h-full w-full border-none focus:border-none rounded-lg ml-3 p-3 ">
                      
                  </input>

                  <div >
                     <button className="bg-[#9574e2] px-5 py-3  rounded-xl hover:scale-105 transition-all ease-in duration-300">send</button>
                          
                  </div>
                </div>
      </div>
          </div>

        </main>
        </div>
      </div>
  );
};

export default ChatingArea;
