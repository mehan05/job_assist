import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { UserLoginSchema } from "@/schemas/UserLoginSchema";
import { sign } from "@/lib/jwtsign";
interface TokenPayload{
    payload:{
        email:string,
        id:string,
        role:string
      },
      exp:number;
      iat:number;
      nbf:number
}
interface LoginBody{
    email:string,
    password:string
}
const Secret = process.env.SECRET_KEY as string
export async function POST(req:NextRequest){
    const body:LoginBody = await req.json();
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
                        const token =  await  sign({ email: userExist.email, id: userExist.id, role: userExist.role }, Secret);

                        const userData = jwt.verify(token,Secret) as unknown as TokenPayload
                        const response =  NextResponse.json({message:"Login Success",token,userData},{status:200})
                         response.cookies.set("token",token,{
                            httpOnly:true,
                            path:"/",
                            sameSite:"strict",
                            maxAge:60*60*24
                            
                         });
                        return response
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

// export async function GET(req:NextRequest){
//     const url = new URL(req.url);
//     const urlArr = url.pathname.split("/");
//     const userData = urlArr[urlArr.length-1];
//     console.log(userData);
//     const result = UserLoginSchema.safeParse(userData);
//     try {
//         if(result.success)
//         {
//                 const userExist = await prisma.user.findUnique({
//                     where:{email:userData.email}
//                 });
//                 if(userExist)
//                 {
//                     const passwordMatch = await bcrypt.compare(userData.password,userExist.password);
//                     if(passwordMatch)
//                     {       
//                         const token =  await  sign({ email: userExist.email, id: userExist.id, role: userExist.role }, Secret);

//                         const userData = jwt.verify(token,Secret) as unknown as TokenPayload
//                         const response =  NextResponse.json({message:"Login Success",token,userData},{status:200})
                        
//                         return response
//                     }
//                     return NextResponse.json({message:"Invalid Password"},{status:401})
                    
//                 }
//                 return NextResponse.json({message:"User Not Found"},{status:404})

//     }
//     return NextResponse.json({error:"invalid data",errormsg:result.error},{status:403})
//     } 
    
//     catch (error) {
//         if(error instanceof Error)
//         {
//                 console.log(error);
//                 return NextResponse.json({Error:"Error While Adding User",error},{status:500})   
//         }
//     }
// }