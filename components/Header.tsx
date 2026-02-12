"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const navItems = [
    { href: "/map", label: "Pantry Map" },
    { href: "/food-donation-guide", label: "Donation Guide" },
    { href: "/about-us", label: "About Us" },
  ];

  const getNavClassName = (href: string) => {
    const isActive = pathname === href || pathname.startsWith(`${href}/`);

    return `inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 ${
      isActive
        ? "border-emerald-300 bg-emerald-100 text-emerald-800"
        : "border-zinc-200 bg-white text-neutral-900 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
    }`;
  };

  return (
    <header className="border-b border-zinc-200">
      <div className="flex w-full flex-wrap items-center justify-between gap-4 py-5 pl-6 pr-6">
        <div className="text-3xl font-semibold">🌿 Pantry Map</div>
        <nav className="ml-auto flex flex-wrap items-center justify-end gap-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={getNavClassName(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
