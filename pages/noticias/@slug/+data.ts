import type { PageContextServer } from "vike/types";
import { createMarkdownUtils } from "@/utils/markdown";
import type { MarkdownPost } from "@/types";

const noticias = createMarkdownUtils("noticias");

export default function data(pageContext: PageContextServer): MarkdownPost {
  const { slug } = pageContext.routeParams as { slug: string };
  const lang = (pageContext as unknown as Record<string, unknown>).lang as string | undefined;
  return noticias.getBySlug(slug, lang);
}

