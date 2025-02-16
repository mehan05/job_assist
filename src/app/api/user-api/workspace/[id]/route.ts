import prisma from "@/lib/db";
// import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";
// interface TokenPayload {
//   id: string;
//   email: string;
//   role: string;
//   iat: number;
//   exp: number;
// }
export async function GET(req:NextRequest,{params}:{params:{id:string}})
{
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibWVoYW51c2VyNkBnbWFpbC5jb20iLCJpZCI6IjU4YTE1MTVlLTc5NWUtNGFiOC1iMmE3LWY3YjE1NmNjMmM2ZSIsInJvbGUiOiJVU0VSIn0sImV4cCI6MTczODA5NTc0NiwiaWF0IjoxNzM4MDkyMTQ2LCJuYmYiOjE3MzgwOTIxNDZ9.oSDN72aVVfiqqWFuyt3qiXqz81atiJ18dA8pJbd1bf4";
  console.log("token from ws-idquery",token)
  if(token===undefined) return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
        // const Secret = process.env.SECRET_KEY as string; 
        // const decrypt = jwt.verify(token,Secret as string) as unknown as TokenPayload;
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

        // isMember = workspaces.members.some((member)=>{
        //   return member.id===decrypt.id;
        // })
        isMember =true
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