import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from '@/lib/db';
import { WorkSpaceSchema } from '@/schemas/WorkSpaceSchema';
interface tokenDecryptInterface {
  payload:{
    email:string,
    id:string,
    role:string
  },
  exp:number;
  iat:number;
  nbf:number
}
const Secret:string = process.env.SECRET_KEY!;
export async function POST(req: NextRequest) {
  const body =await  req.json();
  const data = {
    name: body.name,
    description: body.description,
    isPublic:body.visibility,
    category:body.category
  }
  const token = (await cookies()).get("token")?.value;
  const result = WorkSpaceSchema.safeParse(body);
  console.log("from bcakend",result);

  const tokenDecrypt = jwt.verify(token as string,Secret) as tokenDecryptInterface;
  if(tokenDecrypt.payload.role!=="COMPANY") return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
  if(!result.success) return NextResponse.json({ msg: "invalid data" }, { status: 402 });

   if(result.success)
   {
      try {
          const response =await prisma.workSpace.create({
            data:{
              ...data,
              createdBy:tokenDecrypt.payload.email,
              createdById:tokenDecrypt.payload.id,
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


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req:NextRequest)
{
  const token = (await cookies()).get("token")?.value;
  const verifToken = jwt.verify(token as string,Secret) as tokenDecryptInterface;
  if(verifToken.payload.role!=="COMPANY") return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
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
        createdById:tokenDecrypt.payload.id
      }
    })
    if(workspaceData)
    {
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