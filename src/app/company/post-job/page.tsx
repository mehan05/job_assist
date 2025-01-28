import { NavBar } from '@/components/NavBar'
import React, { Suspense } from 'react'
import CreateJobPage from './(components)/CreateJobPage'

const page = () => {
  return (
    <div>
        <div>
            <NavBar/>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
        <div>
            <CreateJobPage/>
        </div>
        </Suspense>

    </div>
  )
}

export default page