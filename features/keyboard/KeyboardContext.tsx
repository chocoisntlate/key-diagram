"use client";

import { createContext, useContext, useState } from "react";
import { KeyDiagram } from "../spec/keybindSchema";
import { KeyboardLayout } from "@/features/spec/keyboardLayoutSchema";
import { VSCODE_SHORTCUTS } from "@/examples/default.keydiagram";
import { US_QWERTY_FULL_LAYOUT } from "../../examples/us-qwerty-full";

type KeyboardContextType = {
  keyDiagram: KeyDiagram;
  setKeyDiagram: React.Dispatch<React.SetStateAction<KeyDiagram>>;
  keyLayout: KeyboardLayout;
  setKeyLayout: React.Dispatch<React.SetStateAction<KeyboardLayout>>;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};


const KeyboardContext = createContext<KeyboardContextType | undefined>(undefined);

export function KeyboardContextProvider({children}: {children: React.ReactNode}) {
    const [keyDiagram , setKeyDiagram] = useState<KeyDiagram>(VSCODE_SHORTCUTS);
    const [keyLayout, setKeyLayout] = useState<KeyboardLayout>(US_QWERTY_FULL_LAYOUT);
    const [editMode, setEditMode] = useState<boolean>(false);

    return (
        <KeyboardContext.Provider value={{ keyDiagram, setKeyDiagram, keyLayout, setKeyLayout, editMode, setEditMode }}>
            {children}
        </KeyboardContext.Provider>
    );   
}

export const useKeyboard = () => {
  const context = useContext(KeyboardContext);
  if (!context) throw new Error("useKeyboard must be used within a KeyboardProvider");
  return context;
};