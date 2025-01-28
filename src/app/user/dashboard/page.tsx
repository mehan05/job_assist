import { NavBar } from '@/components/NavBar'
import { TextAnimate } from '@/components/ui/text-animate'
import React from 'react'
import Card from './(components)/card/Card'
import AppliedJobs from './(components)/appliedJobs/AppliedJobs'
import JobAlerts from './(components)/JobAlerts/JobAlerts'

const UserDashboard = () => {
  return (
    <div>
      <div className='mb-10  mr-3 ml-10'>
          <NavBar/>
      </div>
          <div className='m-10 sm:m-5 lg:m-10 '>
              <div >
                  <TextAnimate animate="slideLeft" by="character" className='text-4xl font-Josefin_Sans'>
                      Dashboard
                  </TextAnimate>
                
                <div className='w-full'>
                    <Card/>
                </div>

                <div className='flex justify-between  items-center  w-full h-[400px] mt-2'>
                    <div className='w-1/2 h-full max-w-70  dark:bg-black border border-black dark:border-white/[0.2] dark:group-hover:border-slate-700  mx-6 p-4 rounded-3xl scrollable-element   overflow-y-auto'>
                             <JobAlerts/>
                    </div>

                    <div className='w-1/2 h-full max-w-70  dark:bg-black border border-black dark:border-white/[0.2] dark:group-hover:border-slate-700  mx-6 p-4 rounded-3xl scrollable-element  overflow-y-auto'>
                          <AppliedJobs/>
                    </div>
                </div>
              </div>
          </div>
    </div>
  )
}

export default UserDashboard