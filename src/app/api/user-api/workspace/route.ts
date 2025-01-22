import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  try {
    const workspaces = await prisma.workSpace.findMany({
      include: {
        owner: true,
        members: true,
        jobBoards: true,
      },
    });

    if (!workspaces || workspaces.length === 0) {
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
