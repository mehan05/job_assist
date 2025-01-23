import prisma from "@/lib/db";
import { STATUS } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:{id:string}})
{
        const {id} = (await params);
        
        try {
            const response =  await prisma.workspaceRequestData.update({
                where: {
                  id: id,
                },
                data: {
                  status: STATUS.ACCEPTED,
                },
              });
              return NextResponse.json({ msg: "Accepted" ,response}, { status: 200 });
            } catch (error) {
              if (error instanceof Error) {
                console.log(error.message);
                return NextResponse.json(
                  { msg: "Something went wrong" },
                  { status: 500 }
                );
              }
            }
}