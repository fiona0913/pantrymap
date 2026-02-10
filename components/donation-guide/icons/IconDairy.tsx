export default function IconDairy({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Egg carton with 6 eggs */}
      <rect x="5" y="8" width="14" height="12" rx="1" fill="#F5F5DC" stroke="#D3D3D3" strokeWidth="0.5" />
      <path d="M5 8 Q12 6 19 8" fill="#E0E0E0" stroke="#D3D3D3" strokeWidth="0.5" />
      {/* Eggs */}
      <ellipse cx="8" cy="12" rx="2" ry="2.5" fill="#FFFFFF" stroke="#D3D3D3" strokeWidth="0.5" />
      <ellipse cx="12" cy="12" rx="2" ry="2.5" fill="#FFFFFF" stroke="#D3D3D3" strokeWidth="0.5" />
      <ellipse cx="16" cy="12" rx="2" ry="2.5" fill="#FFFFFF" stroke="#D3D3D3" strokeWidth="0.5" />
      <ellipse cx="8" cy="17" rx="2" ry="2.5" fill="#FFFFFF" stroke="#D3D3D3" strokeWidth="0.5" />
      <ellipse cx="12" cy="17" rx="2" ry="2.5" fill="#FFFFFF" stroke="#D3D3D3" strokeWidth="0.5" />
      <ellipse cx="16" cy="17" rx="2" ry="2.5" fill="#FFFFFF" stroke="#D3D3D3" strokeWidth="0.5" />
    </svg>
  );
}
