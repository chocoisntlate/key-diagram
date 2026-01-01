"use client";


import { useRef } from "react";

type ImportExportButtonProps = {
  title: string;
  onClick?: () => void;
  onFileSelect?: (file: File) => void;
};

export function ImportExportButton({ title, onClick, onFileSelect }: ImportExportButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (onFileSelect) {
      fileInputRef.current?.click(); // trigger file picker
    } else {
      onClick?.(); // normal action
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) onFileSelect(file);
  };

  return (
    <>
      <button
        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        onClick={handleClick}
      >
        {title}
      </button>
      {onFileSelect && (
        <input
          type="file"
        accept=".json,application/json"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      )}
    </>
  );
}