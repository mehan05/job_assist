import React from 'react'
import JobCard from './JobCard'

const JobCardsComponent = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3  max-w-screen-xl min-screen-md  mx-auto  gap-5  lg:grid-cols-4'>
        <JobCard/>
        <JobCard/>
        <JobCard/>
        <JobCard/>
        <JobCard/>
      
    </div>
  )
}

export default JobCardsComponent