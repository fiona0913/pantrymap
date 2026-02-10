"use client";

import { SubCategory } from "@/components/donation-guide/types/foods";
import { DonationIcon } from "@/components/donation-guide/icons";

interface SubCategoryCardProps {
  subcategory: SubCategory;
  categoryColor: "green" | "yellow" | "red";
  onClick: () => void;
}

export default function SubCategoryCard({
  subcategory,
  categoryColor,
  onClick,
}: SubCategoryCardProps) {
  const colorClasses = {
    green: "border-green-300 hover:border-green-500 hover:bg-green-100",
    yellow: "border-yellow-300 hover:border-yellow-500 hover:bg-yellow-100",
    red: "border-red-300 hover:border-red-500 hover:bg-red-100",
  };

  // Convert to Title Case for display only
  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 border-2 rounded-lg bg-white transition-all hover:shadow-md hover:-translate-y-[1px] ${colorClasses[categoryColor]} cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        categoryColor === "green" ? "focus-visible:ring-green-500" :
        categoryColor === "yellow" ? "focus-visible:ring-yellow-500" : "focus-visible:ring-red-500"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="transition-transform hover:scale-105">
          <DonationIcon iconKey={subcategory.icon} className="w-8 h-8" />
        </div>
        <h3 className="font-semibold text-gray-900 text-sm text-center">
          {toTitleCase(subcategory.title)}
        </h3>
      </div>
    </button>
  );
}
