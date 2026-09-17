import Providers from "./providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav/nav";
import RootModal from "@/components/modal/parent_modal";
import PopUp from "@/components/modal/pop_up";
import ThemeProvider from "@/components/theme/theme-provider";
import Footer from "@/components/footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "W3_E-COMMERCE",
  description: "Buy product smart",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <ThemeProvider/>
          <PopUp/>
          <RootModal/>
          <Nav/>
          {children}
        </Providers>
        <Footer/>
      </body>
    </html>
  );
}
