import { text } from "stream/consumers";
import { ShortcutSchema } from "../spec/keybindSchema";

type KeyProps = {
  label: string;
  width: number;
  unit: number;
  description?: string;

  onClick: () => void;
  isPressed: boolean;
};

export function Key({ label, width, unit, description, onClick, isPressed }: KeyProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative flex items-center justify-center",
        "rounded-md border",
        "text-xs font-medium",
        "shadow-sm",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
        "transition-all select-none flex-none",
        isPressed 
          ? "bg-blue-500 border-blue-600 text-white shadow-inner"
          : "border-gray-300 text-gray-800 hover:bg-gray-100 active:bg-gray-200"
      ].join(" ")}
      style={{
        width: width + "px",
        height: unit + "px",
      }}
    >
      <span className="absolute top-1 left-1">{label}</span>
      {description && 
        <span className="description">{description}</span>
      } 
    </button>
  );
}