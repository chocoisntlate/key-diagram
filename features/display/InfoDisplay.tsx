"use client";

import React from "react";
import { ImportExportButton } from "./ImportExport";
import { useKeyboard } from "../keyboard/KeyboardContext";

/* ------------------------------------------------------------------ */
/* Keyboard panel with diagram + optional layout info                 */
/* ------------------------------------------------------------------ */

export function KeyboardPanel() {
  const { keyDiagram, setKeyDiagram, keyLayout, setKeyLayout } = useKeyboard();

  /* Helper to import JSON and update state */
  const handleImport = <T,>(file: File, setter: React.Dispatch<React.SetStateAction<T>>) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as T;
        setter(data);
      } catch (err) {
        console.error("Failed to import JSON:", err);
      }
    };
    reader.readAsText(file);
  };

  /* Helper to export JSON */
const handleExport = (name: string, data: object) => {
  // sanitize name to be file-system safe
  const safeName = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "");
  const filename = `${safeName}.keydiagram.json`;

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};


  return (
    <section className="flex justify-center w-full max-w-md gap-4 rounded-xl p-4">
      {/* Diagram Info Row */}
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
                  .filter(Boolean)
              ).size}
            </div>
          </>
        }
        actions={
          <>
            <ImportExportButton
              title="Import"
              onFileSelect={(file) => handleImport(file, setKeyDiagram)}
            />
            <ImportExportButton
              title="Export"
              onClick={() => handleExport(keyDiagram.name, keyDiagram)}
            />
          </>
        }
      />

      {/* Layout Info Row */}
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
                  r.map((k) => k.id).filter(Boolean)
                )
              ).size}
            </div>
          </>
        }
        actions={
          <>
            <ImportExportButton
              title="Import"
              onFileSelect={(file) => handleImport(file, setKeyLayout)}
            />
            <ImportExportButton
              title="Export"
              onClick={() => handleExport(keyLayout.name, keyLayout)}
            />
          </>
        }
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* InfoRow & InfoHover                                                 */
/* ------------------------------------------------------------------ */

type InfoRowProps = {
  title: string;
  name: string;
  description?: string;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
};

function InfoRow({ title, name, description, meta, actions }: InfoRowProps) {
  return (
    <div className="flex items-center gap-x-3 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm relative w-full">
      {meta && (
        <div className="absolute top-3 left-3">
          <InfoHover>{meta}</InfoHover>
        </div>
      )}

      <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 justify-self-start w-max"> 
        {title}
      </h2>

      <div className="flex min-w-0 flex-col gap-1 mr-auto">
        <span className="truncate text-sm font-medium text-gray-900">{name}</span>
        {description && (
          <span className="truncate text-xs text-gray-500">{description}</span>
        )}
      </div>

      {actions && (
        <div className="flex flex-col gap-2.5 justify-center">{actions}</div>
      )}
    </div>
  );
}

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

      <div className="absolute left-0 top-full z-10 mt-1 w-48 translate-y-1 rounded-md border border-gray-200 bg-white p-3 text-xs text-gray-700 shadow-lg opacity-0 transition-all duration-150 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-auto">
        <div className="flex flex-col gap-1.5">{children}</div>
      </div>
    </div>
  );
}