"use client"
import React, { useEffect, useRef, useState } from 'react'
import { RootNavigatorComponent } from './(components)/RootNavigator';

const RootNavigatorComponentParent = () => {
  const modal = useRef<HTMLDivElement>(null);
  const[show,setShow] = useState(false);
  const handleClickOutside  = (e:MouseEvent)=>{
    if(modal.current && !modal.current.contains(e.target as Node)){
      setShow(false);
    }
  }
  useEffect(()=>{
      if(show)
      {
        document.addEventListener("mousedown", handleClickOutside);
      }
      else{
        document.removeEventListener("mousedown", handleClickOutside);
      }


      return (()=>document.removeEventListener("mousedown", handleClickOutside))
  },[show])
  return (
    <div>
       <div className="  ">
              <button onClick={()=>setShow(!show)}   className="font-Josefin_Sans text-xl font-semibold mt-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-2 border-purple-500 rounded-3xl p-3 hover:scale-105 hover:transition-all hover:duration-300 hover:ease-in-out  ">
                Get Started
              </button >
            
        </div>

        {show && <div className="w-full  bg-black/50 fixed top-0 left-0 z-50 backdrop-blur-md flex justify-center items-center h-screen"
        >
          <div ref={modal}>

            <RootNavigatorComponent/>
          </div>
        </div>}
    </div>
  )
}

export default RootNavigatorComponentParent