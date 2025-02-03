"use client"
import React from 'react'
import { HoverEffect } from './card-hover-effect';

interface DetailsOfCompany {
  totalWorkspacesCount: number;
  totalMembersCount: number;
  totalJobBoardsCount: number;
  totalJobApplicationCount: number;
};

const HoverComponent = ({detailsOfCompany}:{detailsOfCompany:DetailsOfCompany[]}) => {

  
  return (
    <div>
         <HoverEffect details={detailsOfCompany}/>

    </div>
  )
}

export default HoverComponent