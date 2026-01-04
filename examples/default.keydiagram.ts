import { KeyDiagram } from "@/features/spec/keybindSchema";

export const VSCODE_SHORTCUTS: KeyDiagram = {
  name: "My keybinds",
  description: "Something cool",
  shortcuts: [
    {
      description: ["Have a great day!"],
      keys: ["a"],
      displayKey: "a",
    },
    {
      description: ["Test"],
      keys: ["shift-left", "c"],
      displayKey: "c",
    },
    {
      description: ["Copy selected text", "and do something else"],
      keys: ["ctrl-left", "c"],
      displayKey: "c",
    },
    {
      description: ["Paste from clipboard"],
      keys: ["ctrl-left", "v"],
      displayKey: "v",
    },
    {
      description: ["Save current file"],
      keys: ["ctrl-left", "s"],
      displayKey: "s",
    },
    {
      description: ["Open find dialog"],
      keys: ["ctrl-left", "f"],
      displayKey: "f",
    },
    {
      description: ["Open find and replace"],
      keys: ["ctrl-left", "h"],
      displayKey: "h",
    },
  ],
};
