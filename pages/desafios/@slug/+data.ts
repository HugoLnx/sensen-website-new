import type { PageContextServer } from "vike/types";
import { createMarkdownUtils } from "@/utils/markdown";
import type { MarkdownPost } from "@/types";

const desafios = createMarkdownUtils("desafios");

export default function data(pageContext: PageContextServer): MarkdownPost {
  const { slug } = pageContext.routeParams as { slug: string };
  const lang = (pageContext as unknown as Record<string, unknown>).lang as string | undefined;
  return desafios.getBySlug(slug, lang);
}
