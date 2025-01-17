import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{params}:{params:{id:string}})  
{
  const id= (await params).id;
  try {
    const reponse = await prisma.jobBoard.findUnique({
      where:{id }
    })
    if(!reponse) return NextResponse.json({ msg: "Job not found" }, { status: 404 });
    return NextResponse.json({msg:" job details", reponse},{status:200});
  } catch (error) {
      if(error instanceof Error) 
        {
          console.log(error)
          return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });

        }
  }
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await req.json();
  try {
    console.log("deadline from edit:",body.deadline);
     const findJob = await prisma.jobBoard.findUnique({
        where:{id}
     })
     if(!findJob) return NextResponse.json({ msg: "Job not found" }, { status: 404 });
      const response = await prisma.jobBoard.update({
        where:{id},
        data:{
            ...body
        }
      })
      if(response) return NextResponse.json({ msg: "Job Edited Successfully" }, { status: 200 });
      
      return NextResponse.json({ msg: "Can't update" }, { status: 403 });
  } catch (error) {
      if(error instanceof Error)
        {
          console.log(error)
          return NextResponse.json({ msg: "Something went wrong" }, { status: 500 })
        } 
  }

}
