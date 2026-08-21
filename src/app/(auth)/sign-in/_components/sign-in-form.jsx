"use client";

import { useState } from "react";

import Link from "next/link";

import { ArrowRightIcon, EyeIcon, EyeOffIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, Input, Label } from "@/components/ui/input";

/**
 * Sign-in form. Static UI for now — no submission wiring yet; only the
 * password reveal is interactive.
 */
const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="flex flex-col gap-16"
    >
      <Field className={'gap-4 sm:gap-8'}>
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="autofill-surface"
        />
      </Field>

      <Field className={'gap-4 sm:gap-8'}>
        <Label htmlFor="password">Password</Label>
        {/* The reveal button sits inside the field, so the input is unstyled
            here and the wrapper carries the border. */}
        <div className="flex h-42 w-full items-center gap-8 rounded-[11px] border border-border-default bg-surface px-16 py-8 focus-within:border-gold-400">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            className="autofill-surface min-w-0 flex-1 bg-transparent text-body text-text-primary outline-none placeholder:text-text-muted"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="flex shrink-0 cursor-pointer items-center text-text-secondary transition-colors hover:text-text-primary"
          >
            {showPassword ? (
              <EyeOffIcon className="size-17" />
            ) : (
              <EyeIcon className="size-17" />
            )}
          </button>
        </div>
      </Field>

      <div className="flex items-center justify-between gap-16">
        <label
          htmlFor="remember"
          className="flex cursor-pointer items-center gap-9 text-body-xs text-text-secondary"
        >
          <Checkbox id="remember" name="remember" className={'rounded-[5px] size-18'} />
          Keep me signed in
        </label>

        {/* /forgot-password is not built yet — link kept so the route only
            needs the page added. */}
        <Link
          href="/forgot-password"
          className="text-link font-semibold text-text-accent underline-offset-4 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* No auth wiring yet — the button just lands on the portal home. */}
      <Button asChild size="lg" width="full" className="mt-8">
        <Link href="/">
          Sign in
          <ArrowRightIcon className="size-18 text-gold-300" />
        </Link>
      </Button>
    </form>
  );
};

export { SignInForm };