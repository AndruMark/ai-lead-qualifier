"use client";

import React, { useState, useEffect } from "react";
import { Lead, LeadStatus } from "@/types/lead";
import { getStoredLeads } from "@/lib/storage";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<"ALL" | LeadStatus>("ALL");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    setLeads(getStoredLeads());
  }, []);

  const filtered = filter === "ALL" ? leads : leads.filter((l) => l.status === filter);

  const exportCSV = () => {
    const headers = "ID,Name,Email,Company,Budget,Timeline,Score,Status,Created\n";
    const rows = leads
      .map(
        (l) =>
          `"${l.id}","${l.name}","${l.email}","${l.company}","${l.budget}","${l.timeline}",${l.score},"${l.status}","${l.createdAt}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `qualified-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Captured Leads Pipeline</h1>
          <p className="text-sm text-slate-400">
            Real-time qualified records categorized by intent score and timeline readiness.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={exportCSV}
            className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
          >
            Export to CSV
          </button>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20">
            {leads.length} Total Leads
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        {(["ALL", "HOT", "WARM", "COLD"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === status
                ? "bg-emerald-500 text-slate-950 shadow"
                : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((lead) => (
          <div
            key={lead.id}
            onClick={() => setSelectedLead(lead)}
            className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70 transition cursor-pointer space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-white text-base">{lead.name}</h3>
                <p className="text-xs text-slate-400">{lead.company}</p>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[11px] font-bold border ${
                  lead.status === "HOT"
                    ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    : lead.status === "WARM"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                }`}
              >
                {lead.status} ({lead.score}/100)
              </span>
            </div>

            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {lead.useCase}
            </p>

            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
              <span>Budget: {lead.budget}</span>
              <span>{lead.timeline}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedLead(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4 text-slate-200 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-lg font-bold text-white">{selectedLead.name}</h2>
                <p className="text-xs text-slate-400">{selectedLead.email} · {selectedLead.company}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 block">Readiness Score</span>
                  <span className="font-bold text-emerald-400">{selectedLead.score} / 100 ({selectedLead.status})</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Budget Allocation</span>
                  <span className="font-medium text-white">{selectedLead.budget}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Target Timeline</span>
                  <span className="font-medium text-white">{selectedLead.timeline}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Registered At</span>
                  <span className="font-mono text-xs text-slate-400">{new Date(selectedLead.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 block font-semibold mb-1">Executive Summary</span>
                <p className="text-xs text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-slate-800/60">
                  {selectedLead.summary}
                </p>
              </div>

              <div>
                <span className="text-xs text-slate-400 block font-semibold mb-1">Identified Business Use Case</span>
                <p className="text-xs text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-slate-800/60">
                  {selectedLead.useCase}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
