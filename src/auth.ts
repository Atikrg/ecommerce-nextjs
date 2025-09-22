import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validation";
import { updateRememberMe } from "@/lib/db/user_db";
import { UserLoginCredentials } from "@/types";

// Extend the default session user type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
      rememberMe: boolean;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember me", type: "checkbox" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          // Return null instead of throwing error
          return null;
        }

        // ✅ validate input with zod
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          // Throw a specific error that can be caught by the client
          throw new Error("Invalid input format");
        }

        const { email, password, rememberMe } = parsed.data;

        // ✅ find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.password !== password) {
          // Throw error instead of returning null
          throw new Error("Invalid email or password");
        }

        // ✅ update rememberMe in DB
        await updateRememberMe(email, rememberMe);

        // ✅ return fields you need in JWT
        return {
          id: user.id.toString(),
          email: user.email,
          username: user.firstName, // map DB `name` to `username`
          rememberMe,
        };
      },
    }),
  ],

  // ✅ Add pages configuration to handle errors
  pages: {
    signIn: "/auth/login",
    error: "/auth/login", // Redirect to login page on error
  },

  // ✅ store extra fields in JWT & session
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const typedUser = user as unknown as UserLoginCredentials;
        token.id = typedUser.id;
        token.email = typedUser.email;
        token.username = typedUser.username;
        token.rememberMe = typedUser.rememberMe;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.rememberMe = token.rememberMe as boolean;
      }
      return session;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "demo-secret",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
