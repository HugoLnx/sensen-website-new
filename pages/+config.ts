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
  // Título padrão (será usado se a página não definir um).
  title: "Sensen Games",
  // Metadados globais.
  description: "Explora os jogos da Sensen Games. Experiências únicas e inovadoras no mundo indie.",
  // Ativa a pré-renderização (SSG) para todas as páginas.
  prerender: true,
  // Define o componente Head para gerenciar metatags dinâmicas
  Head,
  // Define a linguagem padrão
  lang: "pt-br"
} satisfies Config;
