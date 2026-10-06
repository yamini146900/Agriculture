"use client";

import { SignIn } from "@clerk/nextjs";
import { AuthPage } from "../../../components/auth-page";

export default function LoginPage() {
  return <AuthPage mode="login"><SignIn routing="path" path="/login" signUpUrl="/register" fallbackRedirectUrl="/onboarding" /></AuthPage>;
}
