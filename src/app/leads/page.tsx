export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Captured Leads Pipeline</h1>
          <p className="text-sm text-slate-400">Placeholder for CRM qualification records and lead details.</p>
        </div>
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20">0 Active Leads</span>
      </div>
      <div className="border border-dashed border-slate-800 rounded-2xl h-96 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-900/20">
        <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-xl">📋</div>
        <h2 className="text-lg font-medium text-white">Leads Pipeline Table Placeholder</h2>
        <p className="text-xs text-slate-400 max-w-md">Qualified contact entries, sentiment ratings, and CRM export actions will populate here.</p>
      </div>
    </div>
  );
}
