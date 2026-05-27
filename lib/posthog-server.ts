import { PostHog } from "posthog-node";

export function getPostHogServer() {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  
  return new PostHog(apiKey || "phc_mock", {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
    flushAt: 1,        // send immediately
    flushInterval: 0,
    disabled: !apiKey,  // Disable completely if no API key is present
  });
}
