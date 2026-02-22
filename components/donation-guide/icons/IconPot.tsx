export default function IconPot({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Cooking pot */}
      <path d="M8 8 L8 18 L16 18 L16 8 Z" fill="#C0C0C0" stroke="#808080" strokeWidth="0.5" />
      <ellipse cx="12" cy="18" rx="4" ry="1" fill="#A0A0A0" />
      {/* Handles */}
      <path d="M6 10 Q4 10 4 12 Q4 14 6 14" fill="none" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 10 Q20 10 20 12 Q20 14 18 14" fill="none" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" />
      {/* Steam lines */}
      <line x1="10" y1="6" x2="10" y2="4" stroke="#E0E0E0" strokeWidth="1" strokeLinecap="round" />
      <line x1="12" y1="6" x2="12" y2="3" stroke="#E0E0E0" strokeWidth="1" strokeLinecap="round" />
      <line x1="14" y1="6" x2="14" y2="4" stroke="#E0E0E0" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
