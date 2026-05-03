export interface Game {
  _id?: string | number; // Aceita ID do banco (MongoDB)
  id?: string | number;  // Aceita ID numérico (SQL)
  slug?: string;
  title: string;
  image?: string;
  video?: string;
  description?: string;
  short_description?: string;
  isFeatured?: boolean;
  genre: string[];
  platforms?: string[];
  storeLinks?: Record<string, string>;
  publisher?: string;
  developer?: string;
}

export interface NewsFrontmatter {
  title: string;
  description: string;
  date: string; // formato ISO 8601, ex: 2024-06-15
  author?: string;
  image?: string;
  tags?: string[];
}

export interface NewsPost {
  slug: string;
  frontmatter: NewsFrontmatter;
  content: string; // HTML gerado a partir do markdown
}

// Tipos genéricos para qualquer seção baseada em Markdown
export interface MarkdownFrontmatter {
  title: string;
  description: string;
  date?: string;
  author?: string;
  image?: string;
  tags?: string[];
  [key: string]: unknown; // permite extensão
}

export interface MarkdownPost {
  slug: string;
  frontmatter: MarkdownFrontmatter;
  content: string;
}
