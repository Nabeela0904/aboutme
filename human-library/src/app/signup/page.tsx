import type { Metadata } from "next";
import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a Human Library account as a user or mentor.",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-muted-foreground">Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
