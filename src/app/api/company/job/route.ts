import prisma from "@/lib/db";
import { JobOpeningSchema } from "@/schemas/JobOpeningSchema";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest) {
    const body = await req.json();
    const res =  JobOpeningSchema.safeParse(body);
    try {
        if(res.success){
            const jobBoard = await prisma.jobBoard.create({
                data:{...body}
             })   
             
             if(jobBoard)
             {
                 return NextResponse.json({message:"job created"},{status:200})
             }
        }
        return NextResponse.json({error:"invalid data"},{status:400})
    } catch (error) {
        return NextResponse.json({msg:"error in adding job", error},{status:500})
    }
}

export async function DELETE(res:NextRequest)
{
    const body  = await res.json();
    
}