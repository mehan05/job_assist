import React from 'react'
import JobAlertCard from './JobAlertCard/JobAlertCard'

const JobAlerts = () => {
    
  return (
    <div>
    <div className='flex flex-col gap-5'>
            <div className='m-2'>
                <h1 className='text-2xl font-semibold font-Josefin_Sans'>Job Alerts</h1>
            </div>

            <div>
                <JobAlertCard/>
            </div>  
    </div>
 </div>
  )
}

export default JobAlerts