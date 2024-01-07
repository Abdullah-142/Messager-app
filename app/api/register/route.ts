import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";

export async function POST(resquest: NextResponse) {
  try {
    const body = await resquest.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return new Response("Missing imfo", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return Response.json(user, { status: 201 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
