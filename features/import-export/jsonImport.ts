import { KeyDiagramDocument, KeyDiagramSchema } from "../spec/schema";

export type ImportResult =
  | { success: true; data: KeyDiagramDocument }
  | { success: false; error: string };

export function importKeyDiaJSON(raw: string): ImportResult {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return {
      success: false,
      error: "Invalid JSON file",
    };
  }

  const result = KeyDiagramSchema.safeParse(parsed);

  if (!result.success) {
    return {
      success: false,
      error: result.error.issues
        .map(e => `${e.path.join(".")}: ${e.message}`)
        .join("\n"),
    };
  }

  return {
    success: true,
    data: result.data,
  };
}
