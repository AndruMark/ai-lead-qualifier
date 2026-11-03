export default function WidgetPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Interactive Widget Preview</h1>
        <p className="text-sm text-slate-400">Placeholder for the conversational qualification client component.</p>
      </div>
      <div className="border border-dashed border-slate-800 rounded-2xl h-96 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-slate-900/20">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-xl">💬</div>
        <h2 className="text-lg font-medium text-white">Chat Widget Component Placeholder</h2>
        <p className="text-xs text-slate-400 max-w-md">In FE-06 / FE-07 this view will mount the streaming conversational interface powered by the Vercel AI SDK.</p>
      </div>
    </div>
  );
}
