"use client"
import React from 'react'

const error = ({ error }: { error: Error }) => {
  console.log(error);
  return (
    <div className='flex justify-center items-center'>
        <div>
            <h1>Error in Fetching Data</h1>
        </div>
    </div>
  )
}

export default error