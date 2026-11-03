"use client";

import React, { useState, useId } from "react";

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function Disclosure({
  title,
  children,
  defaultExpanded = false,
}: DisclosureProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const contentId = useId();

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
      <h3>
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={contentId}
          onClick={() => setIsExpanded((prev) => !prev)}
          className="w-full flex items-center justify-between p-4 text-left font-medium text-slate-200 hover:bg-slate-800/40 transition outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <span>{title}</span>
          <span
            aria-hidden="true"
            className={`transform transition-transform text-slate-400 ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>
      </h3>
      <div
        id={contentId}
        hidden={!isExpanded}
        className="p-4 pt-0 text-sm text-slate-400 border-t border-slate-800/40"
      >
        {children}
      </div>
    </div>
  );
}
