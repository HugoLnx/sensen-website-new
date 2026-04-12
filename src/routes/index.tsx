import { Routes, Route } from "react-router-dom";
import ContactPage from "../pages/Contact/ContactPage";
import { HomePage } from "../pages/HomePage";
import GamePage from "@/pages/GamePage";
import CatalogPage from "@/pages/CatalogPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/jogos" element={<CatalogPage />} />
      <Route path="/contato" element={<ContactPage />} />
      <Route path="/games/:slug" element={<GamePage />} />
    </Routes>
  );
}
