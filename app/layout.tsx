import { Navbar } from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { isAuthenticated } from "@/features/auth/services/isAuthenticated";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Equita-Planner",
  description: "Equita-Planner",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await isAuthenticated();
  console.log(auth);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar auth={auth} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
