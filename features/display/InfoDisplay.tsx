"use client";

import React, { useState } from "react";
import { KeyDiagram } from "../spec/keybindSchema";
import { KeyboardLayout } from "../spec/keyboardLayoutSchema";

/* ------------------------------------------------------------------ */
/* Keyboard panel with diagram + optional layout info                 */
/* ------------------------------------------------------------------ */

type KeyboardPanelProps = {
  keyDiagram: KeyDiagram;
  keyboardLayout: KeyboardLayout;
};

export function KeyboardPanel({
  keyDiagram,
  keyboardLayout,
}: KeyboardPanelProps) {

  return (
    <section className="flex justify-center w-full max-w-md gap-4 rounded-xl p-4">
      <InfoRow
        title="Diagram"
        name={keyDiagram.name}
        description={keyDiagram.description}
        meta={
          <>
            <div>Shortcuts: {keyDiagram.shortcuts.length}</div>
            <div>
              Tags:{" "}
              {new Set(
                keyDiagram.shortcuts
                  .map((s) => s.tag)
                  .filter(Boolean),
              ).size}
            </div>
          </>
        }
        actions={
          <>
            <PanelButton>Import</PanelButton>
            <PanelButton>Export</PanelButton>
          </>
        }
      />
        <InfoRow
          title="Layout"
          name={keyboardLayout.name}
          description={keyboardLayout.description}
          meta={
            <>
              <div>Rows: {keyboardLayout.rows.length}</div>
              <div>
                Keys:{" "}
                {new Set(
                  keyboardLayout.rows.flatMap((r) =>
                    r.map((k) => k.id).filter(Boolean),
                  ),
                ).size}
              </div>
            </>
          }
          actions={
            <>
              <PanelButton>Import</PanelButton>
              <PanelButton>Export</PanelButton>
            </>
          }
        />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Shared primitives                                                   */
/* ------------------------------------------------------------------ */

type PanelButtonProps = {
  children: React.ReactNode;
};

function PanelButton({ children }: PanelButtonProps) {
  return (
    <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
      {children}
    </button>
  );
}

type InfoRowProps = {
  title: string;
  name: string;
  description?: string;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
};

function InfoRow({ title, name, description, meta, actions }: InfoRowProps) {
  return (
    <div className="flex items-center gap-x-3 
                    rounded-lg border border-gray-200 bg-white
                   px-5 py-4 shadow-sm relative w-full"
    >
      {/* Top-left info icon */}
      {meta && (
        <div className="absolute top-3 left-3">
          <InfoHover>{meta}</InfoHover>
        </div>
      )}

      {/* Title column */}
      <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 justify-self-start w-max">
        {title}
      </h2>

      {/* Content column */}
      <div className="flex min-w-0 flex-col gap-1 mr-auto">
        <span className="truncate text-sm font-medium text-gray-900">{name}</span>
        {description && (
          <span className="truncate text-xs text-gray-500">{description}</span>
        )}
      </div>

      {/* Actions column */}
      {actions && (
        <div className="flex flex-col gap-2.5 justify-center">{actions}</div>
      )}
    </div>
  );
}



/* ------------------------------------------------------------------ */
/* Info hover icon and panel                                           */
/* ------------------------------------------------------------------ */

function InfoHover({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative shrink-0">
      <button
        type="button"
        className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 bg-white text-[9px] font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
        aria-label="More information"
      >
        i
      </button>

      <div className="pointer-events-none absolute left-0 top-full z-10 mt-1 w-48 translate-y-1 rounded-md border border-gray-200 bg-white p-3 text-xs text-gray-700 shadow-lg opacity-0 transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex flex-col gap-1.5">{children}</div>
      </div>
    </div>
  );
}