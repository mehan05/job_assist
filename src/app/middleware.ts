import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from "jsonwebtoken";
import {jwtVerify} from "jose"
export function middleware(request: NextRequest) {
  const Secret = process.env.SECRET_KEY!;
  const path = request.nextUrl.pathname;
  console.log(path);
  console.log(request.nextUrl);
    if(path.includes("/auth"))
  {
    return NextResponse.next();
  }
    const token = request.cookies.get("token")?.value;
    if(!token)
    {
      console.log("token not found");
      return NextResponse.redirect(new URL("/",request.nextUrl));
    }

    try {
      const {payload} = verifyJWT(token,Secret);
      if(payload)
      return NextResponse.next();
    } catch (error) {
      
      if(error instanceof Error)  
        {
          console.log(error);
          console.log("error on user details in token")
          return NextResponse.redirect(new URL("/",request.nextUrl));
        }        
    }
   
  }

  const verifyJWT = async(token:string,Secret:string)=>{
          const {payload} = await jwtVerify(token,Secret);
          if(payload)
          {
            return payload
          }
           throw new Error("invalid token")
  } 

 
export const config = {
  matcher:[
    "/user/:path*",
    "/company/:path*"
  ],
}