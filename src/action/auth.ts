"use server";

import { signIn } from "next-auth/react";
import { revalidatePath } from "next/cache";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const rememberMe = formData.get("remember-me") !== null;

  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      rememberMe,
    });

    if (result?.ok) {
      console.log("Login successful");
      revalidatePath("/auth/login");
      return { success: true };
    } else {
      console.log("Login failed:", result?.error);
      return { success: false, error: result?.error };
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, error: "Unexpected error occurred" };
  }
}