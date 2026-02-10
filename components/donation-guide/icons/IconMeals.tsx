export default function IconMeals({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Takeout container with divided sections */}
      <rect x="5" y="6" width="14" height="14" rx="1" fill="#FFFFFF" stroke="#CCCCCC" strokeWidth="0.5" />
      <path d="M5 6 L12 4 L19 6" fill="#E0E0E0" stroke="#CCCCCC" strokeWidth="0.5" />
      {/* Divider lines */}
      <line x1="12" y1="6" x2="12" y2="20" stroke="#CCCCCC" strokeWidth="0.5" />
      <line x1="5" y1="12" x2="19" y2="12" stroke="#CCCCCC" strokeWidth="0.5" />
      {/* Food in sections */}
      <circle cx="8.5" cy="9" r="1.5" fill="#8B4513" />
      <circle cx="15.5" cy="9" r="1.5" fill="#8B4513" />
      <circle cx="8.5" cy="16" r="1.5" fill="#8B4513" />
      <circle cx="15.5" cy="16" r="1.5" fill="#8B4513" />
    </svg>
  );
}
