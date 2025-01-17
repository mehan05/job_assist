import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log("id:",id);
  try {
    const workspace = await prisma.workSpace.findUnique({
      where: { id },
      include:{
        members:true,
      }
    });
    console.log("request get came");
    if (!workspace) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }
    return NextResponse.json({ data: workspace }, { status: 200 });

  } catch (error) {
    if(error instanceof Error)
    {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  const dataToUpdate = {
    name: body.name,
    description: body.description,
    category: body.category,
    isPublic: body.visibility,
    members: body.inviteMembers,
  }
  console.log("updating body:", body);
  try {
    const updatedWorkspace = await prisma.workSpace.update({
      where: { id },
      data: dataToUpdate,
    });
    return NextResponse.json({ data: updatedWorkspace }, { status: 200 });
  } catch (error) {
    if(error instanceof Error)
    {
        console.log(error.message);
        return NextResponse.json({ error: "Failed to update workspace" }, { status: 500 });
    }
  }
}
