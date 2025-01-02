import prisma from "@/lib/db";
import { NextRequest } from "next/server"

export async function POST(req:NextRequest){
    const body = await req.json();
    try {
        const userExist = await prisma.user.find
    } catch (error) {
        
    }
}