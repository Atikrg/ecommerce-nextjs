import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
      termsAndConditions,
    } = await req.json();

    if (!first_name || !last_name || !email || !password || !confirmPassword) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (password != confirmPassword) {
      return NextResponse.json({
        error: "Please enter password fields correctly",
        password,
      });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Save user
    const user = await prisma.user.create({
      data: {
        firstName: first_name,
        lastName: last_name,
        email,
        password,
      },
    });

    return NextResponse.json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Register Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
