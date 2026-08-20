# JLA-15 Controlled Content Governance

Status: draft-only repo package support document.

This document governs the JLA-15 pilot content files added under `src/content/blog/` in the local branch/package `seo/jla15-controlled-noindex-pilot`.

## Hard safety settings

Every pilot page must remain:

- `draft: true`
- `robots: "noindex, nofollow"`
- `sitemap_inclusion: false`
- `indexable: false`
- `live_publish_authorized: false`

Because the current content parser excludes `draft: true` entries, these files are not generated into public routes in this package.

## Blocked content

Do not add customer names, addresses, phone numbers, emails, private job details, contracts, invoices, estimates, testimonials, reviews, ratings, project photos, before/after media, paid-tool data, city-swap doorway copy, or unsupported claims.

## Blocked claims

Do not publish or imply unsupported pricing, warranty, legal, code, insurance, emergency-response, licensing, award, #1/best, guaranteed outcome, or response-time claims.

## Required before any future public route

A separate Daniel exact approval is required before any PR push/opening, merge, deploy, live/indexable publishing, sitemap inclusion, noindex/nofollow removal, CMS/CloudCannon/Search Console/GBP/DNS/hosting/Vercel/account/OAuth/credential/paid-tool change, automation sync, customer-data/media use, or external contact.

## QA checklist

QA must verify:

1. All 12 files exist in `src/content/blog/`.
2. All 12 have `draft: true`.
3. All 12 have `robots: "noindex, nofollow"`.
4. All 12 have `sitemap_inclusion: false`.
5. All 12 have `indexable: false`.
6. Build succeeds.
7. Build output does not contain generated pilot routes under `dist/blog/<pilot-slug>/`.
8. Secret/privacy scan finds no credentials, private keys, emails, phone numbers, or customer/private data.
