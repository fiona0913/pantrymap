import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 relative">
      <div className="flex w-full items-center py-5 pl-6 pr-6">
        <div className="text-3xl font-semibold">🌿 Pantry Map</div>
        <nav className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-6 text-sm font-medium">
          <Link href="/map" className="hover:text-emerald-700 transition-colors">
            Pantry Map
          </Link>
          <Link href="/food-donation-guide" className="hover:text-emerald-700 transition-colors">
            Donation Guide
          </Link>
          <Link href="/about-us" className="hover:text-emerald-700 transition-colors">
            About Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
