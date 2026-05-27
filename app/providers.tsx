"use client";

import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize Clarity only if we have a key
      if (process.env.NEXT_PUBLIC_CLARITY_ID) {
        import("@microsoft/clarity").then((Clarity) => {
          Clarity.default.init(process.env.NEXT_PUBLIC_CLARITY_ID!);
        });
      } else {
        console.log("Analytics (Clarity): Running in Development Mode. No key found.");
      }

      // Initialize PostHog only if we have a key
      if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
        import("posthog-js").then((posthog) => {
          posthog.default.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
            person_profiles: "identified_only",
            loaded: (ph) => {
              if (process.env.NODE_ENV === "development") ph.debug();
            },
          });
        });
      } else {
        console.log("Analytics (PostHog): Running in Development Mode. No key found.");
      }
    }
  }, []);

  return <>{children}</>;
}
