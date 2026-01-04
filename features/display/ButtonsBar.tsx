"use client";

import { useKeyboard } from "../keyboard/KeyboardContext";

export default function ButtonsBar() {
  const { setInspectMode, isInspectMode } = useKeyboard();

  return (
    <div className="inline-flex my-3 items-center gap-3 px-4 py-2 rounded-sm border border-gray-200 bg-white">
      <button
        className="rounded-md border border-gray-300 bg-white px-3 py-1.5
                   text-xs font-medium text-gray-700
                   hover:bg-gray-100 transition-colors"
        onClick={() => setInspectMode((prev) => !prev)}
      >
        {isInspectMode ? "Exit inspect mode" : "Enter inspect mode"}
      </button>
    </div>
  );
}
