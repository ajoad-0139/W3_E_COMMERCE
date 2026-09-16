export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <span
          className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary"
          role="status"
          aria-label="Loading"
        />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}