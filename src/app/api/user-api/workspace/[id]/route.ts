import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{id:string}})
{
    const {id} = await params;
    try {
        const workspaces = await prisma.workSpace.findUnique({
            where:{id:id},
          include: {
            owner: true,
            members: true,
            jobBoards: true,
          },
        });
    
        if (!workspaces) {
          return NextResponse.json({ msg: "No workspaces found" }, { status: 404 });
        }
    
        return NextResponse.json({ workspaces }, { status: 200 });
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
          return NextResponse.json(
            { msg: "Something went wrong" },
            { status: 500 }
          );
        }
      }
}