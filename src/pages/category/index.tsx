import React, { useState, useEffect, useRef, useCallback } from "react";
import { SlidersHorizontal, X, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumb from "@/components/ui/breadcrumb";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import ProductCard from "@/components/product/ProductCard";
import ProductFilters from "@/pages/category/components/ProductFilters";
import HeroSection from "@/components/product/HeroSection";
import MobileProductFilters from "@/pages/category/components/MobileProductFilters";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Product } from "@/types/product";

interface FilterItem {
  type: string;
  value: string;
}

const ProductListPage: React.FC = () => {
  const sortOptions = ["Liên quan", "Bán chạy", "Mới nhất", "Nổi bật"] as const;
  const [sortBy, setSortBy] = useState<(typeof sortOptions)[number]>(
    sortOptions[0]
  );
  const [priceSort, setPriceSort] = useState<"asc" | "desc">("asc");
  const [filterOpen, setFilterOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Add pagination states
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const ITEMS_PER_PAGE = 8;

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, categoryId]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
    }
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands((prev) => [...prev, brand]);
    } else {
      setSelectedBrands((prev) => prev.filter((b) => b !== brand));
    }
  };

  const handleYearChange = (year: number, checked: boolean) => {
    if (checked) {
      setSelectedYears((prev) => [...prev, year]);
    } else {
      setSelectedYears((prev) => prev.filter((y) => y !== year));
    }
  };

  const handleOriginChange = (origin: string, checked: boolean) => {
    if (checked) {
      setSelectedOrigins((prev) => [...prev, origin]);
    } else {
      setSelectedOrigins((prev) => prev.filter((o) => o !== origin));
    }
  };

  const handlePriceRangeChange = (range: string, checked: boolean) => {
    if (checked) {
      setPriceRanges((prev) => [...prev, range]);
    } else {
      setPriceRanges((prev) => prev.filter((r) => r !== range));
    }
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setSelectedFeatures((prev) => [...prev, feature]);
    } else {
      setSelectedFeatures((prev) => prev.filter((f) => f !== feature));
    }
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedYears([]);
    setSelectedOrigins([]);
    setPriceRanges([]);
    setSelectedFeatures([]);
  };

  const getCategoryName = (id: string): string => {
    const category = categories.find((c) => c.id === id);
    return category ? category.name : id;
  };

  const getFeatureName = (feature: string): string => {
    switch (feature) {
      case "isHotDeal":
        return "Giá cực sốc";
      case "isFeatured":
        return "Sản phẩm nổi bật";
      default:
        return feature;
    }
  };

  const FiltersApplied = () => {
    const activeFilters: FilterItem[] = [];

    selectedCategories.forEach((cat) => {
      activeFilters.push({
        type: "Danh mục",
        value: getCategoryName(cat),
      });
    });

    selectedBrands.forEach((brand) => {
      activeFilters.push({
        type: "Thương hiệu",
        value: brand,
      });
    });

    selectedYears.forEach((year) => {
      activeFilters.push({
        type: "Năm",
        value: year.toString(),
      });
    });

    selectedOrigins.forEach((origin) => {
      activeFilters.push({
        type: "Xuất xứ",
        value: origin,
      });
    });

    priceRanges.forEach((range) => {
      activeFilters.push({
        type: "Giá",
        value: range,
      });
    });

    selectedFeatures.forEach((feature) => {
      activeFilters.push({
        type: "Đặc điểm",
        value: getFeatureName(feature),
      });
    });

    if (activeFilters.length === 0) return null;

    return (
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-500">Bộ lọc đang áp dụng:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={resetFilters}
            className="text-xs h-7"
          >
            Xóa tất cả
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter, index) => (
            <div
              key={index}
              className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs flex items-center gap-1"
            >
              <span className="font-medium">{filter.type}:</span> {filter.value}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Observer for infinite scrolling
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [hasMore, isLoading]
  );

  // Set up Intersection Observer
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) observer.observe(currentLoaderRef);

    return () => {
      if (currentLoaderRef) observer.unobserve(currentLoaderRef);
    };
  }, [handleObserver]);

  // Load more products when page changes
  useEffect(() => {
    if (page === 1) return; // Skip on initial render

    const loadMoreItems = async () => {
      setIsLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newItems = filteredProducts.slice(startIndex, endIndex);

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setDisplayedProducts((prevItems) => [...prevItems, ...newItems]);
      }

      setIsLoading(false);
    };

    loadMoreItems();
  }, [page, filteredProducts]);

  // Reset pagination when filters change
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setDisplayedProducts(filteredProducts.slice(0, ITEMS_PER_PAGE));
    setHasMore(filteredProducts.length > ITEMS_PER_PAGE);
  }, [
    selectedCategories,
    selectedBrands,
    selectedYears,
    selectedOrigins,
    priceRanges,
    selectedFeatures,
    sortBy,
    priceSort,
    filteredProducts,
  ]);

  useEffect(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((product) => {
        for (const categoryId of selectedCategories) {
          const category = categories.find((c) => c.id === categoryId);
          if (category?.featuredProducts?.length) {
            const ids = category.featuredProducts.map((p) => p.id);
            if (ids.includes(product.id)) {
              return true;
            }
          }
        }
        return false;
      });
    }

    if (selectedBrands.length > 0) {
      result = result.filter(
        (product) => product.brand && selectedBrands.includes(product.brand)
      );
    }

    if (selectedYears.length > 0) {
      result = result.filter(
        (product) => product.year && selectedYears.includes(product.year)
      );
    }

    if (selectedOrigins.length > 0) {
      result = result.filter(
        (product) => product.origin && selectedOrigins.includes(product.origin)
      );
    }

    if (selectedFeatures.length > 0) {
      result = result.filter((product) => {
        for (const feature of selectedFeatures) {
          if (feature === "isHotDeal" && product.isHotDeal) return true;
          if (feature === "isFeatured" && product.isFeatured) return true;
        }
        return false;
      });
    }

    if (priceRanges.length > 0) {
      result = result.filter((product) => {
        for (const range of priceRanges) {
          switch (range) {
            case "Dưới 100.000 đ":
              if (product.price < 100000) return true;
              break;
            case "100.000 – 300.000 đ":
              if (product.price >= 100000 && product.price <= 300000)
                return true;
              break;
            case "300.000 – 500.000 đ":
              if (product.price > 300000 && product.price <= 500000)
                return true;
              break;
            case "500.000 - 1.000.000 đ":
              if (product.price > 500000 && product.price <= 1000000)
                return true;
              break;
            case "Trên 1.000.000 đ":
              if (product.price > 1000000) return true;
              break;
          }
        }
        return false;
      });
    }

    switch (sortBy) {
      case "Bán chạy":
        result.sort((a, b) => (b.isHotDeal ? 1 : 0) - (a.isHotDeal ? 1 : 0));
        break;
      case "Mới nhất":
        result.sort((a, b) => (b.year || 0) - (a.year || 0));
        break;
      case "Nổi bật":
        result.sort(
          (a, b) =>
            (b.isFeatured ? 2 : 0) +
            (b.isHotDeal ? 1 : 0) -
            ((a.isFeatured ? 2 : 0) + (a.isHotDeal ? 1 : 0))
        );
        break;
      default:
        break;
    }

    if (priceSort === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [
    selectedCategories,
    selectedBrands,
    selectedYears,
    selectedOrigins,
    priceRanges,
    selectedFeatures,
    sortBy,
    priceSort,
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: "Sản phẩm" }]} className="mb-6" />

      <HeroSection />

      <div className="flex gap-6">
        <div className="hidden xl:block">
          <ProductFilters
            onCategoryChange={handleCategoryChange}
            onBrandChange={handleBrandChange}
            onYearChange={handleYearChange}
            onOriginChange={handleOriginChange}
            onPriceRangeChange={handlePriceRangeChange}
            onFeatureChange={handleFeatureChange}
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            selectedYears={selectedYears}
            selectedOrigins={selectedOrigins}
            selectedPriceRanges={priceRanges}
            selectedFeatures={selectedFeatures}
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 gap-3">
            <h1 className="text-xl sm:text-2xl font-bold whitespace-nowrap">
              Danh sách sản phẩm ({filteredProducts.length})
            </h1>

            <div className="flex items-center flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => setFilterOpen(true)}
                className="xl:hidden items-center px-3 text-sm"
              >
                <SlidersHorizontal size={16} className="mr-1 h-4 w-4" /> Bộ lọc
                {(selectedCategories.length > 0 ||
                  selectedBrands.length > 0 ||
                  selectedYears.length > 0 ||
                  selectedOrigins.length > 0 ||
                  priceRanges.length > 0 ||
                  selectedFeatures.length > 0) && (
                  <span className="ml-1 bg-blue-500 text-white w-4 h-4 rounded-full text-[10px] flex items-center justify-center">
                    {selectedCategories.length +
                      selectedBrands.length +
                      selectedYears.length +
                      selectedOrigins.length +
                      priceRanges.length +
                      selectedFeatures.length}
                  </span>
                )}
              </Button>

              <div className="lg:hidden items-center justify-center w-28 ">
                <Select
                  value={sortBy}
                  onValueChange={(value) =>
                    setSortBy(value as (typeof sortOptions)[number])
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sắp xếp theo" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="hidden lg:flex items-center lg:mt-0 gap-2">
                <span className="text-sm font-medium">Sắp xếp theo</span>
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSortBy(opt)}
                    className={`relative rounded-lg px-4 py-1.5 text-sm font-medium transition-colors border overflow-visible  ${
                      sortBy === opt
                        ? "border-blue-600 text-blue-600 bg-white"
                        : "border-transparent text-gray-700 hover:bg-slate-100"
                    }`}
                  >
                    {opt}
                    {sortBy === opt && (
                      <>
                        <span className="pointer-events-none absolute top-0 right-0 w-0 h-0 border-t-[24px] border-l-[24px] border-t-blue-600 border-l-transparent rounded-tr-md" />
                        <Check
                          size={11}
                          className="pointer-events-none absolute top-0.5 right-1 text-white"
                        />
                      </>
                    )}
                  </button>
                ))}
              </div>

              <div className="w-32">
                <Select
                  value={priceSort}
                  onValueChange={(value) =>
                    setPriceSort(value as "asc" | "desc")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Giá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Giá tăng dần</SelectItem>
                    <SelectItem value="desc">Giá giảm dần</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <FiltersApplied />

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 bg-white border border-gray-200 rounded-lg">
              <p className="text-lg font-medium text-gray-500 mb-4">
                Không tìm thấy sản phẩm phù hợp
              </p>
              <Button variant="outline" onClick={resetFilters}>
                Xóa bộ lọc
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div
                ref={loaderRef}
                className="flex justify-center items-center py-8"
              >
                {isLoading && (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
                    <span className="text-gray-600">
                      Đang tải thêm sản phẩm...
                    </span>
                  </div>
                )}
                {!hasMore && displayedProducts.length > 0 && !isLoading && (
                  <p className="text-gray-500">Đã hiển thị tất cả sản phẩm</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 overflow-y-auto p-4 flex flex-col"
            >
              <div className="flex items-center justify-between border-b pb-4 mb-4">
                <h2 className="text-lg font-bold">Bộ Lọc</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setFilterOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <MobileProductFilters
                  onCategoryChange={handleCategoryChange}
                  onBrandChange={handleBrandChange}
                  onYearChange={handleYearChange}
                  onOriginChange={handleOriginChange}
                  onPriceRangeChange={handlePriceRangeChange}
                  onFeatureChange={handleFeatureChange}
                  selectedCategories={selectedCategories}
                  selectedBrands={selectedBrands}
                  selectedYears={selectedYears}
                  selectedOrigins={selectedOrigins}
                  selectedPriceRanges={priceRanges}
                  selectedFeatures={selectedFeatures}
                />
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      resetFilters();
                      setFilterOpen(false);
                    }}
                  >
                    Đặt lại
                  </Button>
                  <Button onClick={() => setFilterOpen(false)}>Đóng</Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductListPage;
