import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest,{params}:{params:{delId:string}})
{
    const delId = params.delId;
    try {
        const deleteResponse = await prisma.workSpace.delete({
            where:{id:delId}
        })
        if(deleteResponse)
        {
            return NextResponse.json({msg:"Workspace Deleted Successfully"},{status:200});
        }
    } catch (error) {
        if(error instanceof Error)
        return NextResponse.json({msg:"Something went wrong"},{status:500});
        
    }
}