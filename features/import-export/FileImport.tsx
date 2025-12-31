"use client";

import { useState } from "react";
import { importKeyDiaJSON } from "./jsonImport";

export function FileImport() {
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    if (!file.name.endsWith(".json")) {
      setError("Please upload a .json file");
      return;
    }

    const text = await file.text();
    const result = importKeyDiaJSON(text);

    if (!result.success) {
      setError(result.error);
      return;
    }
    console.log(result.data);
  }

  return (
    <div className="space-y-2">
      <label className="block">
        <input
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        <span className="inline-block px-4 py-2 rounded bg-black text-white cursor-pointer">
          Upload KeyDia JSON
        </span>
      </label>

      {error && (
        <pre className="text-red-600 text-sm whitespace-pre-wrap">{error}</pre>
      )}
    </div>
  );
}
