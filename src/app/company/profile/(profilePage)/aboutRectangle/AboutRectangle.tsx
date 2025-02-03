import React from 'react'
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
const AboutRectangle = ({userData}:{userData:User}) => {
  return (
    <div>
         <div className='border group border-black dark:border-white/[0.2] dark:group-hover:border-slate-700 rounded-3xl w-full h-full p-5 flex gap-5 hover:scale-105 transition-all hover:duration-300 hover:ease-in-out dark:hover:border-[#9574e2]  '>
                    <div>
                        <p className='text-2xl font-Josefin_Sans font-semibold'>From: {userData.place}</p>    
                    </div>

                    <div className="border-r-2  ml-5 border-black dark:border-white/[0.2] dark:group-hover:border-slate-700 group-dark:hover:border-[#9574e2] "></div>

                    <div className=''>
                        <p className='text-2xl font-Josefin_Sans font-semibold'>Contact: {userData.email}</p>
                    </div>

                    <div className="border-r-2  ml-5 border-black dark:border-white/[0.2] dark:group-hover:border-slate-700  group-dark:hover:border-[#9574e2] "></div>

                    <div className=''>
                        <p className='text-2xl font-Josefin_Sans font-semibold'>YOE: yet to add in schema {/*{userData.experience}*/}</p>
                    </div>
            </div>
    </div>
  )
}

export default AboutRectangle