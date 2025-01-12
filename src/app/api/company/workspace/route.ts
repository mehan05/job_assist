import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from '@/lib/db';
import { WorkSpaceSchema } from '@/schemas/WorkSpaceSchema';
interface tokenDecryptInterface {
  email: string;
  id: number,
  role: string,
  iat:number,
  exp:number
}
export async function POST(req: NextRequest) {
  const body =await  req.json();
  const data = {
    name: body.name,
    description: body.description,
    
  }
  console.log(typeof body);
  const Secret:string = process.env.SECRET_KEY!;
  const token = (await cookies()).get("token")?.value;
  const result = WorkSpaceSchema.safeParse(body);
  const tokenDecrypt = jwt.verify(token as string,Secret) as tokenDecryptInterface;
  console.log("tokenDecrypt",tokenDecrypt)
  console.log("Body",body);
  if(!tokenDecrypt) return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
  console.log(result.success);
  if(!result.success) return NextResponse.json({ msg: "invalid data" }, { status: 402 });
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
