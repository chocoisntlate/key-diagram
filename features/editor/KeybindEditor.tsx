"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Shortcut, ShortcutSchema } from "../spec/keybindSchema";
import { useKeyboard } from "../keyboard/KeyboardContext";

type KeybindEditorProps = {
  keyId: string;
  shortcuts: Shortcut[];
  onClose: () => void;
};

type FieldErrors = {
  displayKey?: string;
  keys?: string;
  description?: string;
  tags?: string;
};

export default function KeybindEditor({
  keyId,
  shortcuts,
  onClose,
}: KeybindEditorProps) {
  const { setKeyDiagram, keyLayout } = useKeyboard();

  const [draft, setDraft] = useState<Shortcut[]>(() =>
    structuredClone(shortcuts),
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [errors, setErrors] = useState<Record<number, FieldErrors>>({});

  const rowRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Memoize valid key IDs to avoid recomputing on every render
  const validKeyIds = useMemo(
    () =>
      new Set(
        keyLayout.rows
          .flat()
          .map((k) => k.id)
          .filter(Boolean),
      ),
    [keyLayout.rows],
  );

  const update = useCallback((i: number, patch: Partial<Shortcut>) => {
    setDraft((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], ...patch };
      return next;
    });
  }, []);

  const normalize = useCallback((s: Shortcut): Shortcut => {
    const rawKeys = Array.isArray(s.keys) ? (s.keys[0] ?? "") : "";
    const parsedKeys = rawKeys
      .split(/[+\s]+/)
      .map((k) => k.trim())
      .filter(Boolean)
      .slice(0, 5);

    // Parse tags from space/comma-separated string
    const rawTags = Array.isArray(s.tags) ? (s.tags[0] ?? "") : "";
    const parsedTags = rawTags
      .split(/[,\s]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    return {
      ...s,
      keys: parsedKeys,
      description: s.description.filter(Boolean),
      tags: parsedTags.length > 0 ? parsedTags : undefined,
    };
  }, []);

  const validateShortcut = useCallback(
    (s: Shortcut, currentIndex: number) => {
      const normalized = normalize(s);

      // Validate that all key IDs exist in the layout
      const invalidKey = normalized.keys.find((k) => !validKeyIds.has(k));

      if (invalidKey) {
        return {
          success: false as const,
          errors: {
            keys: `Unknown key ID: "${invalidKey}"`,
          },
        };
      }

      // Check for duplicate keybinds (same displayKey and keys combination)
      const keysString = normalized.keys.slice().sort().join("+");
      const duplicateIndex = draft.findIndex((existing, idx) => {
        if (idx === currentIndex) return false; // Skip self
        const existingNormalized = normalize(existing);
        const existingKeys = existingNormalized.keys.slice().sort().join("+");
        return (
          existingNormalized.displayKey === normalized.displayKey &&
          existingKeys === keysString
        );
      });

      if (duplicateIndex !== -1) {
        return {
          success: false as const,
          errors: {
            keys: `Duplicate keybind: This combination already exists in entry #${duplicateIndex + 1}`,
          },
        };
      }

      const parsed = ShortcutSchema.safeParse(normalized);

      if (!parsed.success) {
        const fe: FieldErrors = {};
        for (const issue of parsed.error.issues) {
          const fieldName = issue.path[0] as keyof FieldErrors;
          fe[fieldName] = issue.message;
        }
        return { success: false as const, errors: fe };
      }

      return { success: true as const, data: normalized };
    },
    [normalize, validKeyIds, draft],
  );

  const saveAll = useCallback(() => {
    const nextErrors: Record<number, FieldErrors> = {};
    const valid: Shortcut[] = [];

    draft.forEach((s, i) => {
      const res = validateShortcut(s, i);
      if (!res.success) {
        nextErrors[i] = res.errors;
      } else {
        valid.push(res.data);
      }
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setIsEditMode(true);
      return;
    }

    setKeyDiagram((d: any) => ({
      ...d,
      shortcuts: [
        ...d.shortcuts.filter((s: Shortcut) => s.displayKey !== keyId),
        ...valid,
      ],
    }));

    onClose();
  }, [draft, validateShortcut, setKeyDiagram, keyId, onClose]);

  const handleDelete = useCallback((index: number) => {
    setDraft((d) => d.filter((_, idx) => idx !== index));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[index];
      // Reindex errors for items after the deleted one
      const reindexed: Record<number, FieldErrors> = {};
      Object.entries(next).forEach(([key, value]) => {
        const numKey = Number(key);
        reindexed[numKey > index ? numKey - 1 : numKey] = value;
      });
      return reindexed;
    });
  }, []);

  const handleAddKeybind = useCallback(() => {
    const newIndex = draft.length;
    setDraft((d) => [
      ...d,
      {
        displayKey: keyId,
        keys: [""],
        description: [""],
        tags: undefined,
      } as Shortcut,
    ]);
    setEditingIndex(newIndex);

    // Focus the first input after the new row is rendered
    requestAnimationFrame(() => {
      const newRow = rowRefs.current.get(newIndex);
      const firstInput = newRow?.querySelector("input");
      firstInput?.focus();

      // Scroll to the new row
      newRow?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }, [keyId, draft.length]);

  const handleEnterEditMode = useCallback(() => {
    setIsEditMode(true);
    setErrors({});
  }, []);

  // Clear errors when collapsing an item
  const handleCollapse = useCallback((index: number) => {
    setEditingIndex(null);
    setErrors((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-md max-h-[90vh] rounded-lg bg-white p-4 shadow-lg flex flex-col">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Keybinds for "{keyId}"</h3>

          <div className="flex gap-2">
            {isEditMode ? null : (
              <button
                className="text-xs text-blue-600 hover:underline"
                onClick={handleEnterEditMode}
                aria-label="Edit keybinds"
              >
                Edit keybinds
              </button>
            )}
            <button
              className="text-xs text-gray-500 hover:text-gray-700"
              onClick={onClose}
              aria-label="Close"
            >
              Close
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pr-4 flex flex-col gap-2">
          {draft.map((s, i) => {
            const hasError = !!errors[i];
            const isEditing = isEditMode && editingIndex === i;
            const e = errors[i] ?? {};

            return (
              <div
                key={i}
                ref={(el) => {
                  if (el) {
                    rowRefs.current.set(i, el);
                  } else {
                    rowRefs.current.delete(i);
                  }
                }}
                className={`rounded-md border p-3 text-xs ${
                  hasError ? "border-red-500 bg-red-50" : "border-gray-200"
                }`}
              >
                {!isEditing ? (
                  <>
                    <div className="font-medium">
                      {Array.isArray(s.keys) && s.keys.length > 0
                        ? s.keys.join(" + ")
                        : "(No keys)"}
                    </div>

                    {s.description.length > 0 && (
                      <ul className="mt-1 list-disc pl-4 text-gray-500">
                        {s.description.map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    )}

                    {s.tags && s.tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {s.tags.map(
                          (tag, idx) =>
                            tag && (
                              <span
                                key={idx}
                                className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[11px]"
                              >
                                {tag}
                              </span>
                            ),
                        )}
                      </div>
                    )}

                    {hasError && (
                      <div className="mt-1 text-[11px] text-red-600">
                        Invalid fields — expand to fix
                      </div>
                    )}

                    {isEditMode && (
                      <div className="mt-2 flex gap-2">
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => setEditingIndex(i)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => handleDelete(i)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Field label="*Display key" error={e.displayKey}>
                      <Input
                        value={s.displayKey}
                        error={!!e.displayKey}
                        onChange={(v) => update(i, { displayKey: v })}
                      />
                    </Field>

                    <Field label="*Keys (space or '+' separated)" error={e.keys}>
                      <Input
                        value={s.keys[0] ?? ""}
                        error={!!e.keys}
                        onChange={(v) => update(i, { keys: [v] })}
                        placeholder="e.g. Ctrl+C or Alt Shift F"
                      />
                    </Field>

                    <Field
                      label="*Descriptions (new line for multiple)"
                      error={e.description}
                    >
                      <textarea
                        rows={3}
                        className={`rounded-md border px-2 py-1 text-xs resize-none focus:outline-none ${
                          e.description
                            ? "border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                        }`}
                        value={s.description.join("\n")}
                        onChange={(ev) =>
                          update(i, {
                            description: ev.target.value.split("\n"),
                          })
                        }
                        placeholder="Enter descriptions..."
                      />
                    </Field>

                    <Field
                      label="Tags (space or ',' separated)"
                      error={e.tags}
                    >
                      <Input
                        value={s.tags?.[0] ?? ""}
                        error={!!e.tags}
                        onChange={(v) => update(i, { tags: [v] as any })}
                        placeholder="e.g. editing, navigation or windows scripts"
                      />
                    </Field>

                    <button
                      className="self-start text-blue-600 hover:underline"
                      onClick={() => handleCollapse(i)}
                    >
                      Collapse
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {isEditMode && (
            <button
              className="mt-2 text-xs text-green-600 hover:underline"
              onClick={handleAddKeybind}
            >
              + Add keybind
            </button>
          )}
        </div>

        {isEditMode && (
          <div className="mt-4 flex justify-end gap-2">
            {/* <button
              className="text-xs text-gray-600 hover:underline"
              onClick={onClose}
            >
              Cancel
            </button> */}
            <button
              className="text-xs text-blue-600 hover:underline font-medium"
              onClick={saveAll}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- UI helpers ---------- */

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-medium text-gray-600">{label}</span>
      {children}
      {error && (
        <span className="text-[11px] text-red-600" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

function Input({
  value,
  onChange,
  error,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  placeholder?: string;
}) {
  return (
    <input
      className={`rounded-md border px-2 py-1 text-xs focus:outline-none ${
        error ? "border-red-500" : "border-gray-300 focus:border-blue-500"
      }`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
