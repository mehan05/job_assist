import React from 'react'
import Experience from './Experience/Experience'
import PayFilter from './pay/PayFilter'
import WorkType from './workType/WorkType'

const FiltersComponent = () => {
  return (
    <div className='m-2'>
        <div className='flex flex-col gap-10'>
            <Experience/>
            <PayFilter/>
            <WorkType/>
        </div>
    </div>
  )
}

export default FiltersComponent