export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  tags?: string[];
  brand?: string;
  year?: number;
  origin?: string;
  isHotDeal?: boolean;
  isFeatured?: boolean;
}
