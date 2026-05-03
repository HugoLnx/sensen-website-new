import type { MarkdownPost } from "@/types";

export default function description(pageContext: { data: unknown }): string {
  const post = pageContext.data as MarkdownPost;
  return post.frontmatter.description;
}

