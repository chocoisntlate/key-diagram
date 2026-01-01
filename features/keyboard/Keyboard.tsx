"use client";
import { KeyDiagram } from "../spec/keybindSchema";
import { KeyboardLayout } from "../spec/keyboardLayoutSchema";
import { Key } from "./Key";
import { US_QWERTY_FULL_LAYOUT } from "./layouts/us-qwerty-full";
import { useMemo, useState } from "react";

// Configuration
const UNIT = 60;
const GAP = 4;

// Function to adjust key widths to account for gaps
function addGapCompensation(rows: KeyboardLayout["rows"], gap: number) {
  return rows.map((row) =>
    row.map((key) => ({
      ...key,
      adjustedWidth:
        (key.widthScale || 1) * UNIT + ((key.widthScale || 1) - 1) * gap,
    })),
  );
}

export function Keyboard({ diagram }: { diagram: KeyDiagram | null }) {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const layout = addGapCompensation(US_QWERTY_FULL_LAYOUT.rows, GAP);

  const toggleKey = (keyId: string | null) => {
    if (keyId === null) return;
    
    setPressedKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  }

const getKeyDescription = (keyId: string): string | undefined => {
  if (!diagram || pressedKeys.size === 0) return undefined;

  // If this key is already pressed, check if we have a complete match
  if (pressedKeys.has(keyId)) {
    const completedShortcut = diagram.shortcuts.find(shortcut => {
      const shortcutKeys = new Set(shortcut.keys);
      return shortcutKeys.size === pressedKeys.size &&
             [...shortcutKeys].every(key => pressedKeys.has(key));
    });
    
    if (completedShortcut) {
      return completedShortcut.displayKey;
    }
  }

  // If this key is NOT pressed, check if it would continue a partial match
  if (!pressedKeys.has(keyId)) {
    const matchingShortcuts = diagram.shortcuts.filter(shortcut => {
      const shortcutKeys = shortcut.keys;
      
      // Check if pressed keys match the START of the shortcut (in order)
      const pressedArray = [...pressedKeys];
      const matchesPrefix = pressedArray.every((pk, index) => 
        shortcutKeys[index] === pk
      );
      
      // This keyId must be the NEXT key in sequence
      const isNextKey = shortcutKeys[pressedArray.length] === keyId;
      
      return matchesPrefix && isNextKey;
    });

    if (matchingShortcuts.length > 0) {
      return matchingShortcuts.map(s => s.displayKey).join(" / ");
    }
  }

  return undefined;
};

  return (
    <div 
      className={[
        "inline-flex flex-col gap-1",
        "rounded-xl",
        "p-3",
        "shadow-md",
        "border border-gray-300",
      ].join(" ")}
    >
      {layout.map((row, index) => (
        <div key={index} className="flex" style={{ gap: GAP + "px" }}>
          {row.map((key) =>
            key.id === null ? (
              <div
                className="key-gap flex-none"
                key={Math.random()}
                style={{ width: key.adjustedWidth + "px" }}
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
