import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
interface LoginBody{
    email:string,
    password:string
}
export async function POST(req:NextRequest){
    const body:LoginBody = await req.json();
    try {
        const userExist = await prisma.user.findUnique({
            where:{email:body.email}
        });
        if(userExist)
        {
            const passwordMatch = await bcrypt.compare(body.password,userExist.password);
            if(passwordMatch)
            {
                return NextResponse.json({message:"Login Success"},{status:200});
            }
    
                return NextResponse.json({message:"Invalid Password"},{status:402})
        }
        return NextResponse.json({message:"User Not Found"},{status:404})
    } catch (error) {
        return NextResponse.json({Error:"Error While Adding User",error},{status:500})   
    }
}