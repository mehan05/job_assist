import prisma from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

import { NextRequest, NextResponse } from "next/server";
interface TokenPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
export async function GET(req:NextRequest,{params}:{params:{id:string}})
{
  console.log("requets arrived for ws-id")
  const token =(await cookies()).get("token")?.value;
  if(token===undefined) return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
        const Secret = process.env.SECRET_KEY as string; 
        const decrypt = jwt.verify(token,Secret as string) as TokenPayload;
  // const token = (await cookies()).getAll();
    console.log("token from ws-idquery",token)
    const {id} = await params;
    let isMember = false;
    try {
        const workspaces = await prisma.workSpace.findUnique({
            where:{id:id},
          include: {
            owner: true,
            members: true,
            jobBoards: true,
          },
        });
    
        if (!workspaces) {
          return NextResponse.json({ msg: "No workspaces found" }, { status: 404 });
        } 

        isMember = workspaces.members.some((member)=>{
          return member.id===decrypt.id;
        })
        console.log(isMember)
        return NextResponse.json({ workspaces,isMember }, { status: 200 });
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
          return NextResponse.json(
            { msg: "Something went wrong" },
            { status: 500 }
          );
        }
      }
}