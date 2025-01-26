import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
interface TokenPayload {
    id: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  }
export async function GET() {
    const Secret = process.env.SECRET_KEY as string;
        const token = (await cookies()).get("token")?.value;
        if(!token) return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
        const tokenDecrypt = jwt.verify(token as string,Secret as string) as TokenPayload;
        if(!tokenDecrypt) return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
    try {
        const response = await prisma.user.findMany({});
        if(!response) return NextResponse.json({ msg: "Data not found" }, { status: 404 });
        return NextResponse.json({response},{status:200});
    } catch (error) {
        if(error instanceof Error)
        {
            console.log(error)
            return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
        }
    }
    return NextResponse.json({msg:"test"},{status:200});
}