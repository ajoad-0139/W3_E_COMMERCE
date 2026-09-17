import type { ReactNode } from "react";
import Link from "next/link";
import { Handbag } from "lucide-react";

export const AUTH_ACCENT = "#1C6E52";
export const AUTH_ACCENT_HOVER = "#17573F";
export const AUTH_INK = "#14181F";

interface AuthLayoutProps {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}

export default function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen fixed top-0 right-0 left-0 bottom-0 z-[110] items-center justify-center bg-white px-4 py-12">
      <Link href={"/"} className="flex fixed top-[20px] left-[20px] z-[120] items-center justify-center gap-2">
                <div className="p-[2px] bg-indigo-900 rounded-full">
                    <div className="rounded-full h-[28px] w-[28px] flex items-center justify-center ">
                        <Handbag size={18} className="text-white"/>
                    </div>
                </div>
                <p className="text-blue-950 font-bold font-sans">W3 E-COMMERCE</p>
            </Link>
      <div className="w-full max-w-sm">
        <div className="border-l-2 pl-6" style={{ borderColor: AUTH_ACCENT }}>
          <h1 className="text-xl font-semibold tracking-tight" style={{ color: AUTH_INK }}>
            {title}
          </h1>
          {subtitle && <p className="mt-1.5 text-sm text-gray-500">{subtitle}</p>}
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}