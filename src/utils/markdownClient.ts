import type { MarkdownPost } from "@/types";

const DEFAULT_LANG = "pt-BR";

async function fetchJson(section: string, lang: string): Promise<MarkdownPost[]> {
  const url = `${import.meta.env.BASE_URL}content/${section}/${lang}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load ${url}: ${response.status}`);
  }
  return response.json();
}

/**
 * Carrega todos os posts de uma seção, filtrando por idioma
 * com fallback automático para pt-BR.
 */
export async function loadMarkdownClient(
  section: "noticias" | "guias",
  lang: string
): Promise<MarkdownPost[]> {
  const targetLang = lang || DEFAULT_LANG;

  try {
    const posts = await fetchJson(section, targetLang);
    if (posts.length > 0) {
      return sortByDate(posts);
    }
  } catch {
    // Se falhar, tenta fallback
  }

  // Fallback para pt-BR
  if (targetLang !== DEFAULT_LANG) {
    try {
      const posts = await fetchJson(section, DEFAULT_LANG);
      return sortByDate(posts);
    } catch {
      return [];
    }
  }

  return [];
}

/**
 * Carrega um único post por slug, filtrando por idioma
 * com fallback automático para pt-BR.
 */
export async function loadMarkdownBySlug(
  section: "noticias" | "guias",
  slug: string,
  lang: string
): Promise<MarkdownPost | null> {
  const posts = await loadMarkdownClient(section, lang);
  return posts.find((p) => p.slug === slug) || null;
}

function sortByDate(posts: MarkdownPost[]): MarkdownPost[] {
  return [...posts].sort((a, b) => {
    const dateA = a.frontmatter.date
      ? new Date(a.frontmatter.date).getTime()
      : 0;
    const dateB = b.frontmatter.date
      ? new Date(b.frontmatter.date).getTime()
      : 0;
    return dateB - dateA;
  });
}

