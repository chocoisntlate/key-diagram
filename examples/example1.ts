import { KeyDiagram } from "@/features/spec/keybindSchema";

export const VSCODE_SHORTCUTS: KeyDiagram = {
  name: "VS Code Shortcuts",
  description: "Common VS Code keyboard shortcuts",
  shortcuts: [
    {
      id: "copy",
      description: ["Copy selected text"],
      keys: ["ctrl-left", "c"],
      displayKey: "Copy",
      tag: "Edit"
    },
    {
      id: "paste",
      description: ["Paste from clipboard"],
      keys: ["ctrl-left", "v"],
      displayKey: "Paste",
      tag: "Edit"
    },
    {
      id: "save",
      description: ["Save current file"],
      keys: ["ctrl-left", "s"],
      displayKey: "Save",
      tag: "File"
    },
    {
      id: "find",
      description: ["Open find dialog"],
      keys: ["ctrl-left", "f"],
      displayKey: "Find",
      tag: "Search"
    },
    {
      id: "replace",
      description: ["Open find and replace"],
      keys: ["ctrl-left", "h"],
      displayKey: "Replace",
      tag: "Search"
    },
    {
      id: "command-palette",
      description: ["Open command palette"],
      keys: ["ctrl-left", "shift-left", "p"],
      displayKey: "Command Palette",
      tag: "View"
    },
    {
      id: "toggle-terminal",
      description: ["Show/hide integrated terminal"],
      keys: ["ctrl-left", "grave"],
      displayKey: "Toggle Terminal",
      tag: "View"
    },
    {
      id: "comment",
      description: ["Toggle line comment"],
      keys: ["ctrl-left", "slash"],
      displayKey: "Toggle Comment",
      tag: "Edit"
    },
    {
      id: "delete-line",
      description: ["Delete current line"],
      keys: ["ctrl-left", "shift-left", "k"],
      displayKey: "Delete Line",
      tag: "Edit"
    },
    {
      id: "new-file",
      description: ["Create new file"],
      keys: ["ctrl-left", "n"],
      displayKey: "New File",
      tag: "File"
    }
  ]
};