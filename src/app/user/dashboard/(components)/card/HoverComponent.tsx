"use client"
import { HoverEffect } from '@/components/ui/card-hover-effect'
import React, { useEffect, useState } from 'react'
interface HoverComponentProps{
  description:string,
  count:number

}
const HoverComponent = ({detailsOfUser}:{detailsOfUser:HoverComponentProps[]}) => {
  console.log("user job details from hovercard:",detailsOfUser);
  console.log("user job details from hovercard:",typeof detailsOfUser);
  console.log("typeof from hovercard:",[detailsOfUser]);
  const[mounted,isMounted] = useState(false);
  useEffect(()=>{
    isMounted(true);
  },[mounted])
  return (
    <div >
         <HoverEffect items={detailsOfUser}/>

    </div>
  )
}

export default HoverComponent