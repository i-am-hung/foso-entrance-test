import type { Category } from "@/types/categories";
import { products } from "./products";

const featuredProducts = products.filter((product) => product.isFeatured);

const airFilterProducts = featuredProducts.filter(
  (p) =>
    p.name.toLowerCase().includes("lọc gió") ||
    p.name.toLowerCase().includes("air filter")
);

const waterFilterProducts = featuredProducts.filter(
  (p) =>
    p.name.toLowerCase().includes("lọc nước") ||
    p.name.toLowerCase().includes("water filter")
);

const oilFilterProducts = featuredProducts.filter(
  (p) =>
    p.name.toLowerCase().includes("lọc dầu") ||
    p.name.toLowerCase().includes("oil filter") ||
    p.name.toLowerCase().includes("lọc nhớt")
);

const fuelFilterProducts = featuredProducts.filter(
  (p) =>
    p.name.toLowerCase().includes("lọc nhiên liệu") ||
    p.name.toLowerCase().includes("fuel filter")
);

export const categories: Category[] = [
  {
    id: "1",
    name: "Lọc gió động cơ - Air Filter",
    image: "/images/prod1.jpg",
    subcategories: [
      {
        id: "1.1",
        name: "Máy lọc gió động cơ",
        image: "/images/prod1.jpg",
      },
      { id: "1.2", name: "Lõi lọc", image: "/images/prod1.jpg" },
      {
        id: "1.3",
        name: "Bình lọc gió động cơ",
        image: "/images/prod1.jpg",
      },
      {
        id: "1.4",
        name: "Bình lọc gió động cơ",
        image: "/images/prod1.jpg",
      },
      {
        id: "1.5",
        name: "Bình lọc gió động cơ",
        image: "/images/prod1.jpg",
      },
      {
        id: "1.6",
        name: "Bình lọc gió động cơ",
        image: "/images/prod1.jpg",
      },
    ],
    featuredProducts: airFilterProducts,
  },
  {
    id: "2",
    name: "Lọc nhiên liệu - Fuel Filter",
    image: "/images/prod2.png",
    subcategories: [
      {
        id: "2.1",
        name: "Lọc nhiên liệu - Fuel Filter",
        image: "/images/prod2.png",
      },
      {
        id: "2.2",
        name: "Lọc nhiên liệu - Fuel Filter",
        image: "/images/prod2.png",
      },
      {
        id: "2.3",
        name: "Lọc nhiên liệu - Fuel Filter",
        image: "/images/prod2.png",
      },
    ],
    featuredProducts: fuelFilterProducts,
  },
  {
    id: "3",
    name: "Bộ lọc dầu - Oil Filter",
    image: "/images/prod3.png",
    subcategories: [
      {
        id: "3.1",
        name: "Bộ lọc dầu - Oil Filter",
        image: "/images/prod3.png",
      },
      {
        id: "3.2",
        name: "Bộ lọc dầu - Oil Filter",
        image: "/images/prod3.png",
      },
    ],
    featuredProducts: oilFilterProducts,
  },
  {
    id: "4",
    name: "Bộ lọc nước - Water Filter",
    image: "/images/prod4.png",
    subcategories: [
      {
        id: "4.1",
        name: "Bộ lọc nước - Water Filter",
        image: "/images/prod4.png",
      },
      {
        id: "4.2",
        name: "Bộ lọc nước - Water Filter",
        image: "/images/prod4.png",
      },
    ],
    featuredProducts: waterFilterProducts,
  },
  {
    id: "5",
    name: "Bộ lọc khí - Air Filter",
    image: "/images/prod5.png",
    subcategories: [
      {
        id: "5.1",
        name: "Bộ lọc khí - Air Filter",
        image: "/images/prod5.png",
      },

      {
        id: "5.2",
        name: "Bộ lọc khí - Air Filter",
        image: "/images/prod5.png",
      },
    ],
    featuredProducts: airFilterProducts.slice(0, 2),
  },
];

export type ServiceItem = {
  icon: string;
  text: string;
};

export const serviceItems = [
  {
    icon: "clock",
    text: "Hỗ trợ 24/7",
  },
  {
    icon: "truck",
    text: "Miễn Phí Vận Chuyển",
  },
  {
    icon: "truck-delivery",
    text: "Giao Hàng Nhanh 2h",
  },
  {
    icon: "rotate-cw",
    text: "30 Ngày Đổi Trả",
  },
];
