import prisma from "@/lib/db";
import { JobOpeningSchema } from "@/schemas/JobOpeningSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
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
const Secret = process.env.SECRET_KEY;
export async function POST(req: NextRequest) {
  const url  = new URL(req.url);
  const workspaceId = url.searchParams.get("workspaceId");  
  const body = await req.json();
  if (!body)
    return NextResponse.json({ msg: "Enter Some Data" }, { status: 403 });
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ msg: "No token provided" }, { status: 406 });
}
  const tokenDecrypt = jwt.verify(
    token as string,
    Secret as string
  ) as tokenDecryptInterface;
  const res = JobOpeningSchema.safeParse(body);
  if (!Secret) {
    return NextResponse.json(
      { msg: "Server error: missing secret key" },
      { status: 500 }
    );
  }
  if(!workspaceId) return NextResponse.json({ msg: "Workspace id not found" }, { status: 407 });
  if (!token) {
    return NextResponse.json({ msg: "No token provided" }, { status: 406 });
  }
  console.log(res.error);
  try {
    if (tokenDecrypt.payload.role !== "COMPANY")
      return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
    if (!res.success)
      return NextResponse.json({ msg: "invalid data" }, { status: 402 });
    const deadline = body.deadline
    delete body.deadline;
    if (res.success) {
      const jobBoard = await prisma.jobBoard.create({
        data: {
          ...body,
          postBy: tokenDecrypt.payload.email,
          postById: tokenDecrypt.payload.id,
          deadline:new Date(deadline),
          workSpaceId:workspaceId
        },
      });
      if (jobBoard) {
        return NextResponse.json({ message: "job created" }, { status: 200 });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json(
        { msg: "error in adding job", error },
        { status: 500 }
      );
    }
  }
}


export async function GET()
{
 
  const token = (await cookies()).get("token")?.value;

  const tokenDecrypt = jwt.verify(token as string,Secret as string) as tokenDecryptInterface;
  if(!(tokenDecrypt.payload.role==="COMPANY")) return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
  try {
    const reponse = await prisma.jobBoard.findMany({
      select:{
        id:true,
        title:true,
        salaryFrom:true,
        salaryTo:true,
        deadline:true,
        workSpaceId:true,
        workSpace:true,
        applications:true
      }
    })
    if(!reponse)
    {
      return NextResponse.json({ msg: "Data not found" }, { status: 404 });
    }
    return NextResponse.json({msg:" job details", reponse},{status:200});
  } catch (error) {
    if(error instanceof Error)
    {
      console.log(error.message);
      return NextResponse.json({ msg: "error in getting job", error }, { status: 500 });
    }
  }
}