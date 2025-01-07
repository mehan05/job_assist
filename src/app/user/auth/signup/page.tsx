"use client";
import { DatePickerDemo } from '@/components/DateSwitcher';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Badge } from '@/components/ui/badge';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
const UserSignup = () => {
  const words = "Job_Assist";
  const[skills,SetSkills] = useState<string[]>([])
  const[skill,setSkill] = useState<string>("");
  const [date, setDate] = React.useState<Date>()
  console.log(date);
  const handleAddSkill = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==='Enter') 
      {
        if(skill.trim())
          {
            e.preventDefault();
              SetSkills((prev)=>[...prev,skill])
              setSkill("");
          }
      }
      console.log(skills);
  }
  const handleFormSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
  }
  return (
    <div>
      <div className='flex justify-center items-center mb-5'>
        <div className=''>
          <TextGenerateEffect words={words} />
        </div>
      </div>
      <div className='flex justify-center items-center'>
      <BackgroundGradient className="rounded-3xl bg-white dark:bg-black ">
        <div className='border-2 border-foreground rounded-3xl w-full max-w-full h-auto p-10 bg-background text-foreground '>
          <div className='flex justify-around items-center gap-5 '>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-2 items-center justify-start overflow-hidden'>
                <h1 className='text-7xl font-bold font-Josefin_Sans'>Welcome</h1>
                <p className='font-Josefin_Sans font-semibold'>Register to Find Your Job</p>

                <form onSubmit={handleFormSubmit} className='w-full'>
                  <div className='flex flex-col gap-5 mt-5'>
                      <input
                        type="text"
                        placeholder='Name'
                        className='p-2 w-full border-2 rounded-lg focus:outline-none bg-background text-foreground border-foreground'
                      />
                    <input
                      type="email"
                      placeholder='Email'
                      className='p-2 w-full border-2 rounded-lg focus:outline-none bg-background   border-foreground text-foreground'
                    />
                    <input
                      type="password"
                      placeholder='Password'
                      className='p-2 w-full border-2 rounded-lg focus:outline-none bg-background text-foreground border-foreground'
                    />

                    <DatePickerDemo setDate={setDate} date={date??new Date()} />

                    <input
                      type="text"
                      placeholder='Place'
                      className='p-2 w-full border-2 rounded-lg focus:outline-none bg-background text-foreground border-foreground'
                    />
                    <input
                      type="text"
                      placeholder='Add Skills'
                      value={skill}
                      onChange={(e)=>setSkill(e.target.value)}
                      onKeyDown={handleAddSkill}
                      className='p-2 w-full border-2 rounded-lg focus:outline-none bg-background text-foreground border-foreground'
                    />
                    {skills.length>0 &&(

                      <div className='m-1 p-1 flex gap-2 flex-wrap break-words w-full max-w-[300px]'>
                          
                            {
                              skills.map((ele,index)=>(
                                <Badge key={index} variant={"outline"}>{ele}</Badge>
                              ))
                            }
                      </div>
                    )

                    }
                    <button
                      type='submit'
                      className='bg-primary hover:scale-105 hover:rounded-xl text-primary-foreground font-bold py-2 px-4 rounded-xl'
                    >
                      Login
                    </button>
                  </div>
                </form>

                <p className='font-Josefin_Sans font-semibold mt-6'>Login with Other Platform</p>

                <button
                  type="button"
                  className="bg-primary hover:scale-105 text-primary-foreground font-bold py-1 px-4 rounded-xl border-2 items-center justify-center  border-secondary-foreground w-full"
                >
                  <div className="flex justify-center gap-5 mt-5 items-center">
                    <Image src="/google_logo.png" alt="Google" width={25} height={10} />
                    <span className="font-Josefin_Sans font-semibold">Login With Google</span>
                  </div>
                </button>
              </div>
            </div>
            <div>
              <Image src="/loginPageImage.png" className ='rounded-3xl' alt="Login" width={500} height={600} />
            </div>
          </div>
        </div>
      </BackgroundGradient>
      </div>
    </div>
  );
};

export default UserSignup;
