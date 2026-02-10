export default function IconHomemadeFood({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Plate */}
      <ellipse cx="12" cy="18" rx="8" ry="1.5" fill="#F5F5DC" stroke="#D3D3D3" strokeWidth="0.5" />
      {/* Food on plate */}
      <circle cx="10" cy="14" r="2.5" fill="#8B4513" />
      <circle cx="14" cy="14" r="2.5" fill="#8B4513" />
      <circle cx="12" cy="11" r="2" fill="#8B4513" />
      {/* Steam lines */}
      <line x1="9" y1="8" x2="9" y2="6" stroke="#E0E0E0" strokeWidth="1" strokeLinecap="round" />
      <line x1="12" y1="8" x2="12" y2="5" stroke="#E0E0E0" strokeWidth="1" strokeLinecap="round" />
      <line x1="15" y1="8" x2="15" y2="6" stroke="#E0E0E0" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
