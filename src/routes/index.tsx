import { Routes, Route } from "react-router-dom";
import ContactPage from "../pages/Contact/ContactPage";
import { HomePage } from "../pages/HomePage";
import { Cart } from "../pages/CartPage";
import GamePage from "@/pages/GamePage";
import { WishlistPage } from "@/pages/WishlistPage";
import CatalogPage from "@/pages/CatalogPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/jogos" element={<CatalogPage />} />
      <Route path="/contato" element={<ContactPage />} />
      <Route path="/carrinho" element={<Cart />} />
      <Route path="/lista-desejos" element={<WishlistPage />} />
      <Route path="/games/:slug" element={<GamePage />} />
    </Routes>
  );
}
