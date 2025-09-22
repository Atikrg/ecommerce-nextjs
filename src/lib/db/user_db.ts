import { prisma } from "@/lib/prisma";

export async function updateRememberMe(userEmail: string, remember: boolean) {
  const updatedUser = await prisma.user.update({
    where: { email: userEmail },
    data: { rememberMe: remember },
  });

  return updatedUser;
}


