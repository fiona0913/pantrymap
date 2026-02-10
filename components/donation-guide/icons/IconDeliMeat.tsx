export default function IconDeliMeat({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Stacked deli meat slices */}
      <ellipse cx="12" cy="10" rx="6" ry="2" fill="#CD5C5C" />
      <ellipse cx="12" cy="13" rx="6" ry="2" fill="#DC143C" />
      <ellipse cx="12" cy="16" rx="6" ry="2" fill="#CD5C5C" />
    </svg>
  );
}
