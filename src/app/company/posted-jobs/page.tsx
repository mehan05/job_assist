import { NavBar } from '@/components/NavBar'
import React from 'react'
import JobCardsComponent from './(components)/JobCards/JobCardsComponent'

const page = () => {
  return (
    <div>
        
        <div>
            <NavBar/>
        </div>

        <div className='scale-90'>
            <div>
                <h1 className='font-Josefin_Sans text-3xl font-bold m-2 mb-4  '>Posted Jobs :</h1>
            </div>
            <JobCardsComponent/>
        </div>
    </div>
  )
}

export default page