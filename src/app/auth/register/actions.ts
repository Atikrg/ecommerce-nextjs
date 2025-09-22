"use server";

import { prisma } from "@/lib/prisma";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const termsAndConditions = formData.get("termsAndConditions");

  const agreedTerms = termsAndConditions === "on"; // ✅ convert checkbox to boolean

  if (!agreedTerms) {
    throw new Error("You must accept the terms and conditions");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password, // ⚠️ hash this in production!
      agreed_terms_and_conditions: agreedTerms,
    },
  });

  return { success: true, message: "User created successfully" };
}
