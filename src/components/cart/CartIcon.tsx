import React from "react";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/store";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { formatNumberToVND } from "@/utils/formatter";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface CartIconProps {
  className?: string;
}

const CartIcon: React.FC<CartIconProps> = ({ className }) => {
  const { totalItems, items, totalAmount } = useAppSelector(
    (state) => state.cart
  );

  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        <div className={cn("relative", className)}>
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          )}
        </div>
      </HoverCardTrigger>

      {totalItems > 0 && (
        <HoverCardContent className="w-72" align="end">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Giỏ hàng ({totalItems})</h3>
          </div>

          <div className="max-h-60 overflow-auto">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex py-2 border-b last:border-0"
              >
                <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden mr-2 flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × {formatNumberToVND(item.product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t">
            <div className="flex justify-between mb-3">
              <span className="font-medium">Tổng cộng:</span>
              <span className="font-bold">
                {formatNumberToVND(totalAmount)}
              </span>
            </div>
            <Link to="/cart">
              <Button className="w-full">Xem giỏ hàng</Button>
            </Link>
          </div>
        </HoverCardContent>
      )}
    </HoverCard>
  );
};

export default CartIcon;
