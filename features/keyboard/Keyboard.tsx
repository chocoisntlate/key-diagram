"use client";

import { useCallback, useMemo, useState } from "react";
import { KeyDiagram } from "../spec/keybindSchema";
import { KeyboardLayout } from "../spec/keyboardLayoutSchema";
import { Key } from "./Key";
import { useKeyboard } from "./KeyboardContext";

// Configuration
const UNIT = 48;
const GAP = 4;

// --- helpers ------------------------------------------------------

function addGapCompensation(
  rows: KeyboardLayout["rows"],
  gap: number,
) {
  return rows.map((row) =>
    row.map((key) => ({
      ...key,
      adjustedWidth:
        (key.widthScale ?? 1) * UNIT +
        ((key.widthScale ?? 1) - 1) * gap,
    })),
  );
}

// --- component ----------------------------------------------------

export function Keyboard() {
  const { keyDiagram, keyLayout } = useKeyboard();

  const [pressedKeys, setPressedKeys] = useState<Set<string>>(
    () => new Set(),
  );

  const layout = useMemo(
    () => addGapCompensation(keyLayout.rows, GAP),
    [keyLayout],
  );

  const toggleKey = useCallback((keyId: string | null) => {
    if (!keyId) return;

    setPressedKeys((prev) => {
      const next = new Set(prev);
      next.has(keyId) ? next.delete(keyId) : next.add(keyId);
      return next;
    });
  }, []);

  const getKeyDescription = useCallback(
    (keyId: string): string[] | undefined => {
      if (!keyDiagram) return;

      const shortcutCandidates = [];
      for (const shortcut of keyDiagram.shortcuts) {
        if (shortcut.displayKey == keyId) shortcutCandidates.push(shortcut);
      }

      for (const candidate of shortcutCandidates) {
        const matches = [...pressedKeys].filter((k) =>
          candidate.keys.includes(k),
        );

        // everything match perfectly
        if (
          pressedKeys.size === candidate.keys.length &&
          matches.length === candidate.keys.length
            ) return candidate.description;


        // partial match
        if (
          matches.length === candidate.keys.length - 1 &&
          pressedKeys.size === matches.length &&
          !matches.includes(candidate.displayKey)
            ) return candidate.description;
      }




      
      // if (pressedKeys.has(keyId)) {
      //   const completed = findCompletedShortcut(
      //     keyDiagram,
      //     pressedKeys,
      //   );
      //   return completed?.displayKey;
      // }

      // const continuations = findContinuations(
      //   keyDiagram,
      //   pressedKeys,
      //   keyId,
      // );

      // if (continuations.length > 0) {
      //   return continuations
      //     .map((s) => s.displayKey)
      //     .join(" / ");
      // }

      return;
    },
    [keyDiagram, pressedKeys],
  );

  return (
    <div className="flex flex-col gap-1 rounded-xl p-3 shadow-md border border-gray-300 w-fit">
      {layout.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex"
          style={{ gap: GAP }}
        >
          {row.map((key, keyIndex) =>
            key.id === null ? (
              <div
                key={`gap-${rowIndex}-${keyIndex}`}
                className="key-gap flex-none"
                style={{ width: key.adjustedWidth }}
              />
            ) : (
              <Key
                key={key.id}
                label={key.label}
                width={key.adjustedWidth}
                unit={UNIT}
                description={getKeyDescription(key.id)}
                onClick={() => toggleKey(key.id)}
                isPressed={pressedKeys.has(key.id)}
              />
            ),
          )}
        </div>
      ))}
    </div>
  );
}
