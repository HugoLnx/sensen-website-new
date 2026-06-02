# Sensen Games Website

This is the repository for the official Sensen Games studio website. A high-performance, SEO-optimized portfolio featuring their game catalog, challenges, guides, and community news.

Live Demo: [https://hugolnx.github.io/sensen-website-new/](https://hugolnx.github.io/sensen-website-new/)

## Technologies Used

### Core Stack
- **Framework:** [Vike](https://vike.dev/) (formerly vite-plugin-ssr) + [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Package Manager:** [npm](https://www.npmjs.com/)

### Supporting Tools
- **Content:** Markdown (processed via `gray-matter` & `marked`)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Forms:** [React Hook Form](https://react-hook-form.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) & [Sonner](https://sonner.stevenly.me/)

## Features

- **SSG & SEO:** All pages are pre-rendered at build time using Vike, ensuring maximum performance and SEO indexing.
- **Multilingual Support:** Fully localized in English (**en-US**) and Portuguese (**pt-BR**).
- **Markdown Content:** Easy-to-manage challenges, guides, and news powered by Markdown files.
- **Dynamic Game Catalog:** High-performance catalog with video previews on hover and detailed modals.
- **Automated Workflows:** Scripts for generating content metadata and fetching streamer avatars automatically.
- **Responsive & Modern UI:** Polished user experience with fluid animations and a mobile-first approach.

## Project Structure

- `/pages`: Vike routing and page components.
- `/content`: Markdown files for Challenges, Guides, and News.
- `/src/components`: Reusable React components.
- `/src/i18n`: Translation files.
- `/scripts`: Automation scripts for content and assets.
- `/public`: Static assets (images, videos, generated JSON).

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hugolnx/sensen-website-new.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Development

Start the development server:
```bash
npm run dev
```
This will start a local server at `http://localhost:5173`.

### Utility Scripts
- **Generate Content Metadata:** `npm run generate-content` (Scans `/content` and updates public JSON files).
- **Update Streamer Avatars:** `npm run update-avatars` (Fetches latest avatars for the community section).

## Build & Deploy

### Build
To build the production-ready version (SSG):
```bash
npm run build
```
The built files will be placed in the `dist/` folder. This script automatically runs metadata generation and avatar updates before building.

### Deploy
The project is configured for **GitHub Pages**:
```bash
npm run deploy
```

## Docker

This project includes a multi-stage `Dockerfile` and `docker-compose.yml` for both development and production simulation.

### Development Environment
To run the project in a containerized development environment with hot-reloading:
```bash
docker-compose up dev
```
The application will be available at `http://localhost:3000`.

### Production Preview
To build and run the production version (served by Nginx):
```bash
docker-compose up prod
```
The application will be available at `http://localhost:8080`.

## License

This project is licensed under the **GNU General Public License v3.0**. You can find the full text of the license in the repository's root.

---
*Developed with ❤️ by Sensen Games. Please keep the credits at the footer when forking.*
