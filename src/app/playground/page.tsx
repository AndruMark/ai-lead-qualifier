"use client";

import React, { useState } from "react";
import { Modal } from "../../../playground/components/Modal";
import { Tabs, TabItem } from "../../../playground/components/Tabs";
import { Disclosure } from "../../../playground/components/Disclosure";

export default function PlaygroundPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sampleTabs: TabItem[] = [
    {
      id: "tab-aria",
      label: "ARIA Guidelines",
      content: (
        <div className="space-y-2">
          <p className="font-semibold text-white">W3C ARIA Authoring Practices (APG)</p>
          <p>
            This component enforces roving tabindex: the active tab has <code>tabIndex={0}</code>,
            while inactive tabs have <code>tabIndex={-1}</code>. Use <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-xs">ArrowLeft</kbd> and <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-xs">ArrowRight</kbd> to move between tabs.
          </p>
        </div>
      ),
    },
    {
      id: "tab-keyboard",
      label: "Keyboard Shortcuts",
      content: (
        <div className="space-y-2">
          <p className="font-semibold text-white">Full Keyboard Accessibility</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Tabs:</strong> Home / End keys quickly focus first / last tab.</li>
            <li><strong>Modal:</strong> Escape closes; Tab/Shift+Tab traps focus.</li>
            <li><strong>Disclosure:</strong> Enter or Space toggles expansion.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "tab-focus",
      label: "Focus Restoration",
      content: (
        <div className="space-y-2">
          <p className="font-semibold text-white">Focus Persistence</p>
          <p>
            When closing the modal dialog via Escape or click, focus is programmatically restored to the trigger button that originally launched it.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-10">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-white">
          Accessible Component Playground
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Hand-crafted components adhering strictly to W3C ARIA Authoring Practices Guide (APG).
        </p>
      </div>

      {/* 1. Modal Dialog Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">1. Modal Dialog</h2>
            <p className="text-xs text-slate-400">
              Focus trap, Escape to dismiss, focus return to trigger.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg text-sm transition outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Open Test Modal
          </button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Lead Qualification Confirmation"
          description="Review contact priority before synchronizing with your sales pipeline."
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-300">
              Press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-xs">Tab</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-xs">Shift+Tab</kbd> to verify that focus remains trapped inside this dialog.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-semibold text-sm hover:bg-emerald-600"
              >
                Confirm Action
              </button>
            </div>
          </div>
        </Modal>
      </section>

      {/* 2. Tabs Section */}
      <section className="space-y-3">
        <div>
          <h2 className="text-xl font-bold text-white">2. Accessible Tabs</h2>
          <p className="text-xs text-slate-400">
            Roving tabindex with ArrowLeft / ArrowRight / Home / End keyboard support.
          </p>
        </div>
        <Tabs tabs={sampleTabs} ariaLabel="Playground Feature Tabs" />
      </section>

      {/* 3. Disclosure Section */}
      <section className="space-y-3">
        <div>
          <h2 className="text-xl font-bold text-white">3. Disclosure (Accordion)</h2>
          <p className="text-xs text-slate-400">
            Native button with aria-expanded and aria-controls wiring.
          </p>
        </div>
        <div className="space-y-3">
          <Disclosure title="What makes a modal accessible according to W3C?" defaultExpanded>
            A compliant modal must set <code>role=&quot;dialog&quot;</code>, <code>aria-modal=&quot;true&quot;</code>, trap keyboard focus within its perimeter, handle Escape key dismissal, and restore focus to the opening element when closed.
          </Disclosure>
          <Disclosure title="How does roving tabindex work in tablists?">
            Only the active tab is in the natural tab order (<code>tabIndex={0}</code>). All non-active sibling tabs receive <code>tabIndex={-1}</code>. Arrow keys navigate between tabs and dynamically transfer focus.
          </Disclosure>
        </div>
      </section>
    </div>
  );
}
