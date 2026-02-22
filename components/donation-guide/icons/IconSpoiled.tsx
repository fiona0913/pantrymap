export default function IconSpoiled({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Banana shape */}
      <path d="M8 6 C8 4 9 3 10 3 C11 3 12 4 12 6 L12 18 C12 20 11 21 10 21 C9 21 8 20 8 18 Z" fill="#FFD700" />
      {/* Green mold spot */}
      <circle cx="10" cy="12" r="2.5" fill="#90EE90" />
      <circle cx="10" cy="12" r="1.5" fill="#228B22" />
    </svg>
  );
}
