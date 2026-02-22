export default function IconHomeCanned({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Mason jar with lid - distinct from metal can */}
      <rect x="7" y="6" width="10" height="14" rx="0.5" fill="#FFE4B5" stroke="#D3D3D3" strokeWidth="0.5" />
      {/* Glass jar rim */}
      <rect x="6" y="4" width="12" height="3" rx="0.5" fill="#F5DEB3" stroke="#D3D3D3" strokeWidth="0.5" />
      {/* Lid detail */}
      <line x1="7" y1="5" x2="17" y2="5" stroke="#8B4513" strokeWidth="0.5" />
      {/* Preserved contents */}
      <circle cx="12" cy="12" r="3" fill="#DC143C" />
    </svg>
  );
}
