export type CategoryColor = "green" | "yellow" | "red";
export type StorageType = "fridge" | "freezer" | "pantry" | "none";

export interface SubCategory {
  id: string;
  title: string;
  icon: string;
  examples: string[];
  considerations: string;
  storage: StorageType;
}

export interface Category {
  id: string;
  name: string;
  color: CategoryColor;
  subcategories: SubCategory[];
}

export interface SearchableItem {
  name: string;
  categoryId: string;
  parentItem?: string;
}

export interface FoodsData {
  categories: Category[];
  searchableItems: SearchableItem[];
}
