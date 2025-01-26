import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log("User ID from server:", id);

  try {
    const jobApplications = await prisma.jobApplication.findMany({
      where: {
        userId: id, 
      },
      include: {
        job: true, 
      },
    });

    console.log("Request arrived");
    if (jobApplications.length === 0) {
      return NextResponse.json({ msg: "No applications found" }, { status: 404 });
    }

    return NextResponse.json({ response: jobApplications }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return NextResponse.json({ msg: "Something went wrong" }, { status: 500 });
    }
  }
}
