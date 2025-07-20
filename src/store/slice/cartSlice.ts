import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

const loadCartFromStorage = (): CartState => {
  if (typeof window === "undefined") {
    return {
      items: [],
      totalItems: 0,
      totalAmount: 0,
    };
  }

  try {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      return JSON.parse(storedCart);
    }
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
  }

  return {
    items: [],
    totalItems: 0,
    totalAmount: 0,
  };
};

const initialState: CartState = loadCartFromStorage();

const saveCartToStorage = (cart: CartState) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ product, quantity: 1 });
      }

      state.totalItems += 1;
      state.totalAmount += product.price;

      saveCartToStorage(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.product.id === productId
      );

      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        state.totalItems -= item.quantity;
        state.totalAmount -= item.product.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }

      saveCartToStorage(state);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.product.id === productId
      );

      if (itemIndex >= 0) {
        const oldQuantity = state.items[itemIndex].quantity;
        const price = state.items[itemIndex].product.price;

        state.totalItems += quantity - oldQuantity;
        state.totalAmount += price * (quantity - oldQuantity);

        state.items[itemIndex].quantity = quantity;

        if (quantity <= 0) {
          state.items.splice(itemIndex, 1);
        }
      }

      saveCartToStorage(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;

      saveCartToStorage(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
