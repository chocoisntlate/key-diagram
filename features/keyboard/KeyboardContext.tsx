"use client";

import { createContext, useContext, useState } from "react";
import { KeyDiagram } from "../spec/keybindSchema";
import { KeyboardLayout } from "@/features/spec/keyboardLayoutSchema";
import { INTRODUCTION_DIAGRAM } from "@/examples/default.diagram";
import { QWERTY_US_80 } from "../../examples/default.layout";

type KeyboardContextType = {
  keyDiagram: KeyDiagram;
  setKeyDiagram: React.Dispatch<React.SetStateAction<KeyDiagram>>;
  keyLayout: KeyboardLayout;
  setKeyLayout: React.Dispatch<React.SetStateAction<KeyboardLayout>>;
  isInspectMode: boolean;
  setInspectMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const KeyboardContext = createContext<KeyboardContextType | undefined>(
  undefined,
);

export function KeyboardContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [keyDiagram, setKeyDiagram] = useState<KeyDiagram>(INTRODUCTION_DIAGRAM);
  const [keyLayout, setKeyLayout] = useState<KeyboardLayout>(
    QWERTY_US_80,
  );
  const [isInspectMode, setInspectMode] = useState<boolean>(false);

  return (
    <KeyboardContext.Provider
      value={{
        keyDiagram,
        setKeyDiagram,
        keyLayout,
        setKeyLayout,
        isInspectMode,
        setInspectMode,
      }}
    >
      {children}
    </KeyboardContext.Provider>
  );
}

export const useKeyboard = () => {
  const context = useContext(KeyboardContext);
  if (!context)
    throw new Error("useKeyboard must be used within a KeyboardProvider");
  return context;
};
