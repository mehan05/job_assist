import prisma from "@/lib/db";
import { JobOpeningSchema } from "@/schemas/JobOpeningSchema";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Result } from "postcss";
interface tokenDecryptInterface {
  email: string;
  id: number;
  role: string;
  iat: number;
  exp: number;
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body)
    return NextResponse.json({ msg: "Enter Some Data" }, { status: 403 });
  const Secret = process.env.SECRET_KEY;
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    return NextResponse.json({ msg: "No token provided" }, { status: 406 });
}
  const tokenDecrypt = jwt.verify(
    token as string,
    Secret as string
  ) as tokenDecryptInterface;
  console.log("tokenDecrypt", tokenDecrypt);
  console.log("body:", body);
  const res = JobOpeningSchema.safeParse(body);
  if (!Secret) {
    console.error("SECRET_KEY is missing.");
    return NextResponse.json(
      { msg: "Server error: missing secret key" },
      { status: 500 }
    );
  }

  if (!token) {
    return NextResponse.json({ msg: "No token provided" }, { status: 406 });
  }
  console.log(res.error);
  try {
    if (!tokenDecrypt)
      return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
    if (!res.success)
      return NextResponse.json({ msg: "invalid data" }, { status: 402 });
    const deadline = new Date(body.deadline);
    delete body.deadline;
    if (res.success) {
      const jobBoard = await prisma.jobBoard.create({
        data: {
          ...body,
          postBy: tokenDecrypt.email,
          postById: tokenDecrypt.id,
          deadline:deadline,
        },
      });
      if (jobBoard) {
        console.log(jobBoard);
        return NextResponse.json({ message: "job created" }, { status: 200 });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { msg: "error in adding job", error },
        { status: 500 }
      );
    }
  }
}
