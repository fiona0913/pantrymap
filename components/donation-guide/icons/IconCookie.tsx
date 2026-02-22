export default function IconCookie({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Cookie */}
      <circle cx="12" cy="12" r="8" fill="#D2B48C" />
      {/* Chocolate chips */}
      <circle cx="9" cy="10" r="1.5" fill="#8B4513" />
      <circle cx="15" cy="10" r="1.5" fill="#8B4513" />
      <circle cx="12" cy="12" r="1.5" fill="#8B4513" />
      <circle cx="9" cy="14" r="1.5" fill="#8B4513" />
      <circle cx="15" cy="14" r="1.5" fill="#8B4513" />
    </svg>
  );
}
