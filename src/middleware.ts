import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from "jsonwebtoken";
export function middleware(request: NextRequest) {
  let token;
  const Secret = process.env.JWT_SECRET_KEY!;
  const path = request.nextUrl.pathname;
  console.log(path);
  console.log(request.nextUrl);
  if(path==="/auth/login" || path==="/auth/signup")
  {
     token = request.cookies.get("token")?.value;
    if(!token)
    {
      return NextResponse.redirect(new URL("/auth/login",request.nextUrl));
    }
    const userData = jwt.verify(token,Secret);
    console.log(userData);
    if(typeof userData!=="object" )  
      {
        NextResponse.json({msg:"No Data Found in Please Login"},{status:402});
        return NextResponse.redirect(new URL("/auth/login",request.nextUrl));
      }        
    if(userData.role=="user")
    {
      return NextResponse.redirect(new URL("/user/dashboard",request.nextUrl));
    }
    return NextResponse.redirect(new URL("/company/dashboard",request.nextUrl));
  }

}
 
export const config = {
  matcher:[
    "/",
    "/auth/:path*"
  ],
}