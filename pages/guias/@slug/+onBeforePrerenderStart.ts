import { createMarkdownUtils } from "@/utils/markdown";

const guias = createMarkdownUtils("guias");

export default function onBeforePrerenderStart(): string[] {
  const slugs = guias.getSlugs();
  return slugs.map((slug) => `/guias/${slug}`);
}

