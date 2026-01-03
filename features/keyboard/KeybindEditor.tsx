import { KeyDiagram } from "../spec/keybindSchema";

type KeybindEditorProps = {
  keyId: string;
  shortcuts: KeyDiagram["shortcuts"];
  onClose: () => void;
};

export default function KeybindEditor({ keyId, shortcuts, onClose }: KeybindEditorProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">
            Edit keybinds for “{keyId}”
          </h3>
          <button
            onClick={onClose}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {shortcuts.length === 0 && (
            <div className="text-xs text-gray-500">
              No keybinds for this key.
            </div>
          )}

          {shortcuts.map((s, i) => (
            <div
              key={i}
              className="rounded-md border border-gray-200 p-2 text-xs"
            >
              <div className="font-medium">
                {s.keys.join(" + ")}
              </div>
              <div className="text-gray-600">
                {s.description.join(" / ")}
              </div>

              <div className="mt-2 flex gap-2">
                <button className="text-xs text-blue-600 hover:underline">
                  Edit
                </button>
                <button className="text-xs text-red-600 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          ))}

          <button className="mt-2 text-xs text-green-600 hover:underline">
            + Add keybind
          </button>
        </div>
      </div>
    </div>
  );
}
