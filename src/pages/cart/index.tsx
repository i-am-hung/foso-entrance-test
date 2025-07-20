import React from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/store/slice/cartSlice";
import { formatNumberToVND } from "@/utils/formatter";
import { Button } from "@/components/ui/button";
import { Trash, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, totalItems, totalAmount } = useAppSelector(
    (state) => state.cart
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
          <div className="bg-white p-8 rounded-lg shadow-sm border">
            <p className="text-lg text-gray-600 mb-6">
              Giỏ hàng của bạn đang trống
            </p>
            <Link to="/san-pham">
              <Button>Tiếp tục mua sắm</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Giỏ hàng của bạn ({totalItems} sản phẩm)
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <div className="grid grid-cols-12 gap-4 font-medium text-gray-600">
                <div className="col-span-6">Sản phẩm</div>
                <div className="col-span-2 text-center">Giá</div>
                <div className="col-span-2 text-center">Số lượng</div>
                <div className="col-span-2 text-center">Tổng</div>
              </div>
            </div>

            {items.map((item) => (
              <div key={item.product.id} className="p-4 border-b last:border-0">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium line-clamp-2">
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() =>
                            dispatch(removeFromCart(item.product.id))
                          }
                          className="text-red-600 text-sm flex items-center gap-1 mt-2 hover:underline"
                        >
                          <Trash size={14} /> Xóa
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 text-center">
                    <p className="font-medium text-red-600">
                      {formatNumberToVND(item.product.price)}
                    </p>
                    {item.product.oldPrice && (
                      <p className="text-xs text-gray-400 line-through">
                        {formatNumberToVND(item.product.oldPrice)}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2 text-center">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.product.id,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        className="w-8 h-8 border rounded-l flex items-center justify-center"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <div className="w-10 h-8 border-t border-b flex items-center justify-center bg-white">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: item.product.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="w-8 h-8 border rounded-r flex items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-2 text-center font-bold">
                    {formatNumberToVND(item.product.price * item.quantity)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => dispatch(clearCart())}
              className="flex items-center gap-1"
            >
              <Trash size={16} /> Xóa giỏ hàng
            </Button>
            <Link to="/san-pham">
              <Button variant="outline" size="sm">
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-bold mb-4">Tổng đơn hàng</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính</span>
                <span className="font-medium">
                  {formatNumberToVND(totalAmount)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển</span>
                <span className="font-medium">Miễn phí</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-bold">Tổng cộng</span>
                  <span className="font-bold text-red-600">
                    {formatNumberToVND(totalAmount)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">(Đã bao gồm VAT)</p>
              </div>
            </div>

            <Button className="w-full">Tiến hành thanh toán</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
