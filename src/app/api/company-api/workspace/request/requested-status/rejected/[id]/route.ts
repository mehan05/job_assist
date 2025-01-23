import prisma from "@/lib/db";
import { STATUS } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:{id:string}})
{
        const {id} = (await params);
        try {
             await prisma.workspaceRequestData.updateMany({
                where: {
                  id: id,
                },
                data: {
                  status: STATUS.REJECTED,
                },
              });
              await prisma.workspaceRequestData.delete({
                where: {
                  id:id
                }
              })
              return NextResponse.json({ msg: "Accepted" }, { status: 200 });
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