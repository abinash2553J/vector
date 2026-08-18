"use client";

import { useEffect } from "react";
import { initPostHog } from "@/lib/posthog-client";

type Props = {
  children: React.ReactNode;
};

export function PostHogProvider({ children }: Props) {
  useEffect(() => {
    initPostHog();
  }, []);

  return <>{children}</>;
}
