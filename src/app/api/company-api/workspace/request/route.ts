import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const workspaceRequests = await prisma.workspaceRequestData.findMany({
      include: {
        workSpace: true,
      },
    });

    if (!workspaceRequests || workspaceRequests.length === 0) {
      return NextResponse.json({ msg: "No requests found" }, { status: 404 });
    }

    return NextResponse.json({ msg: "Workspace requests fetched successfully", data: workspaceRequests }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return NextResponse.json({ msg: "Error fetching workspace requests", error: error.message }, { status: 500 });
    }
  }
}
