# Content TODO

This file tracks missing, incomplete or unverified content for the site. Review before declaring the site final.

## Missing assets

- `src/assets/ian-stewart.jpg`: authorise and add a professional portrait when available; the hero will render as text-only until this file is supplied.
- `public/ian-j-stewart-cv.pdf`: upload an academic CV when available; the download button is hidden until this file is supplied.

## Missing profile and contact information

- ORCID profile URL: add to `src/content/settings/site.yml` under `person.orcid` when available.
- Google Scholar profile URL: add to `src/content/settings/site.yml` under `person.googleScholar` when available.
- Academic contact email: add to `src/content/settings/site.yml` under `contact.email` when confirmed.
- CNS profile URL: verify the official CNS profile URL in `src/content/settings/site.yml` and `src/content/pages/home.md`.

## Incomplete publication metadata

The following entries were seeded from the known-works list and the public bibliography at https://www.nonproliferation.com/article/2023-04-24/ian-stewarts-publications. Several items are missing DOIs, page numbers, volume, issue or publisher details. Do not invent missing values.

- `finally-a-functional-regime.md`: no venue or DOI; status is `Forthcoming`. Verify where this will appear.
- `export-controls-in-an-era-of-strategic-competition.md`: no venue, publisher or DOI; status is `Forthcoming`. Verify final publication details.
- `meeting-the-growing-safeguards-burden.md`: no volume, issue, pages or DOI.
- `combating-the-financing-of-proliferation.md`: no volume, issue, pages or DOI.
- `why-the-iaea-model-may-not-be-best-for-regulating-ai.md`: no volume, issue, pages or DOI.
- `brazil-wants-special-treatment.md`: no volume, issue, pages or DOI.
- `export-controls-at-the-crossroads.md`: no volume, issue, pages or DOI.

## Books

- The prompt notes "two authored books." Only `International Nuclear Export Controls and Non-Proliferation: The Collective Action Problem` has been seeded. Identify and add the second authored book when confirmed.

## Images

- Book covers, publication thumbnails and hero images have not been seeded. Only use authorised images; do not scrape or reproduce covers without permission.

## Drafts to finish

- `src/content/essays/governing-strategic-technology.md` is marked `draft: true` and has no body. Replace the placeholder and set `draft: false` when ready to publish.
