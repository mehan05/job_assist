import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    
    try {
        const response = await prisma.jobApplication.findMany({
            include:{
                user:true
            }
        });
        if(!response) return NextResponse.json({ msg: "Data not found" }, { status: 404 });
        return NextResponse.json({response},{status:200});
    } catch (error) {
        if(error instanceof Error)
        {
            console.log(error)
            return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
        }
    }
    return NextResponse.json({msg:"test"},{status:200});
}