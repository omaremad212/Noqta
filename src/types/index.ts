export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  features?: string[];
  inStock: boolean;
  badge?: string;
  rating?: number;
  reviews?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem extends Product {}

export interface CheckoutForm {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  paymentMethod: 'cod' | 'online';
}
