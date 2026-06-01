import vikeReact from "vike-react/config";
import type { Config } from "vike/types";
import { Head } from "../src/components/Layout/Head";

// Configuração padrão para todas as páginas.
// https://vike.dev/config
export default {
  // Ativa o suporte ao React do Vike.
  extends: [vikeReact],
  // Favicon (Ícone da aba) - Usando o PNG para garantir transparência
  favicon: "/images/icon.png",
  // Ativa a pré-renderização (SSG) para todas as páginas.
  prerender: true,
  // Define o componente Head para gerenciar metatags dinâmicas
  Head,
  // Define a linguagem padrão
  lang: "pt-br",
  // Registrando a nova propriedade para que ela esteja disponível no pageContext
  meta: {
    ogSiteName: {
      env: { server: true, client: true }
    },
    titleKey: {
      env: { server: true, client: true }
    },
    descriptionKey: {
      env: { server: true, client: true }
    }
  },
  // Valores padrão (chaves de tradução)
  titleKey: "Sensen Games",
  descriptionKey: "home.about.ctaDescription",
  ogSiteName: "header.home"
} satisfies Config;
