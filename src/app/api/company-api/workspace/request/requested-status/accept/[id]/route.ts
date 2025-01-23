import prisma from "@/lib/db";
import { STATUS } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:{id:string}})
{
        const {id} = (await params);
        const {workspaceId} =await req.json();
        console.log("Requet came for status");
        console.log("id from params:",id);
        console.log("workspace ID:",workspaceId);
        let response;
        try {
          await prisma.$transaction(async (prisma)=>{
            
           response =  await prisma.workspaceRequestData.update({
                      where: {
                        id: id,
                      },
                      data: {
                        status: STATUS.ACCEPTED,
                      },
                    });

                  await  prisma.workSpace.update({
                      where:{
                        id:workspaceId
                      },
                      data:{
                        members:{
                          connect: {id:response.requestedById}
                        }
                      }
                    })
          })
            
              // await prisma.workspaceRequestData.delete({
              //   where: {
              //     id:id
              //   }
              // })
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