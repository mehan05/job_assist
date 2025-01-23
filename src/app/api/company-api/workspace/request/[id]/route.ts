import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { z } from "zod";
import prisma from "@/lib/db";

const WorkspaceRequestSchema = z.object({
  message: z.string().min(1, "Message is required").max(250),
  skills: z.array(z.string()).nonempty("At least one skill is required"),
});

const SECRET_KEY = process.env.SECRET_KEY!;

interface TokenPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export async function POST(req: NextRequest,{params}:{params:{id:string}}) {
  const workspaceId = (await params).id;
  try {
    const body = await req.json();
    const validationResult = WorkspaceRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json({ error: validationResult.error.flatten() }, { status: 400 });
    }

    const token =(await cookies()).get("token")?.value;
    if (!token) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

    const decodedToken = jwt.verify(token, SECRET_KEY) as TokenPayload;
    if (decodedToken.role !== "USER") {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 403 });
    }

    const { message, skills } = validationResult.data;
    const newRequest = await prisma.workspaceRequestData.create({
      data: {
        description: message,
        requestedById: decodedToken.id,
        requestedBy: decodedToken.email,
        workSpaceId: workspaceId,
        skills: skills,
      },
    });

    return NextResponse.json({ msg: "Request submitted successfully", request: newRequest }, { status: 201 });
  } catch (error) {
    console.error("Error submitting request:", error);
    return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
  }
}


export async function GET(req: NextRequest,{params}:{params:{id:string}}) {
  const workspaceId = (await params).id;

  if (!workspaceId) {
    return NextResponse.json({ msg: "Workspace ID is required" }, { status: 400 });
  }

  try {
    const workspaceRequests = await prisma.workspaceRequestData.findMany({
      where: {
        workSpaceId: workspaceId,
      },
      include: {
        workSpace: true,
        requestedByUser:true
      },
    });

    if (!workspaceRequests || workspaceRequests.length === 0) {
      return NextResponse.json({ msg: "No requests found for this workspace" }, { status: 404 });
    }

    return NextResponse.json({ msg: "Workspace requests fetched successfully", data: workspaceRequests }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json({ msg: "Error fetching workspace requests", error: error.message }, { status: 500 });
    }
  }
}
