import { Badge } from '@/components/ui/badge'
import { Avatar } from '@nextui-org/avatar'
import Image from 'next/image'
import React from 'react'

const BioRectangle = () => {
  return (
    <div className=''>
        <div className='border group border-black dark:border-white/[0.2]  flex-col dark:group-hover:border-slate-700 rounded-3xl  p-5 flex gap-5 hover:scale-105 transition-all hover:duration-300 hover:ease-in-out dark:hover:border-[#9574e2]  '>

            <header className='font-Josefin_Sans text-2xl font-bold'>About Me :</header>

            <main className='font-Josefin_Sans text-xl font-semibold '>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis doloremque quae, magni nostrum ratione quisquam expedita numquam pariatur incidunt dolor voluptatibus eos natus, delectus impedit mollitia tempora harum unde iste?
                        Quae, sed eveniet enim ullam perferendis explicabo at temporibus provident! Libero blanditiis ducimus quae molestias adipisci ad mollitia perferendis nobis illo sunt? Voluptatum in quis dolores beatae unde doloremque aut.

            </main>

                <div className=''>
                    <h1 className='font-Josefin_Sans text-2xl font-bold'>Skills : </h1>
                    <div className='flex gap-5 '>
                           
                            <div className='flex gap-2 border-2 border-black dark:border-white/[0.2] dark:group-hover:border-slate-700 rounded-3xl p-4'>
                                <Avatar src="https://github.com/shadcn.png" alt="skill"
                               className='w-10 h-10' />
                            <Badge variant={'outline'}>Skills</Badge>

                            </div>
                            <div className='flex gap-2 border-2 border-black dark:border-white/[0.2] dark:group-hover:border-slate-700 rounded-3xl p-4'>
                                <Avatar src="https://github.com/shadcn.png" alt="skill"
                               className='w-10 h-10' />
                            <Badge variant={'outline'}>Skills</Badge>

                            </div>
                            <div className='flex gap-2 border-2 border-black dark:border-white/[0.2] dark:group-hover:border-slate-700 rounded-3xl p-4'>
                                <Avatar src="https://github.com/shadcn.png" alt="skill"
                               className='w-10 h-10' />
                            <Badge variant={'outline'}>Skills</Badge>

                            </div>
                    </div>
                </div>

        </div>
          
    </div>
  )
}

export default BioRectangle