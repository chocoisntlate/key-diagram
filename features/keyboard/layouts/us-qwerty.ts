import { KeyboardLayout } from "./types";

export const US_QWERTY_LAYOUT: KeyboardLayout = [
  [
    { label: "Esc" },
    { label: "1" }, { label: "2" }, { label: "3" }, { label: "4" },
    { label: "5" }, { label: "6" }, { label: "7" }, { label: "8" },
    { label: "9" }, { label: "0" },
    { label: "-" }, { label: "=" },
    { label: "Backspace", width: 2 }
  ],
  [
    { label: "Tab", width: 1.5 },
    { label: "Q" }, { label: "W" }, { label: "E" }, { label: "R" },
    { label: "T" }, { label: "Y" }, { label: "U" }, { label: "I" },
    { label: "O" }, { label: "P" },
    { label: "[" }, { label: "]" }, { label: "\\", width: 1.5 }
  ],
  [
    { label: "CapsLock", width: 1.75 },
    { label: "A" }, { label: "S" }, { label: "D" }, { label: "F" },
    { label: "G" }, { label: "H" }, { label: "J" }, { label: "K" },
    { label: "L" }, { label: ";" }, { label: "'" },
    { label: "Enter", width: 2.25 }
  ],
  [
    { label: "Shift", width: 2.25 },
    { label: "Z" }, { label: "X" }, { label: "C" }, { label: "V" },
    { label: "B" }, { label: "N" }, { label: "M" },
    { label: "," }, { label: "." }, { label: "/" },
    { label: "Shift", width: 2.75 }
  ],
  [
    { label: "Ctrl", width: 1.25 },
    { label: "Alt", width: 1.25 },
    { label: "Meta", width: 1.25 },
    { label: "Space", width: 6 },
    { label: "Meta", width: 1.25 },
    { label: "Alt", width: 1.25 },
    { label: "Ctrl", width: 1.25 }
  ]
];
