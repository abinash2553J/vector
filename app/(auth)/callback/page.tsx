"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { insforge } from "@/lib/insforge-client";
import posthog from "posthog-js";

function identifyUser(user: {
  id: string;
  email: string;
  profile: { name?: string } | null;
}) {
  posthog.identify(user.id, {
    email: user.email,
    name: user.profile?.name,
  });
  posthog.capture("oauth_sign_in_completed");
}

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function handleAuthCallback() {
      const code = searchParams.get("insforge_code");
      const errorParam =
        searchParams.get("error") ||
        searchParams.get("insforge_error") ||
        searchParams.get("error_description");

      if (errorParam) {
        if (isMounted) {
          setStatus("error");
          setErrorMessage(decodeURIComponent(errorParam));
        }
        return;
      }

      if (!code) {
        // Check if user already has an active session
        try {
          const { data, error } = await insforge.auth.getCurrentUser();
          if (data?.user) {
            identifyUser(data.user);
            if (isMounted) {
              setStatus("success");
              setTimeout(() => {
                router.replace("/dashboard");
              }, 400);
            }
            return;
          }
          if (isMounted) {
            setStatus("error");
            setErrorMessage("No authorization code found in URL.");
          }
        } catch (err) {
          if (isMounted) {
            setStatus("error");
            setErrorMessage("No authorization code found in URL.");
          }
        }
        return;
      }

      try {
        const { data, error } = await insforge.auth.exchangeOAuthCode(code);

        if (error) {
          if (isMounted) {
            setStatus("error");
            setErrorMessage(error.message || "Failed to exchange authorization code.");
          }
          return;
        }

        if (data?.user) {
          identifyUser(data.user);
        }

        if (isMounted) {
          setStatus("success");
          // Short delay to allow cookies to settle before navigating
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 300);
        }
      } catch (err) {
        if (isMounted) {
          setStatus("error");
          setErrorMessage("An unexpected error occurred during authentication.");
        }
      }
    }

    handleAuthCallback();

    return () => {
      isMounted = false;
    };
  }, [searchParams, router]);

  return (
    <div className="bg-surface border border-border rounded-2xl p-8 sm:p-10 shadow-xs max-w-md w-full text-center">
      {status === "processing" && (
        <div className="py-6 flex flex-col items-center">
          <Loader2 className="w-10 h-10 animate-spin text-accent mb-4" />
          <h2 className="text-xl font-bold text-text-primary tracking-tight">
            Authenticating...
          </h2>
          <p className="text-sm text-text-secondary mt-2">
            Please wait while we verify your credentials and set up your session.
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="py-6 flex flex-col items-center">
          <CheckCircle2 className="w-10 h-10 text-success mb-4" />
          <h2 className="text-xl font-bold text-text-primary tracking-tight">
            Welcome to JobPilot!
          </h2>
          <p className="text-sm text-text-secondary mt-2">
            Authentication successful. Redirecting to your dashboard...
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="py-6 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-error" />
          </div>
          <h2 className="text-xl font-bold text-text-primary tracking-tight">
            Sign In Failed
          </h2>
          <p className="text-sm text-text-secondary mt-2 mb-6 max-w-xs">
            {errorMessage || "Unable to complete authentication. Please try again."}
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center bg-accent hover:bg-accent-dark text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-colors shadow-xs"
          >
            Return to Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default function CallbackPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center py-12 px-6 sm:px-8 relative overflow-hidden">
      {/* Glow background */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-3xl pointer-events-none opacity-35"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124, 92, 252, 0.25) 0%, rgba(97, 168, 255, 0.15) 50%, transparent 75%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        <div className="mb-8">
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
            <div className="bg-surface border border-border rounded-2xl p-8 shadow-xs max-w-md w-full text-center">
              <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto my-6" />
              <p className="text-sm text-text-secondary">Loading authentication details...</p>
            </div>
          }
        >
          <CallbackHandler />
        </Suspense>
      </div>
    </div>
  );
}
