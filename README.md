# ian-j-stewart.com

Personal academic website for Dr Ian J. Stewart — an international-security scholar researching the governance of strategic technology, including export controls, AI and compute, semiconductors, research security, nuclear nonproliferation and deterrence.

## Technology

- **Framework:** Astro 5
- **Output:** static (`dist/`)
- **Language:** TypeScript in strict mode
- **Content:** Astro content collections, Markdown/MDX and YAML
- **CMS:** Pages CMS configured via `.pages.yml`
- **Hosting:** Cloudflare Pages (recommended), connected to GitHub `main`

## Local installation

Requires Node.js 18.17 or newer. A local Node.js binary is not committed to the repository; use the one installed by the project during setup or any system Node.

```bash
npm ci
```

## Development

```bash
npm run dev
```

The dev server runs on `http://localhost:4321` by default.

## Production build

```bash
npm run build
```

Output is written to `dist/`. To preview:

```bash
npm run preview
```

## Type checking

```bash
npm run check
```

This runs `astro check` and TypeScript validation.

## Quality checks

```bash
npm run verify
```

This runs a Node.js script that checks the built `dist/` for:

- exactly one `<h1>` per page;
- visible raw taxonomy slugs;
- missing image `alt` text;
- broken internal links;
- that the 2023 and 2025 peer-reviewed articles are not marked `Forthcoming`.

## Content collections

Collections are defined in `src/content.config.ts` and stored in `src/content/`.

| Collection | Path | Purpose |
|------------|------|---------|
| `settings` | `src/content/settings/site.yml` | Site title, contact, navigation, featured items |
| `pages` | `src/content/pages/` | Singleton pages (home, about, research, engagement) |
| `researchThemes` | `src/content/research-themes/` | Three research themes with related content |
| `publications` | `src/content/publications/` | Books, articles, reports, commentary, outputs |
| `projects` | `src/content/projects/` | Current research agendas |
| `essays` | `src/content/essays/` | Local and externally linked essays |

## Pages CMS

`.pages.yml` configures the browser-based Pages CMS. It provides editors for:

- Site settings
- Singleton pages
- Research themes
- Publications
- Current research
- Essays
- Media uploads to `public/assets/`

## How to add a publication

1. Create a Markdown file in `src/content/publications/` or use the **Publications** collection in Pages CMS.
2. Fill in title, authors, year, `type`, `status`, `venue` and `ianRole`.
3. Add a DOI, `externalUrl`, `publisherUrl` or `pdfUrl` where available.
4. Add an abstract in the body.
5. Mark `draft: true` until it is ready.
6. The publication automatically gets a detail page at `/publications/[slug]/`.

## How to add an essay

1. Create a Markdown file in `src/content/essays/` or use the **Essays** collection in Pages CMS.
2. Set `title`, `date` and optional `externalUrl` for off-site pieces.
3. Add the essay body, or leave the body empty if the piece links externally.
4. Mark `draft: true` until it is ready.

## How `displayOnEssays` works

Publication records with `displayOnEssays: true` appear on the Essays page under **Selected analysis and commentary** alongside local essay entries. Use this for short-form analysis and commentary published elsewhere.

## How current research is managed

Current research agendas live in `src/content/projects/` and are displayed on the **Current Research** page (`/projects/`). Each record can include a `proposition`, central `questions`, related publication IDs and related essay IDs.

## How featured work is selected

Featured items for the homepage are set in `src/content/settings/site.yml` under the `featured` object. Use the entry ID (file name without extension). A featured project is excluded from the immediately following Current Research list to avoid duplication.

## How publication statuses work

- `Published` — shown in the main bibliography.
- `Forthcoming`, `Under contract`, `In development` — shown in the **Current work** section only if at least one record has one of these statuses.
- `draft: true` — never rendered publicly.

## How to add a CV

Place a PDF at `public/ian-j-stewart-cv.pdf`. The download button appears automatically on the About and Publications pages.

## How to add the professional portrait

Place a JPG at `src/assets/ian-stewart.jpg`. The hero and About page will use it; otherwise they render as text-only.

## How to edit content through Pages CMS

1. Visit the Pages CMS web interface for the repository.
2. Log in with GitHub.
3. Edit collections directly; commits are written back to `main`.

## Cloudflare build settings

Use these settings in Cloudflare Pages:

- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Production branch:** `main`

Cloudflare will build and deploy automatically when `main` changes. Deployment secrets are not stored in the repository.

## Validation before committing

Run locally:

```bash
npm run check
npm run build
npm run verify
```

The GitHub Actions workflow runs the same commands on every push and pull request to `main`.

## See also

- `CONTENT-TODO.md` — unresolved owner-supplied content items.
- `PUBLICATION-AUDIT.md` — source record and uncertain fields from the publication migration.
