"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Review" },
  { href: "/cards", label: "Cards" },
  { href: "/habit", label: "Habit" },
];

export function Nav() {
  const path = usePathname();
  return (
    <nav className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 flex gap-1 h-12 items-center">
        <span className="text-zinc-100 font-semibold mr-4 text-sm tracking-tight">Deutsch 🇩🇪</span>
        {LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              path === href
                ? "bg-zinc-700 text-zinc-100"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
