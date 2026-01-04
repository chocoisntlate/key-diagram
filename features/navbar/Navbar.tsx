import Link from "next/link";

export default function Navbar() {
  return (
    <div className="p-4 bg-gray-100 shadow-md">
      <Link className="font-mono" href="/">
        key-diagram
      </Link>
    </div>
  );
}
