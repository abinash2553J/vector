import { PostHog } from "posthog-node";

export const createPostHogServer = () => {
  const key =
    process.env.NEXT_PUBLIC_POSTHOG_KEY ||
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
    "";
  const host =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  return new PostHog(key, {
    host,
    flushAt: 1, // send immediately
    flushInterval: 0, // no batching — Next.js functions are short-lived
  });
};
