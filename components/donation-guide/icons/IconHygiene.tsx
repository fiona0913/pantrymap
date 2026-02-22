export default function IconHygiene({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Soap bar */}
      <rect x="7" y="6" width="10" height="14" rx="1" fill="#FFE4B5" stroke="#D3D3D3" strokeWidth="0.5" />
      {/* Soap texture lines */}
      <line x1="9" y1="10" x2="15" y2="10" stroke="#DEB887" strokeWidth="0.5" />
      <line x1="9" y1="14" x2="15" y2="14" stroke="#DEB887" strokeWidth="0.5" />
    </svg>
  );
}
