// src/contexts/StoreContext.tsx
import { createContext, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { Game, CartItem, StoreContextType } from "../types";

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Tipagem para o argumento que pode ser um jogo ou apenas seu ID
type GameIdentifier = Game | Partial<Game> | string | number;

export function StoreProvider ({ children }: { children: ReactNode })  {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Game[]>([]);

  // Helper interno para extrair a chave de um objeto de jogo
  const getGameKey = (game: Game | Partial<Game>): string => {
    if (typeof game === 'object' && game !== null) {
      if (game._id) return String(game._id);
      if (game.id) return String(game.id);
      if (game.slug) return game.slug;
    }
    // Fallback para IDs que já são strings/números ou em caso de erro
    if (typeof game === 'string' || typeof game === 'number') return String(game);
    return "unknown-" + Math.random();
  };

  // Helper para normalizar um identificador (seja objeto, string ou número) para uma chave de string
  const normalizeId = (identifier?: GameIdentifier): string | null => {
    if (identifier === undefined || identifier === null) return null;
    if (typeof identifier === 'object') return getGameKey(identifier);
    return String(identifier);
  };

  const addToCart = (game: Game) => {
    const key = getGameKey(game);
    const existingItem = cart.find((item) => getGameKey(item) === key);

    if (existingItem) {
      setCart((currentCart) =>
        currentCart.map((item) =>
          getGameKey(item) === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      toast.info(`Quantidade de "${game.title}" atualizada!`);
    } else {
      setCart((currentCart) => [...currentCart, { ...game, quantity: 1 }]);
      toast.success(`"${game.title}" adicionado ao carrinho!`);
    }
  };

  const removeFromCart = (identifier?: GameIdentifier) => {
    const keyToRemove = normalizeId(identifier);
    if (!keyToRemove) return;
    setCart((currentCart) =>
      currentCart.filter((item) => getGameKey(item) !== keyToRemove)
    );
    toast.error("Item removido.");
  };

  const updateQuantity = (identifier: GameIdentifier, newQuantity: number) => {
    const keyToUpdate = normalizeId(identifier);
    if (!keyToUpdate) return;
    
    if (newQuantity <= 0) {
      removeFromCart(keyToUpdate);
      return;
    }
    setCart((currentCart) =>
      currentCart.map((item) =>
        getGameKey(item) === keyToUpdate ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.warning("Carrinho esvaziado.");
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const addToWishlist = (game: Game) => {
    const key = getGameKey(game);
    const existingItem = wishlist.find((item) => getGameKey(item) === key);

    if (existingItem) {
      toast.info('Este jogo já está na sua lista de desejos!');
    } else {
      setWishlist((currentWishlist) => [...currentWishlist, game]);
      toast.success(`${game.title} adicionado à lista de desejos!`);
    }
  };

  const removeFromWishlist = (identifier?: GameIdentifier) => {
    const keyToRemove = normalizeId(identifier);
    if (!keyToRemove) return;

    const itemToRemove = wishlist.find((item) => getGameKey(item) === keyToRemove);

    if (itemToRemove) {
      setWishlist((currentWishlist) =>
        currentWishlist.filter((item) => getGameKey(item) !== keyToRemove)
      );
      toast.info(`${itemToRemove.title} removido da lista de desejos`);
    }
  };

  const isInCart = (identifier?: GameIdentifier) => {
    const key = normalizeId(identifier);
    if (!key) return false;
    return cart.some((item) => getGameKey(item) === key);
  };

  const isInWishlist = (identifier?: GameIdentifier) => {
    const key = normalizeId(identifier);
    if (!key) return false;
    return wishlist.some((item) => getGameKey(item) === key);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInCart,
        isInWishlist,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext };