"use client"
import { HoverEffect } from '@/components/ui/card-hover-effect'
import React from 'react'

const HoverComponent = () => {

  const JobDetails = [{
    title: "Stripe",
    description:
      "Jobs Applied",
  },{
    title: "Stripe",
    description:
      "Jobs Rejected",
  },{
    title: "Stripe",
    description:
      "Job Application Under Review",
  },{
    title: "Stripe",
    description:
      "Jobs Selected",
  },]
  return (
    <div >
         <HoverEffect items={JobDetails}/>

    </div>
  )
}

export default HoverComponent