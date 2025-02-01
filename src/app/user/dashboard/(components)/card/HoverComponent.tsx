"use client"
import { HoverEffect } from '@/components/ui/card-hover-effect'
import React, { useEffect, useState } from 'react'
interface HoverComponentProps{
  description:string,
  count:number

}
const HoverComponent = ({detailsOfUser}:{detailsOfUser:HoverComponentProps[]}) => {

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