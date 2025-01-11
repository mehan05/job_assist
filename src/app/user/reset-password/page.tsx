import { NavBar } from '@/components/NavBar'
import React from 'react'
import PasswordResetPage from './(components)/PassowordResetPage'

const page = () => {
  return (
    <div>
        <div>
            <NavBar/>
        </div>

        <div className='m-10'>
            <PasswordResetPage/>
        </div>
    </div>
  )
}

export default page