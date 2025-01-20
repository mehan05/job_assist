import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{ params }: { params: { id: string } }) {
  const { id } =await params;
  console.log("id frmo serve:", id);

  try {
    const response = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    console.log("request arrived");
    if (!response)
      return NextResponse.json({ msg: "Data not found" }, { status: 404 });
    return NextResponse.json({ response }, { status: 200 });
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
