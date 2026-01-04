"use client";

import { useKeyboard } from "./KeyboardContext";

type KeyProps = {
  label: string;
  width: number;
  unit: number;
  description?: string[];

  candidateCount: number;

  onClick: () => void;
  isPressed: boolean;
};

export function Key({
  label,
  width,
  unit,
  description,
  candidateCount,
  onClick,
  isPressed,
}: KeyProps) {
  const { isInspectMode } = useKeyboard();

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative flex items-center justify-center group",
        "rounded-md border",
        "text-xs font-medium",
        "shadow-sm",
        "transition-all select-none flex-none",
        isPressed
          ? "bg-blue-500 border-blue-600 text-white shadow-inner"
          : "border-gray-300 text-gray-800 hover:bg-gray-100",
      ].join(" ")}
      style={{
        width: width + "px",
        height: unit + "px",
      }}
    >
      <span className="absolute top-1 left-1.5 text-xs">{label}</span>

      {isInspectMode && (
        <span className="absolute bottom-1 right-1 text-xs text-gray-500">
          {candidateCount}
        </span>
      )}

      {!isInspectMode && description && (
        <>
          <span className="absolute bottom-1 left-1 right-1 text-[0.6rem] leading-tight text-center px-0.5 font-medium opacity-75 truncate">
            {description.length > 1 ? (
              <>
                <span className="ml-1 opacity-60">+{description.length}</span>
              </>
            ) : (
              description[0]
            )}
          </span>

          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-10 shadow-lg">
            <ul className="list-disc list-inside whitespace-nowrap">
              {description.length > 1 ? (
                <>
                  {description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </>
              ) : (
                description[0]
              )}
            </ul>
          </span>
        </>
      )}
    </button>
  );
}
