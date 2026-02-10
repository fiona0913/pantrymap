export default function HeroIllustration({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Shopping bag */}
      <path d="M20 30 L20 80 L80 80 L80 30 Z" />
      <path d="M30 30 L30 20 C30 15 35 10 40 10 L60 10 C65 10 70 15 70 20 L70 30" />
      
      {/* Heart */}
      <path d="M50 45 C50 45 40 35 40 30 C40 25 45 20 50 20 C55 20 60 25 60 30 C60 35 50 45 50 45 Z" />
      
      {/* Arrow pointing up */}
      <path d="M50 55 L50 70" />
      <path d="M45 60 L50 55 L55 60" />
    </svg>
  );
}
