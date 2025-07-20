import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

const brands = [
  ...new Set(products.map((p) => p.brand).filter(Boolean)),
] as string[];
const origins = [
  ...new Set(products.map((p) => p.origin).filter(Boolean)),
] as string[];
const years = [...new Set(products.map((p) => p.year).filter(Boolean))].sort(
  (a, b) => (b as number) - (a as number)
) as number[];

const priceRanges = [
  "Dưới 100.000 đ",
  "100.000 – 300.000 đ",
  "300.000 – 500.000 đ",
  "500.000 - 1.000.000 đ",
  "Trên 1.000.000 đ",
];

const productFeatures = [
  { id: "isHotDeal", label: "Giá cực sốc" },
  { id: "isFeatured", label: "Sản phẩm nổi bật" },
];

type Option = string | number | null;

interface OptionListProps<T extends Option> {
  options: T[];
  onOptionChange: (option: T, checked: boolean) => void;
  selectedOptions: T[];
}

function OptionList<T extends Option>({
  options,
  onOptionChange,
  selectedOptions,
}: OptionListProps<T>) {
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={String(opt)} className="flex items-center gap-2 text-sm">
          <Checkbox
            id={"opt-" + opt}
            checked={selectedOptions.includes(opt)}
            onCheckedChange={(checked) => {
              onOptionChange(opt, !!checked);
            }}
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
}

interface ProductFiltersProps {
  onCategoryChange: (categoryId: string, checked: boolean) => void;
  onBrandChange: (brand: string, checked: boolean) => void;
  onYearChange: (year: number, checked: boolean) => void;
  onOriginChange: (origin: string, checked: boolean) => void;
  onPriceRangeChange: (priceRange: string, checked: boolean) => void;
  onFeatureChange: (feature: string, checked: boolean) => void;
  selectedCategories: string[];
  selectedBrands: string[];
  selectedYears: number[];
  selectedOrigins: string[];
  selectedPriceRanges: string[];
  selectedFeatures: string[];
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onCategoryChange,
  onBrandChange,
  onYearChange,
  onOriginChange,
  onPriceRangeChange,
  onFeatureChange,
  selectedCategories = [],
  selectedBrands = [],
  selectedYears = [],
  selectedOrigins = [],
  selectedPriceRanges = [],
  selectedFeatures = [],
}) => {
  return (
    <aside className="w-64 bg-white p-4 rounded-lg border">
      <h2 className="text-lg font-bold mb-4">Bộ Lọc</h2>
      <Accordion
        type="multiple"
        defaultValue={["cat", "price", "features"]}
        className="space-y-2"
      >
        <AccordionItem value="cat">
          <AccordionTrigger>Danh mục sản phẩm</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <Checkbox
                    id={"cat-" + category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => {
                      onCategoryChange(category.id, !!checked);
                    }}
                  />
                  <span>{category.name}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger>Khoảng giá</AccordionTrigger>
          <AccordionContent>
            <OptionList
              options={priceRanges}
              onOptionChange={onPriceRangeChange}
              selectedOptions={selectedPriceRanges}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="features">
          <AccordionTrigger>Đặc điểm</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {productFeatures.map((feature) => (
                <label
                  key={feature.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <Checkbox
                    id={feature.id}
                    checked={selectedFeatures.includes(feature.id)}
                    onCheckedChange={(checked) => {
                      onFeatureChange(feature.id, !!checked);
                    }}
                  />
                  <span>{feature.label}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brand">
          <AccordionTrigger>Thương hiệu</AccordionTrigger>
          <AccordionContent>
            <OptionList
              options={brands}
              onOptionChange={onBrandChange}
              selectedOptions={selectedBrands}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="year">
          <AccordionTrigger>Năm sản xuất</AccordionTrigger>
          <AccordionContent>
            <OptionList
              options={years}
              onOptionChange={onYearChange}
              selectedOptions={selectedYears}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="origin">
          <AccordionTrigger>Xuất xứ</AccordionTrigger>
          <AccordionContent>
            <OptionList
              options={origins}
              onOptionChange={onOriginChange}
              selectedOptions={selectedOrigins}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

export default ProductFilters;
