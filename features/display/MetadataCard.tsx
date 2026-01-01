"use client";

import { ReactNode } from "react";

type MetadataCardProps = {
  title: string;
  children: ReactNode;
  details?: ReactNode;
  expanded: boolean;
  onToggle: () => void;
};

export function MetadataCard({
  title,
  children,
  details,
  expanded,
  onToggle,
}: MetadataCardProps) {
  return (
    <div className="rounded-lg border border-gray-300 p-4 space-y-3 text-sm">
      <div className="space-y-1">
        <h1 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {title}
        </h1>
        {children}
      </div>

      {expanded && details}

      {details && (
        <button
          type="button"
          onClick={onToggle}
          className="text-xs font-medium text-gray-500 hover:text-gray-700"
        >
          {expanded ? "Hide details" : "Show more"}
        </button>
      )}
    </div>
  );
}
