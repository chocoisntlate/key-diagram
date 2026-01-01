"use client";

import React, { useState } from "react";
import { ImportExportButton } from "../import-export/Buttons";
import { useKeyboard } from "../keyboard/KeyboardContext";

/* ------------------------------------------------------------------ */
/* Keyboard panel with diagram + optional layout info                 */
/* ------------------------------------------------------------------ */


export function KeyboardPanel() {
  const { keyDiagram, keyLayout } = useKeyboard();

  const importDiagramRef = React.useRef<HTMLInputElement>(null);

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
            <ImportExportButton title="Import" onFileSelect={() => {}} />
            <ImportExportButton title="Export" />
          </>
        }
      />
        <InfoRow
          title="Layout"
          name={keyLayout.name}
          description={keyLayout.description}
          meta={
            <>
              <div>Rows: {keyLayout.rows.length}</div>
              <div>
                Keys:{" "}
                {new Set(
                  keyLayout.rows.flatMap((r) =>
                    r.map((k) => k.id).filter(Boolean),
                  ),
                ).size}
              </div>
            </>
          }
          actions={
            <>
              <ImportExportButton title="Import" onFileSelect={() => {}} />
              <ImportExportButton title="Export" />
            </>
          }
        />
    </section>
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