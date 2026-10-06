"use client";

import { SignUp } from "@clerk/nextjs";
import { AuthPage } from "../../../components/auth-page";

export default function RegisterPage() {
  return <AuthPage mode="register"><SignUp routing="path" path="/register" signInUrl="/login" fallbackRedirectUrl="/onboarding" /></AuthPage>;
}
