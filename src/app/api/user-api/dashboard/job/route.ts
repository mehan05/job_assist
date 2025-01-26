import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const { searchParams } = new URL(req.url); 
    const id = searchParams.get("userId")?.toString();
    console.log("request arrived for jobalert",id)
    try {
        const response = await prisma.jobBoard.findMany({});
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