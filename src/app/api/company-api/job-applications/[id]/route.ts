import prisma from "@/lib/db";
import { APPLICATION_STATUS } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,{params}:{params:{id:string}}) {
    const {status} = await req.json();

    const id =params.id;
    try {
        const response = await prisma.jobApplication.update({
            where:{id},
            data:{
                status:status=="ACCEPTED"?APPLICATION_STATUS.ACCEPTED:APPLICATION_STATUS.REJECTED
            }
        })
        if(!response) return NextResponse.json({msg:"Application not found"},{status:404});
        return NextResponse.json({msg:"Application Updated Successfully"},{status:200});
    } catch (error) {
        if(error instanceof Error)
        return NextResponse.json({msg:"Something went wrong"},{status:500});        
    }
}