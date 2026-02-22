export default function IconProduce({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Carrot */}
      <path d="M8 20 L12 6 L16 20 Z" fill="#FF8C00" />
      <path d="M12 6 L12 2" stroke="#228B22" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 2 L11 1 L13 1 Z" fill="#228B22" />
    </svg>
  );
}
