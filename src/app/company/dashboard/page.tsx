import { NavBar } from '@/components/NavBar'
import { TextAnimate } from '@/components/ui/text-animate'
import React from 'react'
import Companycard from './(components)/card/CompanyCard'
import TableLayoutComponent from './(components)/tables/Table'
import WorkSpaceTables from './(components)/workspaceTable/WorkSpaceTable'
import Link from 'next/link'


const CompanyDashboard = () => {

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
                  <Companycard/>
              </div>

                <div className='w-full  m-2 flex flex-col gap-6 items-center '>
                      <div className='w-full  flex-col gap-2'>
                        <h1 className='font-Josefin_Sans text-2xl '>Analytics Overview</h1>
                      <TableLayoutComponent/>
                      </div>
                      <div className='w-full border-gray-700  flex-col gap-2 border-2 rounded-xl p-3'>
                        <div className='flex justify-between items-center'>
                          <h1 className='font-Josefin_Sans text-2xl '>Workspaces Managed</h1>
                          <Link href="/company/create-workspace">
                               <button className='font-Josefin_Sans text-lg m-2 hover:scale-105 hover:transition-all hover:duration-300 hover:ease-in-out border-2 border-[#9574e2] rounded-xl p-2 text-[#9574e2]'>Create WorkSpace</button>
                          </Link>
                        </div>
                      <WorkSpaceTables/>
                      </div>
                      <div className='w-full  flex-col gap-2'>
                        <h1 className='font-Josefin_Sans text-2xl '>Job Postings</h1>
                      <TableLayoutComponent/>
                      </div>
                      <div className='w-full  flex-col gap-2'>
                        <h1 className='font-Josefin_Sans text-2xl '>Job Applications</h1>
                      <TableLayoutComponent/>
                      </div>
                      </div>
                    

            </div>
        </div>
  </div>
  )
}

export default CompanyDashboard