# JLA-15 Draft-Only Repo Branch / PR Package

Branch/package name: `seo/jla15-controlled-noindex-pilot`
Base observed: `main` at `f043e6d`
Approval scope: `approve JLA-15 create draft-only repo branch and PR package`

## Summary

This package adds the 12 QA-passed controlled pilot drafts as draft-only Astro blog content files and adds a governance document. The files are prepared for QA review only. No external GitHub branch was pushed and no PR was opened by this package.

## Changed files

- `src/content/blog/roof-replacement-vs-repair-decision-guide.md`
- `src/content/blog/professional-roof-inspection-what-to-expect.md`
- `src/content/blog/roof-flashing-repair-explainer.md`
- `src/content/blog/storm-damage-roof-repair-next-steps.md`
- `src/content/blog/brown-ceiling-stains-after-rain.md`
- `src/content/blog/missing-or-lifted-shingles.md`
- `src/content/blog/gutter-overflow-and-roof-edge-warning-signs.md`
- `src/content/blog/attic-moisture-roof-ventilation-warning-signs.md`
- `src/content/blog/spring-roof-and-gutter-checklist.md`
- `src/content/blog/summer-heat-and-storm-roof-checklist.md`
- `src/content/blog/fall-roof-gutter-prep-checklist.md`
- `src/content/blog/winter-roof-leak-prevention-observation-checklist.md`
- `docs/jla15-controlled-content-governance.md`
- `docs/jla15-draft-only-pr-package.md`

## Validation to run

- `npm install`
- `npm run check`
- `npm run build`
- Metadata counts for draft/noindex/sitemap/indexable/live-publish flags
- Built-output absence checks for all 12 pilot slugs
- Secret/privacy scan

## Rollback/removal

Remove the 12 `src/content/blog/<pilot>.md` files and `docs/jla15-controlled-content-governance.md`, then rebuild. If any future approved public route exists, restore `draft: true`, confirm no sitemap inclusion, rebuild, remove internal links, and only then ask Daniel for any Search Console or public-indexing follow-up.

## Safety boundary

Still not authorized: external GitHub PR opening, branch push, merge, deploy, publish, public release, indexable pages, noindex/nofollow removal, sitemap inclusion, CMS/Search Console/GBP/DNS/hosting/OAuth/credential/account/Vercel/paid-tool changes, customer data/photos/testimonials, automation sync, external contact, or any live business/system change.
