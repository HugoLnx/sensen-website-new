import { useEffect, useState } from "react";
import { useData } from "vike-react/useData";
import { Calendar, ArrowRight, User } from "lucide-react";
import { useLanguage } from "@/contexts/useLanguage";
import { loadMarkdownClient } from "@/utils/markdownClient";
import type { MarkdownPost } from "@/types";

interface MarkdownListPageProps {
  section: "noticias" | "guias";
  basePath: string;
  translationKey: string; // ex: "markdownPages.news" ou "markdownPages.guides"
}

export default function MarkdownListPage({
  section,
  basePath,
  translationKey,
}: MarkdownListPageProps) {
  const { currentLang, t } = useLanguage();
  const serverData = useData<MarkdownPost[]>();
  const [posts, setPosts] = useState<MarkdownPost[]>(serverData ?? []);
  const [loading, setLoading] = useState(currentLang !== "pt-BR");

  const title = t(`${translationKey}.title`);
  const subtitle = t(`${translationKey}.subtitle`);
  const emptyMessage = t(`${translationKey}.emptyMessage`);
  const readMoreLabel = t(`${translationKey}.readMore`);

  useEffect(() => {
    if (currentLang === "pt-BR") {
      // eslint-disable-next-line
      setPosts(serverData ?? []);
      setLoading(false);
      return;
    }

    let cancelled = false;
    loadMarkdownClient(section, currentLang)
      .then((data) => {
        if (!cancelled) setPosts(data);
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [currentLang, section, serverData]);

  if (loading) {
    return (
      <main className="page-bg min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-general-dark rounded w-1/3 mx-auto mb-4" />
            <div className="h-6 bg-general-dark rounded w-1/2 mx-auto" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-bg min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {title}
          </h1>
          <p className="text-xl text-general-dim max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-general-dim text-lg">{emptyMessage}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`${basePath}/${post.slug}`}
                className="group glass-effect rounded-2xl overflow-hidden hover:border-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >

                <div className="w-full h-48 overflow-hidden">
                  {post.frontmatter.image ? (
                    <img
                      src={post.frontmatter.image}
                      alt={post.frontmatter.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-general-dark flex items-center justify-center">
                      <span className="text-general-dim text-sm">
                        Sensen Games
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-general-dim text-sm mb-3">
                    {post.frontmatter.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.frontmatter.date).toLocaleDateString(
                          currentLang,
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    )}
                    {post.frontmatter.author && (
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.frontmatter.author}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-general mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.frontmatter.title}
                  </h2>

                  <p className="text-general-dim text-sm line-clamp-3 mb-4">
                    {post.frontmatter.description}
                  </p>

                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:underline">
                    {readMoreLabel}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

