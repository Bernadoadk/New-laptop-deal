import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const items = get().items;
        const existing = items.find((i) => i.id === product.id);
        if (existing) {
          set({
            items: items.map((i) =>
              i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.id !== productId) }),
      updateQuantity: (productId, quantity) =>
        set({
          items: get().items.map((i) =>
            i.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }),
      clearCart: () => set({ items: [] }),
      get total() {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      },
    }),
    {
      name: 'nld-cart',
    }
  )
);
