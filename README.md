# ian-j-stewart.com

Personal academic website for Dr Ian J. Stewart — an international security scholar researching the governance of strategic technology, including export controls, AI and compute, semiconductors, research security, nuclear nonproliferation and deterrence.

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

## Repository structure

```
.
├── .github/workflows/ci.yml   # CI: install, check, build
├── .pages.yml                 # Pages CMS configuration
├── astro.config.mjs           # Astro site config
├── src/content.config.ts      # Astro content collection schemas
├── src/content/               # Editable content
│   ├── settings/site.yml      # Global site settings
│   ├── pages/                 # Singleton pages
│   ├── research-themes/       # Research theme entries
│   ├── publications/          # Publications
│   ├── projects/              # Projects
│   └── essays/                # Essays
├── src/components/            # Reusable Astro components
├── src/layouts/               # Page layouts
├── src/pages/                 # Page routes
├── src/styles/global.css      # Global CSS
├── public/                    # Static assets
└── dist/                      # Build output (ignored by git)
```

## Content collections

Collections are defined in `src/content.config.ts` and stored in `src/content/`.

## Pages CMS

`.pages.yml` configures the browser-based Pages CMS. It provides editors for:

- Site settings (`src/content/settings/site.yml`)
- Singleton pages (`home.md`, `research.md`, `engagement.md`, `about.md`)
- Research themes
- Publications
- Projects
- Essays
- Media uploads to `public/assets/`

## How to add a publication

1. Go to the **Publications** collection in Pages CMS.
2. Create a new entry, or add a Markdown file to `src/content/publications/`.
3. Fill in title, year, type, venue and status.
4. Add the abstract in the body.
5. Mark `draft: true` until it is ready.

## How to add a project

1. Go to the **Projects** collection.
2. Fill in title, summary, status and research theme IDs.
3. Add the full description in the body.

## How to add an essay

1. Go to the **Essays** collection.
2. Fill in title, date, excerpt and optional external URL.
3. Add the essay body, or leave the body empty if it links to an external publication.
4. Mark `draft: true` until it is ready.

## How to edit singleton pages

Edit `src/content/pages/home.md`, `research.md`, `engagement.md` or `about.md` directly or through Pages CMS. Page frontmatter and body are rendered automatically.

## Draft status

Any entry with `draft: true` is excluded from the public build.

## Featured content

Featured items for the homepage are set in `src/content/settings/site.yml` under the `featured` object. Use the entry ID (file name without extension). Re-ordering can be managed through the `order` field on publications and projects.

## How to add the CV

Place a PDF at `public/ian-j-stewart-cv.pdf`. The download button appears automatically on the About and Publications pages.

## How to add the professional photograph

Place a JPG at `src/assets/ian-stewart.jpg`. It will be used in the hero; otherwise the hero renders as text-only.

## Cloudflare build settings

Use these settings in Cloudflare Pages:

- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Production branch:** `main`

Cloudflare will build and deploy automatically when `main` changes. Deployment secrets are not stored in the repository.

## Custom domain

Add `ian-j-stewart.com` in the Cloudflare Pages custom domains tab and ensure the DNS CNAME record points to the Cloudflare Pages target.

## Updating dependencies

```bash
npm update
```

Review the Astro changelog before major version updates, because content collection APIs can change.

## Validation before committing

Run locally:

```bash
npm run check
npm run build
```

The GitHub Actions workflow runs the same commands on every push and pull request to `main`.
