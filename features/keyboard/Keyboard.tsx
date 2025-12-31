import { KeyboardLayout } from "../spec/keyboardLayoutSchema";
import { Key } from "./Key";
import { US_QWERTY_LAYOUT } from "./layouts/us-qwerty";
import { US_QWERTY_FULL_LAYOUT } from "./layouts/us-qwerty-full";

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

export function Keyboard() {
  const layout = addGapCompensation(US_QWERTY_FULL_LAYOUT.rows, GAP);

  return (
    <div className="flex flex-col bg-gray-100 p-4 gap-1">
      {layout.map((row, index) => (
        <div key={index} className="flex" style={{ gap: GAP + "px" }}>
          {row.map((key) =>
            key.id === null ? (
              <div
                key={Math.random()}
                style={{ width: key.adjustedWidth + "px" }}
              />
            ) : (
              <Key
                key={key.id}
                label={key.label}
                width={key.adjustedWidth}
                unit={UNIT}
              />
            ),
          )}
        </div>
      ))}
    </div>
  );
}
