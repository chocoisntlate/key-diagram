import { KeyDiagram } from "@/features/spec/keybindSchema";

export const VSCODE_SHORTCUTS: KeyDiagram = {
  name: "VS Code Shortcuts",
  description: "Common VS Code keyboard shortcuts",
  shortcuts: [
    {
      description: ["Copy selected text", "and do something else"],
      keys: ["ctrl-left", "c"],
      displayKey: "c",
      tag: "Edit"
    },
    {
      description: ["Paste from clipboard"],
      keys: ["ctrl-left", "v"],
      displayKey: "v",
      tag: "Edit"
    },
    {
      description: ["Save current file"],
      keys: ["ctrl-left", "s"],
      displayKey: "s",
      tag: "File"
    },
    {
      description: ["Open find dialog"],
      keys: ["ctrl-left", "f"],
      displayKey: "f",
      tag: "Search"
    },
    {
      description: ["Open find and replace"],
      keys: ["ctrl-left", "h"],
      displayKey: "h",
      tag: "Search"
    }
  ]
};