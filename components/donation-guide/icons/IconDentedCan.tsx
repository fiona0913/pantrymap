export default function IconDentedCan({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Metal can with dent */}
      <rect x="7" y="5" width="10" height="15" rx="1" fill="#C0C0C0" />
      <ellipse cx="12" cy="5" rx="5" ry="1.5" fill="#A0A0A0" />
      {/* Dent */}
      <path d="M10 8 Q11 7 12 8 Q13 9 12 10 Q11 9 10 8" fill="#808080" />
      {/* Rust spot */}
      <circle cx="14" cy="12" r="1.5" fill="#8B4513" />
    </svg>
  );
}
