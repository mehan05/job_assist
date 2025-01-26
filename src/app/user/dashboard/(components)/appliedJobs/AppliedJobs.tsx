import React from 'react'
import CompanyCard from './companyCard/CompanyCard'
import Link from 'next/link'
import axios from 'axios';

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
const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/user-api/dashboard/jobs/`);
      if (response.status === 200) {
        console.log("Response:", response.data);
        return response.data.response;
      }
      return [];
    } catch (error) {
      console.error("Error fetching job applications:", error);
      return [];
    }
  };
const AppliedJobs = async() => {
    const AppliedJobs = await fetchAppliedJobs();

  return (
            <div>
                <div className='flex flex-col gap-5'>
                    <div className='flex justify-between '>

                        <div className='m-2'>
                            <h1 className='text-2xl font-semibold font-Josefin_Sans   bg-white dark:bg-black '>Applied Jobs</h1>
                        </div>

                        <div className='m-2'>
                            <div className='hover:scale-105 hover:text-lg'>
                                <Link href="/user/job-applications" className='text-sm font-semibold font-Josefin_Sans hover:text-violet-600 ' >View All Applications</Link>
                            </div>
                        </div>
                    </div>

                    {AppliedJobs.map((appliedJob: JobBoard, index: number) => (
                        <div key={index}>
                          
                        <CompanyCard appliedJob={appliedJob} />
                        </div>
                    ))}

                        
                </div>
             </div>
  )
}

export default AppliedJobs