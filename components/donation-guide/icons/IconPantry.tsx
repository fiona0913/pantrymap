export default function IconPantry({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Box of pasta */}
      <rect x="6" y="8" width="12" height="14" rx="1" fill="#F5DEB3" stroke="#D3D3D3" strokeWidth="0.5" />
      <rect x="5" y="7" width="14" height="2" rx="0.5" fill="#DEB887" stroke="#D3D3D3" strokeWidth="0.5" />
      {/* Pasta strands visible */}
      <line x1="8" y1="12" x2="16" y2="12" stroke="#FFD700" strokeWidth="1.5" />
      <line x1="8" y1="15" x2="16" y2="15" stroke="#FFD700" strokeWidth="1.5" />
      <line x1="8" y1="18" x2="16" y2="18" stroke="#FFD700" strokeWidth="1.5" />
    </svg>
  );
}
