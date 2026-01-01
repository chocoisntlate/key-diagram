import { VSCODE_SHORTCUTS } from "@/examples/example1";
import { Keyboard } from "@/features/keyboard/Keyboard";

export default function Home() {
  return (
    <main className="overflow-hidden p-2">
      <Keyboard diagram={VSCODE_SHORTCUTS}></Keyboard>
    </main>
  );
}
