import { useEffect, useState } from "react";
import { useData } from "vike-react/useData";
import { usePageContext } from "vike-react/usePageContext";
import { useLanguage } from "@/contexts/useLanguage";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { loadMarkdownBySlug } from "@/utils/markdownClient";
import type { MarkdownPost } from "@/types";

interface MarkdownDetailPageProps {
  section: "noticias" | "guias";
  basePath: string;
  translationKey: string; // ex: "markdownPages.news" ou "markdownPages.guides"
}

export default function MarkdownDetailPage({
  section,
  basePath,
  translationKey,
}: MarkdownDetailPageProps) {
  const { currentLang, t } = useLanguage();
  const pageContext = usePageContext();
  const serverData = useData<MarkdownPost>();
  const slug = (pageContext.routeParams?.slug as string) ?? "";

  const [post, setPost] = useState<MarkdownPost | null>(serverData ?? null);
  const [loading, setLoading] = useState(currentLang !== "pt-BR");

  const backLabel = t(`${translationKey}.backLabel`);

  useEffect(() => {
    if (currentLang === "pt-BR") {
      // eslint-disable-next-line
      setPost(serverData ?? null);
      setLoading(false);
      return;
    }

    if (!slug) return;

    let cancelled = false;
    setLoading(true);
    loadMarkdownBySlug(section, slug, currentLang)
      .then((data) => {
        if (!cancelled) setPost(data);
      })
      .catch(() => {
        if (!cancelled) setPost(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [currentLang, section, slug, serverData]);

  if (loading) {
    return (
      <main className="page-bg min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-general-dark rounded w-3/4 mx-auto" />
            <div className="h-4 bg-general-dark rounded w-1/2 mx-auto" />
            <div className="h-64 bg-general-dark rounded mt-8" />
          </div>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="page-bg min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-general-dim text-lg">Conteúdo não encontrado.</p>
          <a
            href={basePath}
            className="inline-flex items-center gap-2 text-primary hover:text-primary-soft transition-colors underline underline-offset-4 mt-4"
          >
            ← {backLabel}
          </a>
        </div>
      </main>
    );
  }

  const { frontmatter, content } = post;

  return (
    <main className="page-bg min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          {frontmatter.image && (
            <div className="w-full h-64 md:h-96 mb-8 rounded-2xl overflow-hidden">
              <img
                src={frontmatter.image}
                alt={frontmatter.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {frontmatter.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-general-dim text-sm">
            {frontmatter.author && (
              <span className="flex items-center gap-1">
                <span className="font-medium text-general">
                  {frontmatter.author}
                </span>
              </span>
            )}
            {frontmatter.date && (
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString(currentLang, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}
          </div>

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {frontmatter.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs bg-primary-soft text-primary px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="bg-general border border-general-dark rounded-2xl p-6 md:p-10 shadow-lg">
          <MarkdownRenderer html={content} />
        </div>

        <div className="mt-10 text-center">
          <a
            href={basePath}
            className="inline-flex items-center gap-2 text-primary hover:text-primary-soft transition-colors underline underline-offset-4"
          >
            ← {backLabel}
          </a>
        </div>
      </article>
    </main>
  );
}

