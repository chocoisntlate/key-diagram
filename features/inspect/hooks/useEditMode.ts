import { useCallback, useState } from "react";

export function useEditMode() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const enterEditMode = useCallback(() => {
    setIsEditMode(true);
  }, []);

  const exitEditMode = useCallback(() => {
    setIsEditMode(false);
    setEditingIndex(null);
  }, []);

  const setEditing = useCallback((index: number | null) => {
    setEditingIndex(index);
  }, []);

  const collapseEdit = useCallback(() => {
    setEditingIndex(null);
  }, []);

  return {
    isEditMode,
    editingIndex,
    enterEditMode,
    exitEditMode,
    setEditing,
    collapseEdit,
  };
}
