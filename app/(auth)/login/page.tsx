"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { insforge } from "@/lib/insforge-client";

function LoginForm() {
  const searchParams = useSearchParams();
  const rawError = searchParams.get("error");
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    rawError ? decodeURIComponent(rawError) : null
  );

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      setLoadingProvider(provider);
      setErrorMessage(null);

      const callbackUrl = `${window.location.origin}/callback`;
      const { data, error } = await insforge.auth.signInWithOAuth(provider, {
        redirectTo: callbackUrl,
        skipBrowserRedirect: false,
      });

      if (error) {
        setErrorMessage(error.message || "Failed to start sign in. Please try again.");
        setLoadingProvider(null);
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      setLoadingProvider(null);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-8 sm:p-9 shadow-xs">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary tracking-tight">
          Welcome to JobPilot
        </h1>
        <p className="text-sm text-text-secondary mt-1.5 leading-relaxed">
          Sign in to find tailored job matches and generate automated company dossiers.
        </p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="mb-6 p-3.5 rounded-xl bg-error/10 border border-error/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
          <div className="text-xs text-error font-medium leading-relaxed">
            {errorMessage}
          </div>
        </div>
      )}

      {/* OAuth Buttons */}
      <div className="space-y-3.5">
        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={() => handleOAuthSignIn("google")}
          disabled={loadingProvider !== null}
          className="w-full h-11 px-4 bg-surface hover:bg-surface-secondary border border-border text-text-primary font-medium text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-3 shadow-xs hover:border-border-muted disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loadingProvider === "google" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-accent" />
              <span>Connecting to Google...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* GitHub OAuth Button */}
        <button
          type="button"
          onClick={() => handleOAuthSignIn("github")}
          disabled={loadingProvider !== null}
          className="w-full h-11 px-4 bg-text-darkest hover:bg-text-black text-white font-medium text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-3 shadow-xs disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {loadingProvider === "github" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Connecting to GitHub...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>Continue with GitHub</span>
            </>
          )}
        </button>
      </div>

      {/* Terms text */}
      <div className="mt-8 pt-6 border-t border-border-light text-center">
        <p className="text-xs text-text-secondary leading-relaxed">
          By continuing, you agree to JobPilot&apos;s{" "}
          <span className="text-text-primary hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-text-primary hover:underline cursor-pointer">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-6 sm:px-8 relative overflow-hidden">
      {/* Background atmospheric glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full blur-3xl pointer-events-none opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124, 92, 252, 0.25) 0%, rgba(97, 168, 255, 0.15) 50%, transparent 75%)",
        }}
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <Image
            src="/logo.png"
            alt="JobPilot Logo"
            width={135}
            height={36}
            className="h-9 w-auto"
            priority
          />
        </div>

        <Suspense
          fallback={
            <div className="bg-surface border border-border rounded-2xl p-8 sm:p-9 shadow-xs text-center">
              <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto my-6" />
              <p className="text-sm text-text-secondary">Loading sign in...</p>
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
