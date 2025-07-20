import type { Product } from "./product";

export interface Category {
  id: string;
  name: string;
  image?: string;
  subcategories: { id: string; name: string; image?: string }[];
  featuredProducts?: Product[];
}
