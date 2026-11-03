import Link from "next/link";

export default function HomePage() {
  return (
    <div className="py-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          AI Conversational <span className="text-emerald-400">Lead Qualifier</span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg">
          Automated inbound lead capture, qualification, and routing through adaptive AI streaming.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
        <Link href="/widget" className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-emerald-500/50 transition block space-y-2">
          <h3 className="font-semibold text-lg text-white">Live Widget →</h3>
          <p className="text-xs text-slate-400">Interactive conversational agent interface for testing qualification flows.</p>
        </Link>
        <Link href="/leads" className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-emerald-500/50 transition block space-y-2">
          <h3 className="font-semibold text-lg text-white">Leads Inbox →</h3>
          <p className="text-xs text-slate-400">Captured leads pipeline with extracted intent parameters and readiness score.</p>
        </Link>
        <Link href="/settings" className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-emerald-500/50 transition block space-y-2">
          <h3 className="font-semibold text-lg text-white">Settings Panel →</h3>
          <p className="text-xs text-slate-400">Widget appearance, system tone, and qualification thresholds management.</p>
        </Link>
        <Link href="/health" className="p-6 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-emerald-500/50 transition block space-y-2">
          <h3 className="font-semibold text-lg text-white">Health Status →</h3>
          <p className="text-xs text-slate-400">Deployment and API verification endpoint showing runtime diagnostics.</p>
        </Link>
      </div>
    </div>
  );
}
