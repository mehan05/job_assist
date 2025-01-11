"use client"
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import {ThemeProvider} from 'next-themes'

const Provider = ({children}:{children:React.ReactNode}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme='system' enableSystem>

      <NextUIProvider>
  
          {children}
      </NextUIProvider>
    </ThemeProvider>
  )
}

export default Provider