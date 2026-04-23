import React from "react";
import LayoutComponent from "@/components/Layout/Layout";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "@/assets/styles/index.css";
import "@/index.css"; // Estilos globais
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SettingsProvider>
          <LayoutComponent>
            {children}
          </LayoutComponent>
          <Toaster position="top-right" richColors />
        </SettingsProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
