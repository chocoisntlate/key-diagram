"use client";

import { useCallback, useMemo, useState } from "react";
import { KeyDiagram } from "../spec/keybindSchema";
import { KeyboardLayout } from "../spec/keyboardLayoutSchema";
import { Key } from "./Key";
import { US_QWERTY_FULL_LAYOUT } from "./layouts/us-qwerty-full";

// Configuration
const UNIT = 60;
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

function findCompletedShortcut(
  diagram: KeyDiagram,
  pressedKeys: Set<string>,
) {
  return diagram.shortcuts.find((shortcut) => {
    const shortcutKeys = new Set(shortcut.keys);
    return (
      shortcutKeys.size === pressedKeys.size &&
      [...shortcutKeys].every((k) => pressedKeys.has(k))
    );
  });
}

function findContinuations(
  diagram: KeyDiagram,
  pressedKeys: Set<string>,
  nextKey: string,
) {
  const pressedArray = [...pressedKeys];

  return diagram.shortcuts.filter((shortcut) => {
    const { keys } = shortcut;

    const matchesPrefix = pressedArray.every(
      (pk, i) => keys[i] === pk,
    );

    const isNextKey = keys[pressedArray.length] === nextKey;

    return matchesPrefix && isNextKey;
  });
}

// --- component ----------------------------------------------------

export function Keyboard({ diagram }: { diagram: KeyDiagram | null }) {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(
    () => new Set(),
  );

  const layout = useMemo(
    () => addGapCompensation(US_QWERTY_FULL_LAYOUT.rows, GAP),
    [],
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
    (keyId: string): string | undefined => {
      if (!diagram || pressedKeys.size === 0) return;

      if (pressedKeys.has(keyId)) {
        const completed = findCompletedShortcut(
          diagram,
          pressedKeys,
        );
        return completed?.displayKey;
      }

      const continuations = findContinuations(
        diagram,
        pressedKeys,
        keyId,
      );

      if (continuations.length > 0) {
        return continuations
          .map((s) => s.displayKey)
          .join(" / ");
      }

      return;
    },
    [diagram, pressedKeys],
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
