// src/types/index.ts

export interface Requirements {
  OS: string;
  CPU: string;
  RAM: string;
  GPU: string;
  Armazenamento: string;
}

export interface SystemRequirements {
  minimum: Requirements;
  recommended: Requirements;
}

// Mantenha a interface Game se já existir, ou use esta:
export interface Game {
  _id?: string | number; // Aceita ID do banco (MongoDB)
  id?: string | number;  // Aceita ID numérico (SQL)
  slug?: string;
  title: string;
  thumbnail?: string;
  image?: string;
  video?: string;
  description?: string;
  short_description?: string;
  genre: string[];
  rating: number;
  players?: string;
  platforms?: string[];
  storeLinks?: Record<string, string>;
  publisher?: string;
  developer?: string;
  release_date?: string;
  features?: string[];
  systemRequirements?: SystemRequirements;
}

// ADICIONE ESTAS DUAS:
export interface CartItem extends Game {
  quantity: number;
}


export interface StoreContextType {
  cart: CartItem[];
  wishlist: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId?: Game | number | string) => void;
  updateQuantity: (gameId: Game | number | string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (game: Game) => void;
  removeFromWishlist: (gameId?: Game | number | string) => void;
  isInCart: (gameId?: Game | number | string) => boolean;
  isInWishlist: (gameId?: Game | number | string) => boolean;
  getCartTotal: () => number;
  getCartCount: () => number;
}