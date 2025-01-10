import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserLoginSchema } from "@/schemas/UserLoginSchema";
interface LoginBody{
    email:string,
    password:string
}
const Secret = process.env.SECRET_KEY as string
export async function POST(req:NextRequest){
    const body:LoginBody = await req.json();
    console.log(body);
    const result = UserLoginSchema.safeParse(body);
    try {
        if(result.success)
        {
                const userExist = await prisma.user.findUnique({
                    where:{email:body.email}
                });
                if(userExist)
                {
                    const passwordMatch = await bcrypt.compare(body.password,userExist.password);
                    if(passwordMatch)
                    {
                        const token = jwt.sign({ email: userExist.email, id: userExist.id, role: userExist.role }, Secret, { expiresIn: "1d" });
            
                        const response =  NextResponse.json({message:"Login Success",token})
                         response.cookies.set("token",token);
                        return NextResponse.json({msg:response},{status:200})
                    }
                    return NextResponse.json({message:"Invalid Password"},{status:401})
                    
                }
                return NextResponse.json({message:"User Not Found"},{status:404})

    }
    return NextResponse.json({error:"invalid data",errormsg:result.error},{status:403})
    } 
    
    catch (error) {
        if(error instanceof Error)
        {
                console.log(error);
                return NextResponse.json({Error:"Error While Adding User",error},{status:500})   
        }
    }
}