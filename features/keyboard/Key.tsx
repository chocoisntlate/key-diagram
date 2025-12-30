interface KeyProps {
  label: string;
  width?: number;
  active?: boolean;
}

export function Key({ label, width = 1, active = false }: KeyProps) {
  return (
    <div
      style={{ flex: width }}
      className={[
        "h-10 flex items-center justify-center",
        "border rounded text-sm select-none",
        active
          ? "bg-black text-white border-black"
          : "bg-white text-black border-gray-300"
      ].join(" ")}
    >
      {label}
    </div>
  );
}
