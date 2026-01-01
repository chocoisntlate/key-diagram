import { VSCODE_SHORTCUTS } from "@/examples/example1";
import { KeyboardPanel } from "@/features/display/InfoDisplay";
import { Keyboard } from "@/features/keyboard/Keyboard";
import { US_QWERTY_FULL_LAYOUT } from "@/features/keyboard/layouts/us-qwerty-full";

export default function Home() {
  return (
    <main className="overflow-hidden p-2 flex flex-col items-center gap-4 my-4">
      <KeyboardPanel keyDiagram={VSCODE_SHORTCUTS} keyboardLayout={US_QWERTY_FULL_LAYOUT} />
      <Keyboard diagram={VSCODE_SHORTCUTS}></Keyboard>
    </main>
  );
}
