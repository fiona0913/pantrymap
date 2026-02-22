export default function IconFrozen({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Frozen veggie bag */}
      <path d="M6 8 L6 20 L18 20 L18 8 Z" fill="#E0F7FA" stroke="#B0E0E6" strokeWidth="0.5" />
      <path d="M6 8 Q12 6 18 8" fill="#B0E0E6" stroke="#87CEEB" strokeWidth="0.5" />
      {/* Peas/corn inside */}
      <circle cx="9" cy="12" r="1.5" fill="#90EE90" />
      <circle cx="12" cy="12" r="1.5" fill="#90EE90" />
      <circle cx="15" cy="12" r="1.5" fill="#90EE90" />
      <circle cx="9" cy="16" r="1.5" fill="#90EE90" />
      <circle cx="12" cy="16" r="1.5" fill="#90EE90" />
      <circle cx="15" cy="16" r="1.5" fill="#90EE90" />
      {/* Small snowflake */}
      <path d="M18 10 L19 10 M18.5 9.5 L18.5 10.5 M17.5 9.5 L19.5 10.5 M19.5 9.5 L17.5 10.5" stroke="#87CEEB" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}
