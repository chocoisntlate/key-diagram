"use client";

import { US_QWERTY_LAYOUT } from "./layouts/us-qwerty";
import { Key } from "./Key";

function normalizeKey(key: string) {
  return key.toLowerCase();
}

export function Keyboard() {
  // const document = useVisualizerStore(s => s.document);

  // const activeKeys = new Set(
  //   document
  //     ? document.shortcuts.flatMap(s => s.keys).map(normalizeKey)
  //     : []
  // );

  return (
    <div className="inline-block space-y-2">
      {US_QWERTY_LAYOUT.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-1"
          style={{ width: "100%" }}
        >
          {row.map((keyDef, keyIndex) => (
            <Key
              key={`${rowIndex}-${keyIndex}`}
              label={keyDef.label}
              width={keyDef.width}
              active={false}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
