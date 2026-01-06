import { EditableShortcut, FieldErrors } from "../diagram/shortcut";
import { Field, Input } from "./ShortcutFormFields";

type ShortcutRowProps = {
  shortcut: EditableShortcut;
  index: number;
  isEditMode: boolean;
  isEditing: boolean;
  error?: FieldErrors;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onUpdate: (index: number, patch: Partial<EditableShortcut>) => void;
  onCollapse: (index: number) => void;
  rowRef: (el: HTMLDivElement | null) => void;
};

export function ShortcutRow({
  shortcut,
  index,
  isEditMode,
  isEditing,
  error = {},
  onEdit,
  onDelete,
  onUpdate,
  onCollapse,
  rowRef,
}: ShortcutRowProps) {
  const hasError = Object.keys(error).length > 0;

  return (
    <div
      ref={rowRef}
      className={`rounded-md border p-3 text-xs ${
        hasError ? "border-red-500 bg-red-50" : "border-gray-200"
      }`}
    >
      {!isEditing ? (
        <ShortcutRowCollapsed
          shortcut={shortcut}
          hasError={hasError}
          isEditMode={isEditMode}
          onEdit={() => onEdit(index)}
          onDelete={() => onDelete(index)}
        />
      ) : (
        <ShortcutRowExpanded
          shortcut={shortcut}
          error={error}
          onUpdate={(patch) => onUpdate(index, patch)}
          onCollapse={() => onCollapse(index)}
        />
      )}
    </div>
  );
}

function ShortcutRowCollapsed({
  shortcut,
  hasError,
  isEditMode,
  onEdit,
  onDelete,
}: {
  shortcut: EditableShortcut;
  hasError: boolean;
  isEditMode: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <>
      <div className="font-medium">{shortcut.keys || "(No keys)"}</div>

      {shortcut.description && (
        <ul className="mt-1 list-disc pl-4 text-gray-500">
          {shortcut.description.split("\n").map((d, idx) => (
            <li key={idx}>{d}</li>
          ))}
        </ul>
      )}

      {shortcut.tags && (
        <div className="mt-1 flex flex-wrap gap-1">
          {shortcut.tags.split(/[,\s]+/).map((tag, idx) => (
            <span
              key={idx}
              className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {hasError && (
        <div className="mt-1 text-[11px] text-red-600">
          Invalid fields — expand to fix
        </div>
      )}

      {isEditMode && (
        <div className="mt-2 flex gap-2">
          <button className="text-blue-600 hover:underline" onClick={onEdit}>
            Edit
          </button>
          <button className="text-red-600 hover:underline" onClick={onDelete}>
            Delete
          </button>
        </div>
      )}
    </>
  );
}

function ShortcutRowExpanded({
  shortcut,
  error,
  onUpdate,
  onCollapse,
}: {
  shortcut: EditableShortcut;
  error: FieldErrors;
  onUpdate: (patch: Partial<EditableShortcut>) => void;
  onCollapse: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Field label="*Display key" error={error.displayKey}>
        <Input
          value={shortcut.displayKey}
          onChange={(v) => onUpdate({ displayKey: v })}
          error={!!error.displayKey}
        />
      </Field>

      <Field label="*Keys" error={error.keys}>
        <Input
          value={shortcut.keys}
          onChange={(v) => onUpdate({ keys: v })}
          error={!!error.keys}
        />
      </Field>

      <Field label="*Descriptions" error={error.description}>
        <textarea
          rows={3}
          className={`rounded-md border px-2 py-1 text-xs resize-none ${
            error.description ? "border-red-500" : "border-gray-300"
          }`}
          value={shortcut.description}
          onChange={(ev) => onUpdate({ description: ev.target.value })}
        />
      </Field>

      <Field label="Tags" error={error.tags}>
        <Input
          value={shortcut.tags ?? ""}
          onChange={(v) => onUpdate({ tags: v })}
          error={!!error.tags}
        />
      </Field>

      <button
        className="self-start text-blue-600 hover:underline"
        onClick={onCollapse}
      >
        Collapse
      </button>
    </div>
  );
}
