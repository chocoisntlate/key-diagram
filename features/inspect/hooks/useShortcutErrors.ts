import { useCallback, useState } from "react";
import { FieldErrors } from "../../diagram/shortcut";

export function useShortcutErrors() {
  const [errors, setErrors] = useState<Record<number, FieldErrors>>({});

  const clearError = useCallback((index: number) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  }, []);

  const setError = useCallback((index: number, error: FieldErrors) => {
    setErrors((prev) => ({ ...prev, [index]: error }));
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const shiftErrorsAfterDelete = useCallback((deletedIndex: number) => {
    setErrors((prev) => {
      const next: Record<number, FieldErrors> = {};
      Object.entries(prev).forEach(([k, v]) => {
        const i = Number(k);
        if (i === deletedIndex) return;
        next[i > deletedIndex ? i - 1 : i] = v;
      });
      return next;
    });
  }, []);

  return {
    errors,
    setErrors,
    clearError,
    setError,
    clearAllErrors,
    shiftErrorsAfterDelete,
  };
}
