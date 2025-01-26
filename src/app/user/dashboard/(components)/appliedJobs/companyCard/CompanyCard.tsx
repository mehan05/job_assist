import Image from 'next/image'
import React from 'react'

interface JobBoard {
    id: string;
    title: string;
    description: string;
    location: string;
    postById: string;
    postBy: string;
    deadline: Date;
    skillsRequired: string[];
    contactEmail: string;
    workSpaceId: string;
    salaryFrom: number;
    salaryTo: number;
    employmentType: string;
    createdAt: Date;
    UpdatedAt: Date;
  }
const CompanyCard = ({appliedJob}:{appliedJob:JobBoard}) => {
  return (
    <div className=' justify-between flex gap-10 p-3 hover:scale-105 hover:transition-all hover:duration-300 hover:ease-in-out  dark:bg-black border border-black dark:border-white/[0.2]  dark:group-hover:border-slate-700 rounded-3xl'>

        <div className='flex gap-10 p-3  rounded-3xl'>
            <div>
                    <Image src="/amazon_logo.png" alt='Company_logo' height={40} width={40} />
            </div>

            <div className='flex flex-col  gap-1'>
                <p className='text-xl font-semibold font-Josefin_Sans'>{appliedJob.title}</p>
                <p className='text-sm text-gray-400  font-Josefin_Sans'>{appliedJob.location}</p>
            </div>

        </div>
            <div className='flex justify-end items-center '>
                <p>{appliedJob.employmentType}</p>
            </div>

       
    </div>
  )
}

export default CompanyCard