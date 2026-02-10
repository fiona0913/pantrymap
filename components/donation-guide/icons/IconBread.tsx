export default function IconBread({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Toast slice with cut marks */}
      <rect x="8" y="4" width="8" height="16" rx="1" fill="#D2B48C" />
      {/* Cut marks */}
      <line x1="10" y1="8" x2="14" y2="8" stroke="#8B6914" strokeWidth="1" />
      <line x1="10" y1="12" x2="14" y2="12" stroke="#8B6914" strokeWidth="1" />
      <line x1="10" y1="16" x2="14" y2="16" stroke="#8B6914" strokeWidth="1" />
    </svg>
  );
}
