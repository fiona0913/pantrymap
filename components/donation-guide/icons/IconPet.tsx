export default function IconPet({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Pet bowl */}
      <ellipse cx="12" cy="18" rx="8" ry="2" fill="#F5F5DC" stroke="#D3D3D3" strokeWidth="0.5" />
      <path d="M4 18 L4 14 Q4 12 6 12 L18 12 Q20 12 20 14 L20 18 Z" fill="#FFF8DC" stroke="#D3D3D3" strokeWidth="0.5" />
      {/* Bone mark */}
      <path d="M10 15 L14 15 M12 13 L12 17" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
