import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen fixed inset-0 z-[110] bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
}