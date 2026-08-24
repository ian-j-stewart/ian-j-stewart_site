# Content TODO

This file tracks missing, incomplete or unverified content for the site. Review before declaring the site final.

## Added assets

- `src/assets/ian-stewart.jpg`: a portrait has been added for the homepage hero. The owner should confirm it is the image they want to use and that they are happy with the crop. A more formal professional portrait would improve the site if one becomes available.

## Missing assets

- `public/ian-j-stewart-cv.pdf`: upload an academic CV when available; the download button is hidden until this file is supplied.

## Missing profile and contact information

- ORCID profile URL: add to `src/content/settings/site.yml` under `person.orcid` when available.
- Google Scholar profile URL: add to `src/content/settings/site.yml` under `person.googleScholar` when available.
- Academic contact email: confirmed and added as `istewart@middlebury.edu`; the owner should verify this remains correct.
- CNS expert profile URL: the `person.cns` field currently points to `https://nonproliferation.org/experts/ian_stewart/`; verify that this URL resolves and update if a different CNS page is preferred.

## Book covers and images

- Book covers, publication thumbnails and hero images have not been seeded. Only use authorised images; do not scrape or reproduce covers without permission.

## Biographical and factual confirmation

- Ian should review the publication list in `PUBLICATION-AUDIT.md` for accuracy and confirm any items marked as uncertain.
- The `featuredOnThemes` field now lets Ian hand-pick publications on research-theme pages. Initial selections should be reviewed, and the automated type-and-year fallback for the eight-item limit should not be treated as a judgement of academic importance.
- Professional portrait permission and cropping should be approved by the subject before deployment.
- Academic CV and contact email require owner confirmation.
- Awarding institutions for the MSc and MEng degrees require confirmation before they are added.
- Contracted-book status or any `Working paper in development` / `Book concept` status should only be assigned when explicitly confirmed.
- The `externalUrl` / `pdfUrl` for `The Contribution of Intangible Technology Controls...` remains `http://` because the HTTPS endpoint presents a self-signed certificate; do not upgrade it unless an authoritative replacement is available.
