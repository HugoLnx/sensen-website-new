import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { MarkdownPost } from "@/types";

export interface MarkdownUtils {
  getSlugs: (lang?: string) => string[];
  getBySlug: (slug: string, lang?: string) => MarkdownPost;
  getAll: (lang?: string) => MarkdownPost[];
}

const DEFAULT_LANG = "pt-BR";

export function createMarkdownUtils(section: string): MarkdownUtils {
  const baseDirectory = path.join(process.cwd(), "content", section);

  function getLangDirectory(lang?: string): string {
    const language = lang || DEFAULT_LANG;
    return path.join(baseDirectory, language);
  }

  function ensureDir(lang?: string) {
    const dir = getLangDirectory(lang);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  function getSlugs(lang?: string): string[] {
    ensureDir(lang);
    const dir = getLangDirectory(lang);
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir);
    return files
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""));
  }

  function getBySlug(slug: string, lang?: string): MarkdownPost {
    const targetLang = lang || DEFAULT_LANG;
    ensureDir(targetLang);
    const dir = getLangDirectory(targetLang);
    const fullPath = path.join(dir, `${slug}.md`);

    // Fallback para o idioma padrão se o arquivo não existir no idioma solicitado
    if (!fs.existsSync(fullPath)) {
      if (targetLang !== DEFAULT_LANG) {
        const fallbackPath = path.join(getLangDirectory(DEFAULT_LANG), `${slug}.md`);
        if (fs.existsSync(fallbackPath)) {
          return readMarkdownFile(fallbackPath, slug);
        }
      }
      throw new Error(`${section} não encontrado: ${slug} (lang: ${targetLang})`);
    }

    return readMarkdownFile(fullPath, slug);
  }

  function readMarkdownFile(filePath: string, slug: string): MarkdownPost {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content: markdownContent } = matter(fileContents);
    const content = marked.parse(markdownContent) as string;

    return {
      slug,
      frontmatter: data as MarkdownPost["frontmatter"],
      content,
    };
  }

  function getAll(lang?: string): MarkdownPost[] {
    const slugs = getSlugs(lang);
    return slugs.map((slug) => getBySlug(slug, lang));
  }

  return { getSlugs, getBySlug, getAll };
}

