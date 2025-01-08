import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='overflow-hidden'>
        {children}
    </div>
  )
}

export default layout