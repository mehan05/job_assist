"use client";
import { NavBar } from '@/components/NavBar';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import Image from 'next/image';
import React from 'react';

const CompanyLogin = () => {
  const words = "Job_Assist";
  
  return (
    <div>
      <NavBar/>
      <div className='flex justify-center items-center '>
        <div className='fixed top-10'>
          <TextGenerateEffect words={words} className='text-4xl'/>
        </div>

      </div>
      <div className='flex justify-center items-center h-screen'>
        <div className='border-2 border-foreground rounded-3xl w-[1000px] h-[550px] p-10 bg-background text-foreground'>
          <div className='flex justify-around items-center gap-5 '>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-2 items-center justify-start'>
                <h1 className='text-7xl  font-bold font-Josefin_Sans  dark:text-[var(--primary)]'>Welcome</h1>
                <p className='font-Josefin_Sans font-semibold'>Login to Find Your Job</p>

                <form action="" className='w-full'>
                  <div className='flex flex-col gap-5 mt-5'>
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
                    <button
                      type='submit'
                      className='bg-black dark:bg-white dark:text-black hover:scale-105 text-white font-bold py-2 px-4 rounded-xl'
                    >
                      Login
                    </button>
                  </div>
                </form>

                <p className='font-Josefin_Sans font-semibold mt-6'>Login with Other Platform</p>

                <button
                  type="button"
                  className="bg-black  hover:scale-105 text-white font-bold py-1 px-4 rounded-xl border-2 items-center  dark:bg-white dark:text-black justify-center  border-secondary-foreground w-full"
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
      </div>
    </div>
  );
};

export default CompanyLogin;
