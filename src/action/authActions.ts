// app/actions/authActions.ts
"use server";

import { cookies } from "next/headers";

export async function getSessionData() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken");
  
  if (!authToken) {
    return null;
  }
  
  // In a real app, you would validate the token and get user data from a database
  return {
    user: {
      id: "user-123",
      email: "user@example.com",
      name: "John Doe",
    },
  };
}

export async function logout() {
  cookies().delete("authToken");
  revalidatePath("/");
}