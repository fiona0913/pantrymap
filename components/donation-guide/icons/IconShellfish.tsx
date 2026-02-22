export default function IconShellfish({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Shrimp */}
      <path d="M8 10 C8 8 10 6 12 6 C14 6 16 8 16 10 C16 12 14 14 12 14 C10 14 8 12 8 10 Z" fill="#FFB6C1" />
      <path d="M16 10 L18 9 L18 11 L16 10" fill="#FFB6C1" />
      {/* Tail segments */}
      <ellipse cx="8" cy="12" rx="1.5" ry="2" fill="#FFB6C1" />
      <ellipse cx="6" cy="13" rx="1" ry="1.5" fill="#FFB6C1" />
    </svg>
  );
}
