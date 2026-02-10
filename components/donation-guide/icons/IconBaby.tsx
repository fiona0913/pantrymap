export default function IconBaby({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Baby food jar - distinct from bottle */}
      <rect x="7" y="6" width="10" height="14" rx="1" fill="#FFE4B5" stroke="#D3D3D3" strokeWidth="0.5" />
      <rect x="6" y="4" width="12" height="3" rx="0.5" fill="#F5DEB3" stroke="#D3D3D3" strokeWidth="0.5" />
      {/* Baby food inside */}
      <circle cx="12" cy="12" r="3" fill="#FFD700" />
    </svg>
  );
}
