// features/diagrams/shortcut.validate.ts

import { Shortcut, ShortcutSchema } from "../spec/diagramSchema";
import { Layout } from "../spec/layoutSchema";

/* ---------- Types ---------- */

export type EditableShortcut = {
  displayKey: string;
  keys: string; // e.g. "ctrl shift t"
  description: string; // multiline text
  tags?: string; // space or comma separated
};

export type FieldErrors = {
  displayKey?: string;
  keys?: string;
  description?: string;
  tags?: string;
};

export type ValidationResult =
  | { success: true; data: Shortcut }
  | { success: false; errors: FieldErrors };

/* ---------- Helpers ---------- */

export function getValidKeyIds(layout: Layout): Set<string> {
  return new Set(
    layout.rows
      .flat()
      .map((k) => k.id)
      .filter((id): id is string => Boolean(id)),
  );
}

/* ---------- Normalization ---------- */

export function normalizeShortcut(input: EditableShortcut): Shortcut {
  const keys = input.keys
    .split(/[+\s]+/)
    .map((k) => k.trim())
    .filter(Boolean)
    .slice(0, 5);

  const tags = input.tags
    ?.split(/[,\s]+/)
    .map((t) => t.trim())
    .filter(Boolean);

  return {
    displayKey: input.displayKey,
    keys,
    description: input.description
      .split("\n")
      .map((d) => d.trim())
      .filter(Boolean),
    tags: tags && tags.length > 0 ? tags : undefined,
  };
}

/* ---------- Validation ---------- */

export function validateShortcut(
  input: EditableShortcut,
  ctx: {
    index: number;
    draft: EditableShortcut[];
    validKeyIds: Set<string>;
  },
): ValidationResult {
  const normalized = normalizeShortcut(input);

  /* key existence */
  const invalidKey = normalized.keys.find((k) => !ctx.validKeyIds.has(k));
  if (invalidKey) {
    return {
      success: false,
      errors: {
        keys: `Unknown key ID: "${invalidKey}"`,
      },
    };
  }

  /* duplicates */
  const keysString = normalized.keys.slice().sort().join("+");
  const duplicateIndex = ctx.draft.findIndex((s, i) => {
    if (i === ctx.index) return false;
    const other = normalizeShortcut(s);
    return (
      other.displayKey === normalized.displayKey &&
      other.keys.slice().sort().join("+") === keysString
    );
  });

  if (duplicateIndex !== -1) {
    return {
      success: false,
      errors: {
        keys: `Duplicate keybind (entry #${duplicateIndex + 1})`,
      },
    };
  }

  /* schema */
  const parsed = ShortcutSchema.safeParse(normalized);
  if (!parsed.success) {
    const errors: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof FieldErrors;
      errors[field] = issue.message;
    }
    return { success: false, errors };
  }

  return { success: true, data: normalized };
}
