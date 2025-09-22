"use server";
import { ContactFormState } from "@/types";
import { revalidateTag } from "next/cache";

export async function submitContact(
  prevState: { success: boolean; error: string | null },
  formData: FormData
): Promise<{ success: boolean; error: string | null }> {
  try {
    // Extract form values
    const name = formData.get("name") as string;

    // Do your async call
    await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: "Something went wrong" };
  }
}