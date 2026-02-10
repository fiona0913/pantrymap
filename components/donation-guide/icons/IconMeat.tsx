export default function IconMeat({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Steak cut - clear meat shape */}
      <path d="M6 8 C6 6 8 4 10 4 L14 4 C16 4 18 6 18 8 L18 14 C18 16 16 18 14 18 L10 18 C8 18 6 16 6 14 Z" fill="#8B0000" />
      {/* Bone at top */}
      <ellipse cx="12" cy="6" rx="1.5" ry="2.5" fill="#FFFFFF" />
    </svg>
  );
}
