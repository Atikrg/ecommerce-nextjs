import Link from "next/link";
import { sendResetLink } from "../../../auth";
import ResetLinkTimer from "@/components/resetLinkTimer";

type Props = {
  email?: string;
  isLinkSent?: boolean;
};

export default async function ForgotPassword({ email, isLinkSent }: Props) {
  async function handleSubmit(formData: FormData) {
    "use server";
    const email = formData.get("email")?.toString() || "";
    await sendResetLink(email);
    return { success: true, email };
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      <div className="max-w-md w-full space-y-8 z-10 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLinkSent ? "Check Your Email" : "Reset Your Password"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLinkSent
              ? `We've sent a password reset link to ${email}`
              : "Enter your email to receive a password reset link"}
          </p>
        </div>

        {!isLinkSent ? (
          <form action={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            {/* Show client-side timer */}
            <ResetLinkTimer email={email!} />
          </div>
        )}

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don&#39;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
