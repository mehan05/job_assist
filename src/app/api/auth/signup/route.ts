import prisma from "@/lib/db";
import { UserSchema } from "@/schemas/UserSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(req:NextRequest)
{
    console.log("Request arrived")
    const body = await req.json();
    const result = UserSchema.safeParse(body);
    const Secret = process.env.SECRET_KEY!
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
            const token = jwt.sign({email:body.email,id:body.id, role:body.role},Secret,{expiresIn:"1d"})

            const response = NextResponse.json({message:"user created",token},{status:200});
            response.cookies.set("token",token);
            return  response;
        }
        return NextResponse.json({error:"invalid data"},{status:400})
    } catch (error) {
            return NextResponse.json({Error:"Error While Adding User",error},{status:500})
    }
}