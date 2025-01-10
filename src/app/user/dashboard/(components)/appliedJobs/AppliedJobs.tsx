import React from 'react'
import CompanyCard from './companyCard/CompanyCard'

const AppliedJobs = () => {
  return (
            <div>
                <div className='flex flex-col gap-5'>
                        <div className='m-2'>
                            <h1 className='text-2xl font-semibold font-Josefin_Sans   bg-white dark:bg-black '>Applied Jobs</h1>
                        </div>

                        <div>
                            <CompanyCard/>
                        </div>  
                </div>
             </div>
  )
}

export default AppliedJobs