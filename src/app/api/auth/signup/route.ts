import { CompanySchema } from "@/schemas/CompanySchema";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { sign } from "@/lib/jwtsign";

export async function POST(req:NextRequest)
{
    const body = await req.json();
    const result = CompanySchema.safeParse(body);
    const Secret = process.env.SECRET_KEY!
    const hashPassword = await bcrypt.hashSync(body.password,10)
    body.password = hashPassword
    try {
        if(result.success)
        {
          const createdUser =  await prisma.user.create({
                data:{
                    ...body
                }
            })
            
            const token =await sign({email:body.email,id:createdUser.id, role:body.role},Secret)

            const response = NextResponse.json({message:"user created",token},{status:200});
            response.cookies.set("token",token,{
                httpOnly:true,
                path:"/",
                sameSite:"strict",
                maxAge:60*60*24
            });
            
            return  response;
        }
        return NextResponse.json({error:"invalid data",errormsg:result.error},{status:401})
    } catch (error:unknown) {
        if(error instanceof Error)
        {
                console.log(error)
                return NextResponse.json(
                { error: "Error while adding user", details: error.message },
                { status: 500 }
                );
        }
    }
}