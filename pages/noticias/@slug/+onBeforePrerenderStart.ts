import { createMarkdownUtils } from "@/utils/markdown";

const noticias = createMarkdownUtils("noticias");

export default function onBeforePrerenderStart(): string[] {
  const slugs = noticias.getSlugs();
  return slugs.map((slug) => `/noticias/${slug}`);
}

