'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, WishlistItem } from '@/types';

interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction =
  | { type: 'TOGGLE_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number };

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        return { items: state.items.filter((i) => i.id !== action.payload.id) };
      }
      return { items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.id !== action.payload) };
    default:
      return state;
  }
};

interface WishlistContextType {
  state: WishlistState;
  toggleItem: (product: Product) => void;
  removeItem: (id: number) => void;
  isWishlisted: (id: number) => boolean;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] }, (init) => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('noqta-wishlist');
      if (saved) return { items: JSON.parse(saved) };
    }
    return init;
  });

  useEffect(() => {
    localStorage.setItem('noqta-wishlist', JSON.stringify(state.items));
  }, [state.items]);

  return (
    <WishlistContext.Provider
      value={{
        state,
        toggleItem: (p) => dispatch({ type: 'TOGGLE_ITEM', payload: p }),
        removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
        isWishlisted: (id) => state.items.some((i: WishlistItem) => i.id === id),
        totalItems: state.items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
