import Image from 'next/image'
import React from 'react'

const UserLogin = () => {
  return (
    <div>
         <div className='flex justify-center items-center h-screen  '>
              <div className='border-2 border-red-500 rounded-3xl w-[1000px] h-[550px] p-10'>
                    <div className='flex justify-around items-center gap-5'>
                        <div className='flex flex-col gap-5'>
                          <div className='flex flex-col gap-2 items-center justify-start'>
                              <h1 className='text-7xl font-bold font-Josefin_Sans'>Welcome</h1>
                              <p className='font-Josefin_Sans font-semibold '>Login To find Your Job</p>

                              <form action="" className='w-full '>
                                <div className='flex flex-col gap-5 mt-5'>
                                      <input type="email" placeholder='Email' className='p-2 w-full border-2 rounded-lg focus:outline-none ' />
                                      <input type="password" placeholder='password'className='p-2 w-full border-2 rounded-lg focus:outline-none ' />
                                    <button type='submit' className='bg-black hover:scale-105 text-white font-bold py-2 px-4 rounded-xl'>Login</button>
                                </div>
                              </form>
                              <p className='font-Josefin_Sans font-semibold mt-6'>Login with Other Platform</p>


                                <button type='submit' className='bg-opacity-50 hover:scale-105 text-black font-bold py-2 px-4 rounded-xl border-2 border-black w-full'>

                                <div className='flex justify-center gap-5  mt-5  items-center '>
                                        <Image src="/google_logo.png" alt="Google" width={30} height={30} />

                                        <span className=' text-black font-Josefin_Sans font-semibold'>Login With Google</span>

                                </div>
                                </button>

                              </div>  

                        </div>
                        <div >
                          <Image src="/loginPageImage.png" alt="Google" width={400} height={400} />z
                        </div>
                    </div>
              </div>
          </div>   
    </div>
  )
}

export default UserLogin