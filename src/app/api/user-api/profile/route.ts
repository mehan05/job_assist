import { User } from './../../../user/workspace/[id]/page';
import prisma from "@/lib/db";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";
interface TokenPayLoad{
    payload:{
      email:string,
      id:string,
      role:string
    },
    exp:number;
    iat:number;
    nbf:number
  }
export async function GET(req:NextRequest)
{
    const token = req.headers.get("Authorization")?.split(" ")[1];
  console.log("requet hit from api");
  if(token===undefined) return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
        const Secret = process.env.SECRET_KEY as string; 
        const decrypt = jwt.verify(token,Secret as string) as unknown as TokenPayLoad;
    const id = decrypt.payload.id;

    try {
        const userDetails = await prisma.user.findUnique({
            where:{id:id},
        
        });
    
        if (!userDetails) {
          return NextResponse.json({ msg: "No userDetails found" }, { status: 404 });
        } 


      
       return  NextResponse.json({ userDetails }, { status: 200 });
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          return NextResponse.json(
            { msg: "Something went wrong" },
            { status: 500 }
          );
        }
      }
}