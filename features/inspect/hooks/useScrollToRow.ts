import { useCallback, useRef } from "react";

export function useScrollToRow() {
  const rowRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const scrollToRow = useCallback((index: number, focusInput = false) => {
    requestAnimationFrame(() => {
      const row = rowRefs.current.get(index);
      if (!row) return;

      row.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      if (focusInput) {
        row.querySelector("input")?.focus();
      }
    });
  }, []);

  const setRowRef = useCallback((index: number, el: HTMLDivElement | null) => {
    if (el) {
      rowRefs.current.set(index, el);
    } else {
      rowRefs.current.delete(index);
    }
  }, []);

  return { rowRefs, scrollToRow, setRowRef };
}
