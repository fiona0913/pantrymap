"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import SearchBar from "@/components/donation-guide/SearchBar";
import CategoryCard from "@/components/donation-guide/CategoryCard";
import foodsDataRaw from "@/components/donation-guide/data/foods.json";
import { FoodsData } from "@/components/donation-guide/types/foods";

const foodsData = foodsDataRaw as FoodsData;

export default function FoodDonationGuideSearchPage() {
  const router = useRouter();
  const categoryRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const handleResultClick = (_categoryId: string) => {};

  return (
      <main className="relative min-h-screen bg-white">
      <button
        type="button"
        onClick={() => router.push("/food-donation-guide")}
        className="absolute left-6 top-6 z-10 mb-4 inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-emerald-700 transition hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2"
        aria-label="Back to Donation Guide"
      >
        <ChevronLeft className="h-8 w-8" strokeWidth={2.5} />
      </button>
      <div className="bg-white pt-16 pb-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-[2.5rem] font-bold text-green-800 text-center">
              Donation Guide
            </h1>
            <div className="max-w-2xl w-full mt-6 mb-1">
              <SearchBar foodsData={foodsData} onResultClick={handleResultClick} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto transition-all duration-200 ease-out">
          {foodsData.categories.map((category) => (
            <div
              key={category.id}
              ref={(el) => {
                categoryRefs.current[category.id] = el;
              }}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>
      </main>
  );
}
