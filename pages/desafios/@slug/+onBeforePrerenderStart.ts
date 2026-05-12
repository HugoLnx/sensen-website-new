import { createMarkdownUtils } from "@/utils/markdown";

const desafios = createMarkdownUtils("desafios");

export default function onBeforePrerenderStart(): string[] {
  const slugs = desafios.getSlugs();
  return slugs.map((slug) => `/desafios/${slug}`);
}
