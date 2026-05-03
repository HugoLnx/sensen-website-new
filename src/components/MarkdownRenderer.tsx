interface MarkdownRendererProps {
  html: string;
}

export default function MarkdownRenderer({ html }: MarkdownRendererProps) {
  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

