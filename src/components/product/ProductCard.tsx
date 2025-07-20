import React from "react";
import { Link } from "react-router-dom";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatNumberToVND } from "@/utils/formatter";
import { useAppDispatch } from "@/store";
import { addToCart } from "@/store/slice/cartSlice";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const dispatch = useAppDispatch();
  const isHot = product.isHotDeal ?? product.tags?.includes("Giá cực sốc");

  const imagePlaceholder = `https://placehold.co/400x400/e2eeff/0066cc`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <Card
      className={cn(
        "h-full transform transition hover:shadow-lg hover:-translate-y-1",
        className
      )}
    >
      <Link
        to={`/san-pham/${product.id}`}
        className="flex flex-col h-full group"
      >
        <div className="relative h-48 md:h-56 xl:h-64 flex items-center justify-center">
          <img
            src={product.image ? product.image : imagePlaceholder}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <CardContent className="flex-1 flex flex-col p-3 md:p-4">
          <div className="flex flex-wrap gap-1 min-h-[24px]">
            {isHot && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 text-white w-max">
                <span role="img" aria-label="fire">
                  🔥
                </span>
                Giá cực sốc
              </span>
            )}
          </div>
          <h3 className="text-xs md:text-sm font-medium leading-5 line-clamp-2 h-[40px] mt-2">
            {product.name}
          </h3>

          <div className="mt-auto pt-2 h-[60px]">
            <p className="text-red-600 font-bold text-base md:text-lg">
              {formatNumberToVND(product.price)}
            </p>
            {product.oldPrice ? (
              <p className="text-xs text-gray-400 flex items-center gap-2">
                <span className="line-through">
                  {formatNumberToVND(product.oldPrice)}
                </span>
                <span className="text-red-600 font-medium">
                  -
                  {Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) *
                      100
                  )}
                  %
                </span>
              </p>
            ) : (
              <p className="text-xs text-gray-400 invisible">Placeholder</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-0 pb-4 px-4">
          <Button
            size="sm"
            variant="ghost"
            className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100"
            onClick={handleAddToCart}
          >
            Mua ngay
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
