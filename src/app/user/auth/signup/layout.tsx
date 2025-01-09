import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    
    <div className='scale-75'>
          <div className='overscroll-none '>
          {children}
          </div>
    </div>
  )
}

export default layout