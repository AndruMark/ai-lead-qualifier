import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Lead Qualifier",
  description: "Real-time AI conversational lead qualification widget",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="font-bold text-lg text-emerald-400 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              AI Lead Qualifier
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-slate-300">
              <Link href="/" className="hover:text-emerald-400 transition">Home</Link>
              <Link href="/widget" className="hover:text-emerald-400 transition">Widget</Link>
              <Link href="/leads" className="hover:text-emerald-400 transition">Leads</Link>
              <Link href="/settings" className="hover:text-emerald-400 transition">Settings</Link>
              <Link href="/health" className="hover:text-emerald-400 transition text-xs px-2 py-1 bg-slate-800 rounded border border-slate-700">Health</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-6xl w-full mx-auto p-6">
          {children}
        </main>
        <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
          Capstone Skeleton (FE-04) · FlyRank Frontend AI Engineering
        </footer>
      </body>
    </html>
  );
}
