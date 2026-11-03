import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Widget settings | Lead qualifier",
  description: "Configure your AI-powered lead qualification widget.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
