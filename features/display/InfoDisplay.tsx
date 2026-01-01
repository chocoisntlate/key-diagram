"use client";

import React, { useState } from "react";
import { KeyDiagram } from "../spec/keybindSchema";
import { KeyboardLayout } from "../spec/keyboardLayoutSchema";

/* ------------------------------------------------------------------ */
/* Panel with layout visibility toggle                                 */
/* ------------------------------------------------------------------ */

type KeyboardPanelProps = {
  keyDiagram: KeyDiagram;
  keyboardLayout: KeyboardLayout;
};

export function KeyboardPanel({ keyDiagram, keyboardLayout }: KeyboardPanelProps) {
  const [showLayout, setShowLayout] = useState(false);
  
  return (
    <section className="flex w-full max-w-md flex-col gap-3 rounded-xl p-3">
      {/* Diagram is always visible */}
      <InfoRow
        title="Diagram"
        name={keyDiagram.name}
        description={keyDiagram.description}
        actions={
          <>
            <PanelButton>Import</PanelButton>
            <PanelButton>Export</PanelButton>
          </>
        }
      />

      {/* Toggle control */}
      <button
        type="button"
        onClick={() => setShowLayout((v) => !v)}
        className="text-xs font-medium text-gray-500 hover:text-gray-700"
      >
        {showLayout ? "Hide" : "Show layout"}
      </button>

      {/* Layout info (rarely used) */}
      {showLayout && (
        <InfoRow
          title="Layout"
          name={keyboardLayout.name}
          description={keyboardLayout.description}
          actions={
            <>
              <PanelButton>Import</PanelButton>
              <PanelButton>Export</PanelButton>
            </>
          }
        />
      )}
    </section>
  );
}

type PanelButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

function PanelButton({ children, onClick }: PanelButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        rounded-md border
        px-3 py-1
        text-xs font-medium
        text-gray-700
        hover:bg-gray-100
      "
    >
      {children}
    </button>
  );
}

type InfoRowProps = {
  title: string;
  name: string;
  description?: string;
  actions?: React.ReactNode;
};

function InfoRow({ title, name, description, actions }: InfoRowProps) {
  return (
    <div
      className="
        flex items-center justify-between gap-4
        rounded-lg border
        bg-white
        px-4 py-3
        shadow-sm
      "
    >
      <h1 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </h1>
      <div className="flex min-w-0 flex-col">
        <span className="text-sm font-medium truncate">
          {name}
        </span>

        {description && (
          <span className="text-xs text-gray-500 truncate">
            {description}
          </span>
        )}
      </div>

      {actions && (
        <div className="flex shrink-0 flex-col gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}