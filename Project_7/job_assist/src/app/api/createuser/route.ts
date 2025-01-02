import prisma from "@/lib/db";
import { UserSchema } from "@/schemas/UserSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req:NextRequest)
{
    console.log("Request arrived")
    const body = await req.json();
    const result = UserSchema.safeParse(body);
    const hashPassword = await bcrypt.hash(body.password,10)
    body.password = hashPassword
    console.log(body)
    try {
        if(result.success)
        {
           await prisma.user.create({
                data:{
                    ...body
                }
            })
            return NextResponse.json({message:"user created"},{status:200});
        }
        return NextResponse.json({error:"invalid data"},{status:400})
    } catch (error) {
            return NextResponse.json({Error:"Error While Adding User",error},{status:500})
    }
}