import { NavBar } from '@/components/NavBar'
import React from 'react'
import MyApplications from './(components)/MyApplication'

const page = () => {
  return (
    <div>
        <div>
            <NavBar/>
        </div>

        <div className='scale-90'>
            <MyApplications/>
        </div>
    </div>
  )
}

export default page