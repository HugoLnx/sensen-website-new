import type { MarkdownPost } from "@/types";

export default function title(pageContext: { data: unknown }): string {
  const post = pageContext.data as MarkdownPost;
  return `${post?.frontmatter?.title || 'Desafio'} | Sensen Games`;
}
