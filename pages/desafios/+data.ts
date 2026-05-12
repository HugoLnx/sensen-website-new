import { createMarkdownUtils } from "@/utils/markdown";
import type { MarkdownPost } from "@/types";
import type { PageContextServer } from "vike/types";

const desafios = createMarkdownUtils("desafios");

export default function data(pageContext: PageContextServer): MarkdownPost[] {
  const lang = (pageContext as unknown as Record<string, unknown>).lang as string | undefined;
  return desafios.getAll(lang);
}
