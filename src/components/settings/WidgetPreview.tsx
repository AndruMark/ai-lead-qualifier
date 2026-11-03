import { Bot, Mail, MessageCircle, Phone, Send, Sparkles } from "lucide-react";
import type { WidgetSettings } from "@/types/settings";

interface WidgetPreviewProps {
  settings: WidgetSettings;
}

export function WidgetPreview({ settings }: WidgetPreviewProps) {
  const collectFields = [
    settings.collectEmail && { icon: Mail, label: "Email address" },
    settings.collectPhone && { icon: Phone, label: "Phone number" },
  ].filter(Boolean) as { icon: typeof Mail; label: string }[];

  return (
    <aside className="rounded-3xl bg-slate-50 p-5 sm:p-8" aria-label="Widget preview">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Live preview
          </p>
          <p className="mt-1 text-sm text-slate-500">See how visitors will interact</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </div>

      <div className="mx-auto max-w-sm overflow-hidden rounded-2xl bg-white shadow-panel">
        <div className="flex items-center gap-3 px-5 py-4 text-white" style={{ backgroundColor: settings.accentColor }}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
            <Bot size={19} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold">{settings.businessName || "Your business"}</p>
            <p className="text-xs text-white/75">Typically replies instantly</p>
          </div>
          <span className="ml-auto h-2 w-2 rounded-full bg-emerald-300" />
        </div>

        <div className="space-y-4 p-5">
          <div className="flex gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: settings.accentColor }}>
              <Sparkles size={14} aria-hidden="true" />
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 px-3.5 py-3 text-sm leading-5 text-ink">
              {settings.welcomeMessage || "Your welcome message will appear here."}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="mb-3 text-xs font-medium text-slate-500">
              We&apos;ll help you {settings.primaryGoal.toLowerCase()}.
            </p>
            {collectFields.map(({ icon: Icon, label }) => (
              <div key={label} className="mb-2 flex items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-400">
                <Icon size={15} aria-hidden="true" />
                {label}
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-400">
              <MessageCircle size={15} aria-hidden="true" />
              Type your message...
              <Send className="ml-auto" size={14} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
