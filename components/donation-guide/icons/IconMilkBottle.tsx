export default function IconMilkBottle({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Glass milk bottle */}
      <path d="M9 4 L9 20 L15 20 L15 4 Z" fill="#F0F8FF" stroke="#87CEEB" strokeWidth="0.5" />
      <path d="M9 4 L10 2 L14 2 L15 4 Z" fill="#E0F0FF" stroke="#87CEEB" strokeWidth="0.5" />
      {/* Milk level */}
      <rect x="9" y="8" width="6" height="12" fill="#FFFFFF" />
    </svg>
  );
}
