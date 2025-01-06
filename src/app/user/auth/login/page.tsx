"use client";
import { BackgroundGradient } from '@/components/ui/background-gradient';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import Image from 'next/image';
import React from 'react';

const UserLogin = () => {
  const words = "Job_Assist";
  return (
    <div>
      <div className='flex justify-center items-center '>
        <div className='fixed top-10'>
          <TextGenerateEffect words={words} className='text-4xl'/>
        </div>

      </div>
      <div className='flex justify-center items-center h-screen'>
      <BackgroundGradient className="rounded-3xl bg-white dark:bg-black ">
        <div className='border-2 border-foreground rounded-3xl w-[1000px] h-[550px] p-10 bg-background text-foreground'>
          <div className='flex justify-around items-center gap-5 '>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-2 items-center justify-start'>
                <h1 className='text-7xl font-bold font-Josefin_Sans'>Welcome</h1>
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
                      className='bg-primary hover:scale-105 text-primary-foreground font-bold py-2 px-4 rounded-xl'
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

export default UserLogin;
