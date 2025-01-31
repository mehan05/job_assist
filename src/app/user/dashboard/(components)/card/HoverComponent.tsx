"use client"
import { HoverEffect } from '@/components/ui/card-hover-effect'
import React from 'react'
interface HoverComponentProps{
  description:string,
  count:number

}
const HoverComponent = ({detailsOfUser}:{detailsOfUser:HoverComponentProps}) => {
  console.log("user job details from hovercard:",detailsOfUser);
 
  return (
    <div >
         {/* <HoverEffect items={detailsOfUser}/> */}

    </div>
  )
}

export default HoverComponent