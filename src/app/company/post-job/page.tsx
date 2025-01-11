import { NavBar } from '@/components/NavBar'
import React from 'react'
import CreateJobPage from './(components)/CreateJobPage'

const page = () => {
  return (
    <div>
        <div>
            <NavBar/>
        </div>

        <div>
            <CreateJobPage/>
        </div>
    </div>
  )
}

export default page