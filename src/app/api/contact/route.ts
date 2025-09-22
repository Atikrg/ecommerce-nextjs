import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { fullName, emailAddress, subject, message, userId } =
      await req.json();

    console.table({ fullName, emailAddress, subject, message, userId });

    // Validation
    if (!fullName || !emailAddress || !subject || !message || !userId) {
      return NextResponse.json(
        { success: "fail", message: "Invalid Parameters" },
        { status: 400 }
      );
    }

    // Convert userId safely
    const integerUserId = Number(userId);
    if (isNaN(integerUserId)) {
      return NextResponse.json(
        { success: "fail", message: "Invalid User ID" },
        { status: 400 }
      );
    }

    // Save to DB
    const newMessage = await prisma.userContactMessages.create({
      data: {
        userId: integerUserId,
        fullName,
        emailAddress,
        subject,
        message,
      },
    });

    return NextResponse.json(
      { success: "success", data: newMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("User Contact Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
