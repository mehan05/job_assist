import React from 'react'
import UserBox from './userBox/UserBox'

const UsersArea = () => {
  return (
    <div  className='w-full '>

            <header>
                <h1 className='text-4xl font-Josefin_Sans font-bold'>Chat</h1>
            </header>
            <div className='p-5 max-h-[580px] scrollable-element   overflow-y-auto'>
                <main  className='scrollable-element w-full '>
                        <div className='w-full '>
                            <UserBox/>
                            <UserBox/>
                            <UserBox/>
                            <UserBox/>
                            <UserBox/>
                            <UserBox/>
                            <UserBox/>
                            <UserBox/>
                            <UserBox/>
                            <UserBox/>
                            <UserBox/>
                              
                        </div>

                </main>
            </div>
    </div>
  )
}

export default UsersArea