import type { PageContextServer } from "vike/types";
import { createMarkdownUtils } from "@/utils/markdown";
import type { MarkdownPost } from "@/types";

const guias = createMarkdownUtils("guias");

export default function data(pageContext: PageContextServer): MarkdownPost {
  const { slug } = pageContext.routeParams as { slug: string };
  const lang = (pageContext as unknown as Record<string, unknown>).lang as string | undefined;
  return guias.getBySlug(slug, lang);
}

