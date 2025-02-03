import prisma from "@/lib/db";
import { cookies } from "next/headers";
import {  NextResponse } from "next/server";



export async function GET({params}:{params:{id:string}}) {
  const id = (await params).id;
    const token = (await cookies()).getAll();
    console.log("All tokns:",token);
  
  try {

    const response = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!response) {
      return NextResponse.json({ msg: "Data not found" }, { status: 404 });
    }

    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { msg: "Something went wrong", error: error },
      { status: 500 }
    );
  }
}
