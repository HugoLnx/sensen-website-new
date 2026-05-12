import { useEffect, useState } from "react";
import { useData } from "vike-react/useData";
import { Calendar, ArrowRight, Swords, Trophy } from "lucide-react";
import { useLanguage } from "@/contexts/useLanguage";
import { loadMarkdownClient } from "@/utils/markdownClient";
import type { MarkdownPost } from "@/types";
import { PageContainer } from "./ui/PageContainer";
import { SectionHeader } from "./ui/SectionHeader";

interface DesafioListPageProps {
  section: "desafios";
  basePath: string;
  translationKey: string;
}

export default function DesafioListPage({
  section,
  basePath,
  translationKey,
}: DesafioListPageProps) {
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
      <PageContainer maxWidth="6xl">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-general-dark rounded w-1/3 mx-auto mb-4" />
            <div className="h-6 bg-general-dark rounded w-1/2 mx-auto" />
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="6xl">
      <SectionHeader 
        title={title}
        subtitle={subtitle}
      />

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-general-dim text-lg">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`${basePath}/${post.slug}`}
              className="group relative flex flex-col md:flex-row glass-effect rounded-2xl overflow-hidden hover:border-primary transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 border-l-4 border-l-primary"
            >
              <div className="w-full md:w-48 h-48 md:h-full overflow-hidden shrink-0">
                {post.frontmatter.image ? (
                  <img
                    src={post.frontmatter.image}
                    alt={post.frontmatter.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-general-dark flex items-center justify-center">
                    <Swords className="w-12 h-12 text-primary/50" />
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="flex items-center gap-1 text-general-dim text-xs">
                      <Calendar className="w-3 h-3" />
                      {post.frontmatter.date && new Date(post.frontmatter.date).toLocaleDateString(currentLang)}
                    </span>
                    {post.frontmatter.difficulty && (
                      <span className="bg-primary/20 text-primary text-[10px] uppercase font-bold px-2 py-1 rounded tracking-wider">
                        {t('markdownPages.challenges.difficulty')}: {post.frontmatter.difficulty}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl font-bold text-general mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.frontmatter.title}
                  </h2>

                  <p className="text-general-dim text-sm line-clamp-2 mb-4">
                    {post.frontmatter.description}
                  </p>

                  {post.frontmatter.reward && (
                    <div className="flex items-center gap-2 mb-4 p-2 bg-primary-soft/30 rounded-lg">
                      <Trophy className="w-4 h-4 text-primary" />
                      <span className="text-xs text-primary font-medium">
                        {t('markdownPages.challenges.reward')}: {post.frontmatter.reward}
                      </span>
                    </div>
                  )}
                </div>

                <span className="inline-flex items-center gap-1 text-primary text-sm font-bold uppercase tracking-widest group-hover:underline mt-auto">
                  {readMoreLabel}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
