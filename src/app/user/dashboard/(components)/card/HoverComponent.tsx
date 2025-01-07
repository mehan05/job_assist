"use client"
import { HoverEffect } from '@/components/ui/card-hover-effect'
import React from 'react'

const HoverComponent = () => {
  return (
    <div>
         <HoverEffect items={[{
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },{
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },{
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },{
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },]}/>

    </div>
  )
}

export default HoverComponent