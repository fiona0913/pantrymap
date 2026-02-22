export default function IconOpenContainer({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Open container */}
      <rect x="6" y="10" width="12" height="10" rx="1" fill="#E0E0E0" stroke="#CCCCCC" strokeWidth="0.5" />
      {/* Lid separated */}
      <rect x="5" y="6" width="14" height="3" rx="0.5" fill="#F5F5F5" stroke="#CCCCCC" strokeWidth="0.5" />
      <path d="M5 9 L7 11 M19 9 L17 11" stroke="#CCCCCC" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
