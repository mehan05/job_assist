import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify, type JWTPayload} from 'jose';

interface TokenPayLoad{
  payload:{
    email:string,
    id:string,
    role:string
  },
  exp:number;
  iat:number;
  nbf:number
}
const Secret = process.env.SECRET_KEY!;
export async function middleware(request: NextRequest) {
  if(!Secret)
  {
    return NextResponse.json(
      { msg: "Server error: missing secret key" },
      { status: 500 }
    );
  }
  const path = request.nextUrl.pathname;
    if(path.includes("/auth"))
    {
      return NextResponse.next();
    }
    const token = request.cookies.get("token")?.value;
    if(!token)
    {
      return NextResponse.redirect(new URL("/",request.nextUrl));
    }

    try {
        if(request.nextUrl.pathname.includes("/user"))
        {
            const decodedToken = await verifyJWT(token, Secret) as unknown as TokenPayLoad ;
        
          if(decodedToken.payload.role!=="USER")
          {
            return NextResponse.redirect(new URL("/",request.nextUrl));
          }
        }
        else if(request.nextUrl.pathname.includes("/company"))
        {
          const decodedToken = await verifyJWT(token, Secret) as unknown as TokenPayLoad ;

          if(decodedToken.payload.role!=="COMPANY")
          {
            return NextResponse.redirect(new URL("/",request.nextUrl));
          }
        }
    } catch (error) {
      
      if(error instanceof Error)  
        {
          console.log(error);
          return NextResponse.redirect(new URL("/",request.nextUrl));
        }        
    }
   
  }

  export async function verifyJWT(token: string,Secret:string) {
    const {payload} = await jwtVerify(token, new TextEncoder().encode(Secret)) as {payload: JWTPayload};
    if(payload)
    {
      return payload;
    }
    throw new Error("Invalid token");

  }

 
export const config = {
  matcher:[
    // "/user/:path*",
    // "/company/:path*"
  ],
}