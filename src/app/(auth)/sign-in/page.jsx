import Link from "next/link";

import { SocialSignIn } from "../_components/social-sign-in";
import { SignInForm } from "./_components/sign-in-form";

export const metadata = {
  title: "Sign in — Kapuria Portal",
};

export default function SignInPage() {
  return (
    <div>
      <div className="flex flex-col">
        <p className="text-eyebrow font-semibold uppercase text-text-accent mb-4 md:mb-8">
          Buyer Portal
        </p>
        <h1 className="font-playfair text-[24px]/[32px] font-medium italic mb-8 text-text-primary sm:text-[28px]/[36px] md:text-[32px]/[40px]">
          Sign in to your account
        </h1>
        <p className="text-[14px]/[22px] text-text-secondary mb-32 md:mb-16">
          Welcome back. Access your villa’s drawings, photos and documents.
        </p>
      </div>

      <SignInForm />

      <SocialSignIn />

      <p className=" flex justify-center items-center gap-5 text-[12px]/[18px] text-text-secondary mt-16">
        New to Kapuria?{" "}
        {/* /request-access is not built yet — see the note in sign-in-form. */}
        <Link
          href="/request-access"
          className="font-semibold text-text-accent underline-offset-4 hover:underline"
        >
          Request portal access
        </Link>
      </p>
    </div>
  );
}