import React from 'react'
import UserAvatar from '../../userArea/userBox/UserAvatar'

const UserName = () => {
  return (
    <div>
          <div>
            <div className=" bg-[#9574e2]  border-black border m-3  rounded-xl dark:border-white/[0.2]   dark:group-hover:border-slate-700  p-5   ">
              <div className="flex gap-3  ">
                <div className="flex gap-3 w-full">
                  <div>
                    <UserAvatar />
                  </div>
                  <div className="flex justify-between w-full items-center">
                    <div className="">
                      <h1 className="font-Josefin_Sans font-bold text-white text-3xl">
                        User Name
                      </h1>
                    </div>                    
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}

export default UserName