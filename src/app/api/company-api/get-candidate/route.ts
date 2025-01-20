import prisma from "@/lib/db";
import {  NextResponse } from "next/server";

export async function GET(){
        
    try {
        const response = await prisma.user.findMany({
            where:{
                role:"USER"
            }
        })
        if(!response) return NextResponse.json({ msg: "Data not found" }, { status: 404 });
        return NextResponse.json({response},{status:200});
    } catch (error) {
        if(error instanceof Error)
        {
            console.log(error)
            return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
        }
    }

}