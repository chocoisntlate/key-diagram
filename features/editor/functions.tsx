import { KeyDiagram, Shortcut } from "../spec/keybindSchema";

export function editKeybind(
  keyId: string,
  shortcut: Shortcut,
  setKeyDiagram: (diagramUpdater: (diagram: KeyDiagram) => any) => void,
) {}
