import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    
    <div className='scale-90'>
          <div className=' '>
          {children}
          </div>
    </div>
  )
}

export default layout