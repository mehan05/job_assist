"use client";
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
interface UserData {
  email: string;
  password: string;
}
const UserLogin = () => {
  const router = useRouter();
  const words = "Job_Assist";
  const[userData,setUserData] = useState<UserData>({
    email:"",
    password:""
  });
  const handleOnSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    let toastId;
      try {
         toastId = toast.loading("Logging in ...");
        const response = await axios.post("job-assist.vercel.app/api/auth/login",userData);
        console.log(response.data);
     
        if(response.status === 200)
        { 
          router.replace("/company/dashboard");
          toast.success("Login Success",{id:toastId});
        }
        else if(response.status === 401)
        {
          toast.error("Invalid Password",{id:toastId});
        }
        else if(response.status === 403)
        {
          toast.error("Invalid Data",{id:toastId});
        }
        else if(response.status === 404)
        {
          toast.error("Invalid User",{id:toastId});
        }
        else if(response.status===500)
        {
            toast.error("Something went wrong",{id:toastId});
        }
      } catch (error) {
          if(error instanceof AxiosError)
          {
            console.log(error.response?.data);
            toast.error("Something went wrong",{id:toastId})
          }
      }
  }
  const handleOnchange  = (e:React.ChangeEvent<HTMLInputElement>)=>{
      const{name,value} = e.target;
      setUserData((prev)=>({...prev,[name]:value}))
  }
  return (
    <div>
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

                <form onSubmit={handleOnSubmit} className='w-full'>
                  <div className='flex flex-col gap-5 mt-5'>
                    <input
                      type="email"
                      name='email'
                      placeholder='Email'
                      onChange={handleOnchange}
                      className='p-2 w-full border-2 rounded-lg focus:outline-none bg-background   border-foreground text-foreground'
                    />
                    <input
                      type="password"
                      name='password'
                      placeholder='Password'
                      onChange={handleOnchange}
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

export default UserLogin;
