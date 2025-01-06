import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'
import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    
    <div className='h-screen '>
        <BackgroundBeamsWithCollision >
          <div className='h-screen '>
          {children}
          </div>
        </BackgroundBeamsWithCollision>
    </div>
  )
}

export default layout