import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from '@/lib/db';
import { WorkSpaceSchema } from '@/schemas/WorkSpaceSchema';
interface tokenDecryptInterface {
  email: string;
  id: string,
  role: string,
  iat:number,
  exp:number
}
const Secret:string = process.env.SECRET_KEY!;
export async function POST(req: NextRequest) {
  const body =await  req.json();
  const data = {
    name: body.name,
    description: body.description,
    
  }
  console.log(typeof body);
  const token = (await cookies()).get("token")?.value;
  const result = WorkSpaceSchema.safeParse(body);
  const tokenDecrypt = jwt.verify(token as string,Secret) as tokenDecryptInterface;
  console.log("tokenDecrypt",tokenDecrypt)
  console.log("Body",body);
  if(tokenDecrypt.role!=="COMPANY") return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
  console.log(result.success);
  if(!result.success) return NextResponse.json({ msg: "invalid data" }, { status: 402 });
  const testObj = { ...data,
    createdBy:tokenDecrypt.email,
    createdById:tokenDecrypt.id,
    isPublic:body.visibility
  }
  console.log("testObj",testObj);
   if(result.success)
   {
      try {
          const response =await prisma.workSpace.create({
            data:{
              ...data,
              createdBy:tokenDecrypt.email,
              createdById:tokenDecrypt.id,
              isPublic:body.visibility

            }
          })
          if(response) return NextResponse.json({ msg:    "workspace created" }, { status: 200 });
      } catch (error) {
        if(error instanceof Error)
          {
            console.log(error.message)
            return NextResponse.json({ msg: "something went wrong" }, { status: 500 });
          } 
      }
   }
}


export async function GET()
{
  const token = (await cookies()).get("token")?.value;
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1laGFubWVoYW42QGdtYWlsLmNvbSIsImlkIjoiNzQxNGJkNTgtZmE2OC00MTMzLWFlYjUtYTY1NGVjZTU1ODhiIiwicm9sZSI6IkNPTVBBTlkiLCJpYXQiOjE3Mzc2Mjg1ODcsImV4cCI6MTczNzcxNDk4N30.rHEFl3BqiY9BxQ4THFylOo17nq_ZZ6I9unyJXPpgHQo"
  const verifToken = jwt.verify(token as string,Secret) as tokenDecryptInterface;
  console.log("verifToken",verifToken);
  if(verifToken.role!=="COMPANY") return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
  if(!token) return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
  const tokenDecrypt = jwt.verify(token as string,Secret) as tokenDecryptInterface;
  if(!tokenDecrypt) return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
  try {
    const workspaceData = await prisma.workSpace.findMany({
      select:{
        name:true,
        id:true,
        members:true,
        joinRequests:true,
        _count:{
          select:{
            members:true,
            jobBoards:true,
          }
        }
      },
      where:{
        createdById:tokenDecrypt.id
      }
    })
    if(workspaceData)
    {
      console.log("getting data:",workspaceData);
      return NextResponse.json({data:workspaceData},{status:200});
    }
    return NextResponse.json({ msg: "Data not found" }, { status: 404 });
  } catch (error) {
      if(error instanceof Error)
      {
        console.log(error.message)
        return NextResponse.json({ msg: "something went wrong" }, { status: 500 });
      }
  }

}