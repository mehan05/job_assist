import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/db";
interface TokenPayload {
    id: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  }
export async function POST(req:NextRequest) {
    const {jobId} = await req.json();
    const Secret = process.env.SECRET_KEY as string;
    const token  = (await cookies()).get("token")?.value;
    console.log(token);
    const decrypt = jwt.verify(token as string,Secret as string) as TokenPayload;
    if(!decrypt)
    {
        return NextResponse.json({msg:"unauthorized"},{status:401});
    }
    try {
        
        const user = await prisma.user.findUnique({where:{id:decrypt.id}});
        if(!user) return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
        if(!jobId)
        {
            return NextResponse.json({ msg: "jobId Not found" }, { status: 402 });
        }
        const job = await prisma.jobBoard.findUnique({ where: { id: jobId } });
        if (!job) {
          return NextResponse.json({ msg: "Job not found" }, { status: 404 });
        }
    
        const assignApplication = await prisma.jobApplication.create({
              data: {
            title: job.title,
            jobId: job.id,
            userId: user.id,
          },
        });
        
        if(assignApplication)
        {
            return NextResponse.json({msg:"application assigned"},{status:200});
        }
    } catch (error) {
        if(error instanceof Error)
        {
            console.log(error);
            return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
        }
    }
}