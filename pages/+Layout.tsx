import React from "react";
import LayoutComponent from "@/components/Layout/Layout";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "@/assets/styles/index.css";
import "@/index.css"; // Estilos globais
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SettingsProvider>
        <LayoutComponent>
          {children}
        </LayoutComponent>
        <Toaster position="top-right" theme="dark" richColors />
      </SettingsProvider>
    </LanguageProvider>
  );
}
