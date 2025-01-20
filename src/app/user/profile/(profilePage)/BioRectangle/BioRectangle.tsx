import { Badge } from '@/components/ui/badge'
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
const BioRectangle = ({userData}:{userData:User}) => {
  return (
    <div className=''>
        <div className='border group border-black dark:border-white/[0.2]  flex-col dark:group-hover:border-slate-700 rounded-3xl  p-5 flex gap-5 hover:scale-105 transition-all hover:duration-300 hover:ease-in-out dark:hover:border-[#9574e2]  '>

            <header className='font-Josefin_Sans text-2xl font-bold'>About Me :</header>

            <main className='font-Josefin_Sans text-xl font-semibold '>
                        {userData.bio}

            </main>

                <div className=''>
                    <h1 className= ' font-Josefin_Sans text-2xl font-bold'>Skills : </h1>


                    <div className='flex gap-5 '>
                           
                       <div className='ml-5'>
                            <Badge className='  text-xl p-2 w-24 items-center max-h-10  justify-center' variant={'outline'}>Skills</Badge>

                       </div>
                                

                       
                            
                    </div>
                </div>

        </div>
          
    </div>
  )
}

export default BioRectangle