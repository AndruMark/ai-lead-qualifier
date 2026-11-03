"use client";

import React, { useState, useRef, KeyboardEvent } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTabId?: string;
  ariaLabel: string;
}

export function Tabs({ tabs, defaultTabId, ariaLabel }: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(
    defaultTabId || (tabs[0] ? tabs[0].id : "")
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let targetIndex: number | null = null;

    if (event.key === "ArrowRight") {
      targetIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      targetIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      targetIndex = 0;
    } else if (event.key === "End") {
      targetIndex = tabs.length - 1;
    }

    if (targetIndex !== null) {
      event.preventDefault();
      const nextTab = tabs[targetIndex];
      if (nextTab) {
        setActiveTab(nextTab.id);
        tabRefs.current[targetIndex]?.focus();
      }
    }
  };

  const currentTab = tabs.find((t) => t.id === activeTab);

  return (
    <div className="w-full space-y-4">
      <div
        role="tablist"
        aria-label={ariaLabel}
        aria-orientation="horizontal"
        className="flex space-x-1 rounded-xl border border-slate-800 bg-slate-900/60 p-1.5"
      >
        {tabs.map((tab, idx) => {
          const isSelected = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                isSelected
                  ? "bg-emerald-500 text-slate-950 shadow font-semibold"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {currentTab && (
        <div
          role="tabpanel"
          id={`tabpanel-${currentTab.id}`}
          aria-labelledby={`tab-${currentTab.id}`}
          tabIndex={0}
          className="rounded-xl border border-slate-800 bg-slate-900/30 p-5 text-sm text-slate-300 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
        >
          {currentTab.content}
        </div>
      )}
    </div>
  );
}
