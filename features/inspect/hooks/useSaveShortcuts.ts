import { useCallback } from "react";
import { Shortcut } from "../../spec/diagramSchema";
import { useKeyboard } from "../../keyboard/KeyboardContext";
import {
  EditableShortcut,
  FieldErrors,
  validateShortcut,
} from "../../diagram/shortcut";

type ValidationResult = {
  errors: Record<number, FieldErrors>;
  valid: Shortcut[];
  hasErrors: boolean;
};

export function useSaveShortcuts(
  draft: EditableShortcut[],
  validKeyIds: string[],
  keyId: string,
) {
  const { setKeyDiagram } = useKeyboard();

  const validate = useCallback((): ValidationResult => {
    const errors: Record<number, FieldErrors> = {};
    const valid: Shortcut[] = [];

    draft.forEach((s, index) => {
      const res = validateShortcut(s, {
        index,
        draft,
        validKeyIds: new Set(validKeyIds),
      });

      if (!res.success) {
        errors[index] = res.errors;
      } else {
        valid.push(res.data);
      }
    });

    return {
      errors,
      valid,
      hasErrors: Object.keys(errors).length > 0,
    };
  }, [draft, validKeyIds]);

  const save = useCallback(
    (validShortcuts: Shortcut[]) => {
      setKeyDiagram((d: any) => ({
        ...d,
        shortcuts: [
          ...d.shortcuts.filter((s: Shortcut) => s.displayKey !== keyId),
          ...validShortcuts,
        ],
      }));
    },
    [setKeyDiagram, keyId],
  );

  return { validate, save };
}
