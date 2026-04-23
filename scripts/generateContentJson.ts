import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content");
const OUTPUT_DIR = path.join(process.cwd(), "public", "content");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function processMarkdown(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content: mdContent } = matter(raw);
  const content = marked.parse(mdContent) as string;
  return {
    frontmatter: data,
    content,
  };
}

function generate() {
  ensureDir(OUTPUT_DIR);

  if (!fs.existsSync(CONTENT_DIR)) {
    console.log("No content directory found.");
    return;
  }

  const sections = fs.readdirSync(CONTENT_DIR).filter((s) =>
    fs.statSync(path.join(CONTENT_DIR, s)).isDirectory()
  );

  for (const section of sections) {
    const sectionPath = path.join(CONTENT_DIR, section);
    const langs = fs.readdirSync(sectionPath).filter((l) =>
      fs.statSync(path.join(sectionPath, l)).isDirectory()
    );

    for (const lang of langs) {
      const langPath = path.join(sectionPath, lang);
      const files = fs.readdirSync(langPath).filter((f) => f.endsWith(".md"));

      const posts = files.map((file) => {
        const slug = file.replace(/\.md$/, "");
        const processed = processMarkdown(path.join(langPath, file));
        return {
          slug,
          ...processed,
        };
      });

      const outDir = path.join(OUTPUT_DIR, section);
      ensureDir(outDir);
      const outFile = path.join(outDir, `${lang}.json`);
      fs.writeFileSync(outFile, JSON.stringify(posts, null, 2));
      console.log(`Generated: ${outFile}`);
    }
  }
}

generate();

