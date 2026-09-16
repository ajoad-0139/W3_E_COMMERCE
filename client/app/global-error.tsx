"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Send this to your error reporting service (Sentry, etc.)
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen w-full items-center justify-center bg-background px-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent">
              <span className="text-xl font-semibold text-accent-foreground">!</span>
            </div>

            <h1 className="mt-4 text-lg font-semibold text-foreground">Something went wrong</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              An unexpected error occurred and we couldn&apos;t load the page. You can try again, and
              if the problem persists, please come back a little later.
            </p>

            {error.digest && (
              <p className="mt-3 text-xs text-muted-foreground">Error reference: {error.digest}</p>
            )}

            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <RefreshCcw size={16} />
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}