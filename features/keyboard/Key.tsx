type KeyProps = {
  label: string;
  width: number;
  unit: number;
};

export function Key({ label, width, unit }: KeyProps) {
  return (
    <button
      type="button"
      className={[
        "relative border rounded text-xs px-3 flex-none",
        "focus:outline-none focus:ring-2 focus:ring-blue-500",
        "transition-colors select-none",
      ].join(" ")}
      style={{
        width: width + "px",
        height: unit + "px",
      }}
    >
      <span className="absolute top-1 left-1">{label}</span>
    </button>
  );
}
