export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
  creationAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  creationAt: string;
  updatedAt: string;
};

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "newest"
  | "oldest";

export type ProductFilter = {
  search: string;
  minPrice?: number;
  maxPrice?: number;
  category: string;
  // sort: SortOption;
};


export interface Review {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string; // ISO date
  title: string;
  body: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface RatingBreakdown {
  star: number;
  percentage: number;
}

export interface RatingSummary {
  average: number;
  count: number;
}