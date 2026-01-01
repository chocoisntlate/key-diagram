"use client";

import { createContext, useContext, useState } from "react";
import { KeyDiagram } from "../spec/keybindSchema";
import { KeyboardLayout } from "../spec/keyboardLayoutSchema";
import { VSCODE_SHORTCUTS } from "@/examples/example1";
import { US_QWERTY_FULL_LAYOUT } from "./layouts/us-qwerty-full";

type KeyboardContextType = {
  keyDiagram: KeyDiagram;
  setKeyDiagram: React.Dispatch<React.SetStateAction<KeyDiagram>>;
  keyLayout: KeyboardLayout;
  setKeyLayout: React.Dispatch<React.SetStateAction<KeyboardLayout>>;
};


const KeyboardContext = createContext<KeyboardContextType | undefined>(undefined);

export function KeyboardContextProvider({children}: {children: React.ReactNode}) {
    const [keyDiagram , setKeyDiagram] = useState<KeyDiagram>(VSCODE_SHORTCUTS);
    const [keyLayout, setKeyLayout] = useState<KeyboardLayout>(US_QWERTY_FULL_LAYOUT);
    return (
        <KeyboardContext.Provider value={{ keyDiagram, setKeyDiagram, keyLayout, setKeyLayout }}>
            {children}
        </KeyboardContext.Provider>
    );   
}

export const useKeyboard = () => {
  const context = useContext(KeyboardContext);
  if (!context) throw new Error("useKeyboard must be used within a KeyboardProvider");
  return context;
};