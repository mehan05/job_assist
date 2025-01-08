"use client"
import { HoverEffect } from '@/components/ui/card-hover-effect'
import React from 'react'

const HoverComponent = () => {

  const JobDetails = [{
    title: "0",
    description:
      "Total Workspaces",
  },{
    title: "0",
    description:
      "Total Members",
  },{
    title: "0",
    description:
      "Total Jobs",
  },{
    title: "0",
    description:
      "Total Applications",
  },]
  return (
    <div>
         <HoverEffect items={JobDetails}/>

    </div>
  )
}

export default HoverComponent