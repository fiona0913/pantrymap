"use client";

import {
  FoodsData,
  SearchableItem,
  SubCategory,
} from "@/components/donation-guide/types/foods";

interface SearchResultsProps {
  results: SearchableItem[];
  foodsData: FoodsData;
  onSelect: (item: SearchableItem) => void;
  isClosing?: boolean;
}

export default function SearchResults({
  results,
  foodsData,
  onSelect,
  isClosing = false,
}: SearchResultsProps) {
  const getCategoryColor = (categoryId: string) => {
    const category = foodsData.categories.find((cat) => cat.id === categoryId);
    if (!category) return "gray";
    return category.color;
  };

  const getCategoryName = (categoryId: string) => {
    const category = foodsData.categories.find((cat) => cat.id === categoryId);
    return category?.name || "";
  };

  const getSubcategory = (item: SearchableItem): SubCategory | null => {
    if (!item.parentItem) return null;
    const category = foodsData.categories.find((cat) => cat.id === item.categoryId);
    if (!category) return null;
    const subcategory = category.subcategories.find((sub) => sub.title === item.parentItem);
    return subcategory || null;
  };

  const getConsiderationParts = (considerations: string): string[] => {
    if (!considerations) return [];
    const noteIndex = considerations.indexOf("Note:");
    if (noteIndex === -1) {
      const firstSentence = considerations.split(/[.!?]+/)[0].trim();
      return [firstSentence || considerations].filter(Boolean);
    }
    const main = considerations.slice(0, noteIndex).trim().replace(/\.$/, "");
    const note = considerations.slice(noteIndex).trim();
    return [main, note].filter(Boolean);
  };

  const getStorageLabel = (storage: string): string => {
    const storageMap: { [key: string]: string } = {
      pantry: "Pantry",
      fridge: "Refrigerator",
      freezer: "Freezer",
      none: "N/A",
    };
    return storageMap[storage] || "N/A";
  };

  const borderColors = {
    green: "border-l-green-500",
    yellow: "border-l-yellow-500",
    red: "border-l-red-500",
    gray: "border-l-gray-400",
  };

  const categoryBadgeColors = {
    green: "bg-green-600 text-white",
    yellow: "bg-yellow-600 text-white",
    red: "bg-red-600 text-white",
    gray: "bg-gray-600 text-white",
  };

  if (results.length === 0) {
    return (
      <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
        <p className="text-gray-500 text-center">No matches found</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      {results.map((item, index) => {
        const color = getCategoryColor(item.categoryId);
        const categoryName = getCategoryName(item.categoryId);
        const subcategory = getSubcategory(item);
        const considerations = subcategory?.considerations || "";
        const considerationParts = getConsiderationParts(considerations);
        const storage = subcategory?.storage || "none";
        const storageLabel = getStorageLabel(storage);

        return (
          <button
            key={index}
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(item);
            }}
            className={`w-full text-left p-4 border-l-4 ${borderColors[color as keyof typeof borderColors] || borderColors.gray} border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              color === "green" ? "focus:ring-green-500" :
              color === "yellow" ? "focus:ring-yellow-500" : "focus:ring-red-500"
            }`}
          >
            <div className="flex-1">
              {/* Item name and status badge */}
              <div className="flex items-center gap-2 mb-3">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${categoryBadgeColors[color as keyof typeof categoryBadgeColors] || categoryBadgeColors.gray}`}
                >
                  {categoryName}
                </span>
              </div>

              {considerationParts.length === 1 && (
                <p className="text-sm text-gray-700 mb-1">
                  <span className="font-semibold">Consideration:</span>{" "}
                  {considerationParts[0]}
                </p>
              )}
              {considerationParts.length > 1 && (
                <div className="text-sm text-gray-700 space-y-1 mb-1">
                  {considerationParts.map((line, idx) => (
                    <p key={idx}>
                      <span className="font-semibold">Consideration:</span>{" "}
                      {line}
                    </p>
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Storage Requirement:</span>{" "}
                {storageLabel}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
