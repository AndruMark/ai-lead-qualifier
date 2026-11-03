import { ChatWidget } from "@/components/chat/ChatWidget";

export default function WidgetPage() {
  return (
    <div className="py-6 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-bold text-white">Live Qualification Agent</h1>
        <p className="text-sm text-slate-400">
          Interactive conversational widget evaluating prospect fit, budget, and deployment urgency in real time.
        </p>
      </div>

      <ChatWidget />
    </div>
  );
}
