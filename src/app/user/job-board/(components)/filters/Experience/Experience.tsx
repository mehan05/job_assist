import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'

const Experience = () => {
  return (
    <div>
        <div className=' dark:bg-black border border-black dark:border-white/[0.2] dark:group-hover:border-slate-700 p-6 rounded-xl'>
            <header className='text-2xl font-Josefin_Sans font-bold'>Experience</header>
            <main className='m-5 flex-col flex gap-10 '>
                    <div className='flex gap-2  '>

                            <Checkbox id='experience'  />
                                <label
                                    htmlFor="experience"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    0 - 1 EOP
                                </label>
                    </div>
                    <div className='flex gap-2 '>

                            <Checkbox id='experience'  />
                                <label
                                    htmlFor="experience"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    1 - 2 EOP
                                </label>
                    </div>
                    <div className='flex gap-2'>

                            <Checkbox id='experience'  />
                                <label
                                    htmlFor="experience"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    3 - 6 EOP
                                </label>
                    </div>
                    <div className='flex   gap-2'>

                            <Checkbox id='experience'  />
                                <label
                                    htmlFor="experience"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                   6 + EOP
                                </label>
                    </div>


                
            </main>
        </div>
    </div>
  )
}

export default Experience