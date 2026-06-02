# Location Page Local SEO Checklist

> Audited against the production codebase on 2025-05-15.

## Legend

- ✅ COMPLETED
- 🔶 PARTIAL
- ❌ MISSING

---

## Checklist

### ✅ 1. Primary local keyword in page title
**Status: COMPLETED**
`meta_title` in location frontmatter follows the pattern `"Roofing Contractor {City} {State} | J Land Contracting"`. The `Base.astro` layout uses `meta_title || title` for the SEO `<title>`.
- Ref: `src/content/locations/frederick-md.md:3`

### ✅ 2. Main services listed in H2/H3 tags
**Status: COMPLETED**
H2 heading renders as "Our services in {city}, {state}". Each service card renders an H3 with the service title (optionally overridden per-location via `title_override`).
- Ref: `src/pages/locations/[single].astro:200`, `src/layouts/components/ServiceCard.astro`

### ✅ 3. Internal links from location page to main service pages
**Status: COMPLETED**
Each `ServiceCard` links to `/services/{id}`. Location frontmatter explicitly lists service slugs that resolve to full service pages.
- Ref: `src/pages/locations/[single].astro:205`, `src/content/locations/frederick-md.md:48-54`

### ✅ 4. Embedded GBP map on the location page
**Status: COMPLETED**
An iframe embed renders when `google_map.enable` is true and `google_map.embed_url` is provided. Uses `loading="lazy"` and a descriptive title attribute.
- Ref: `src/pages/locations/[single].astro:355-370`

---

### 🔶 5. GBP primary category in H1 or page title
**Status: PARTIAL**
"Roofing" appears in the H1 hero title ("Trusted Roofing in Frederick, MD") and "Roofing Contractor" appears in the `meta_title`. However, the H1 does not include "Contractor" — the exact GBP primary category format. Consider updating H1 to match, e.g. "Roofing Contractor in Frederick, MD".
- Ref: `src/content/locations/frederick-md.md:3,20`

### 🔶 6. Full NAP section (Name, Address, Phone)
**Status: PARTIAL**
- **Name + Phone**: Present in JSON-LD schema and footer via `config.json`.
- **Address**: Schema only has `addressLocality` and `addressRegion` — **no `streetAddress` or `postalCode`**. The full corporate address appears in the footer, but there is **no visible NAP block on the location page itself**.
- Ref: `src/pages/locations/[single].astro:61-72`, `src/layouts/partials/Footer.astro:95-108`

### 🔶 7. Zip codes and neighborhoods served
**Status: PARTIAL**
Neighborhoods are listed via `service_area_neighborhoods` in frontmatter and rendered by `LocationContent.astro`. **No zip codes** exist in the schema or content — no `postal_code` or `zip_codes` field.
- Ref: `src/types/pages.collection.ts:289-297`, `src/content/locations/frederick-md.md:32-45`

### 🔶 8. Content optimization (entities in headings, meta, body)
**Status: PARTIAL**
Meta title, description, H1, and H2 tags contain location-specific keywords. Body content includes local entities (Baker Park, I-270, Catoctin Mountains). Gaps: no structured heading hierarchy beyond H2 for services; service card titles are not always location-optimized.
- Ref: `src/content/locations/frederick-md.md`, `src/pages/locations/[single].astro:200`

### 🔶 9. Topic coverage matching competitors
**Status: PARTIAL**
Core content is present (hero, intro, challenges, service area, services, FAQs, testimonials, contact form, map). Missing vs. typical top-ranking competitors: driving directions, NAP display, review links, GBP link, zip codes, opening hours, "near me" targeting.
- Ref: `src/pages/locations/[single].astro`

### 🔶 10. FAQ section with FAQ schema markup
**Status: PARTIAL**
FAQ accordion is rendered on the location page. **`FAQPage` schema is MISSING** — the location page only includes `HomeAndContractTrade` and `BreadcrumbList` schemas. The homepage has `FAQPage` schema; the location page does not.
- Ref: `src/pages/locations/[single].astro:212-254` (FAQ section), `src/pages/locations/[single].astro:57-142` (schema — no FAQPage)

### 🔶 11. Local Business Schema (validated, rich results ready)
**Status: PARTIAL**
`HomeAndContractTrade` schema is present with `name`, `url`, `telephone`, `email`, `image`, `geo`, `areaServed`, `priceRange`, `openingHoursSpecification`, `hasOfferCatalog`. Missing for rich results: `streetAddress`, `postalCode`, `@id`, `sameAs`, `aggregateRating`, `review`.
- Ref: `src/pages/locations/[single].astro:57-142`

### 🔶 12. Image optimization for local SEO
**Status: PARTIAL**
- **WebP**: ✅ `ImageMod.astro` supports `format="webp"`, used in hero/intro images.
- **Keyword-rich filenames**: 🔶 `frederick-md-hero.jpg` is descriptive but only one image per location.
- **Location-specific alt text**: 🔶 Alt text is generic (`{city}, {state}`) — should be descriptive (e.g., "Roofing contractor working on a roof in Frederick, MD").
- **Authentic over stock**: ❓ No evidence of authentic team/project photos; only a single hero image.
- Ref: `src/layouts/components/ImageMod.astro`, `src/pages/locations/[single].astro:153-156`

### 🔶 13. Opening hours displayed consistently
**Status: PARTIAL**
Opening hours are in the JSON-LD schema (`openingHoursSpecification`: Mon-Fri 08:00-17:00, Sat 08:00-12:00). **Not rendered as visible HTML** anywhere on the location page, footer, or contact section.
- Ref: `src/pages/locations/[single].astro:89-101`

---

### ❌ 14. Link to Google Business Profile (GBP)
**Status: MISSING**
No GBP URL field in the content schema, and no outbound link to the Google Business Profile on the location page. The `google_map` schema only has `enable` and `embed_url`.
- Ref: `src/types/pages.collection.ts:348-353`, `src/pages/locations/[single].astro`

### ❌ 15. Remove or consolidate duplicate location pages
**Status: MISSING**
No deduplication logic in `getStaticPaths()`. If two `.md` files were created for the same location (e.g., `frederick-md.md` and `frederick-maryland.md`), both would generate separate pages with no canonical enforcement.
- Ref: `src/pages/locations/[single].astro:13-18`

### ❌ 16. "Nearby" or "Near Me" phrasing in H1 or page title
**Status: MISSING**
Neither the hero title ("Trusted Roofing in Frederick, MD") nor the `meta_title` ("Roofing Contractor Frederick MD | J Land Contracting") contains "near me" or "nearby" phrasing.
- Ref: `src/content/locations/frederick-md.md:3,20`

### ❌ 17. Main service pages link back to the location page
**Status: MISSING**
The service page template (`services/[single].astro`) has zero links to `/locations/`. No "Areas We Serve" section, no location cards, no cross-linking.
- Ref: `src/pages/services/[single].astro`

### ❌ 18. Outbound link to Google Map listing
**Status: MISSING**
An iframe embed is present, but there is no clickable link (e.g., "View on Google Maps" or "Get directions on Google Maps") that opens the actual Maps listing.
- Ref: `src/pages/locations/[single].astro:355-370`

### ❌ 19. Outbound links to reviews (Google, Yelp) and encourage new ones
**Status: MISSING**
Testimonials are hardcoded in frontmatter — not linked to Google or Yelp. No "Leave a review" or "Review us on Google" CTA. No outbound links to any review platform.
- Ref: `src/pages/locations/[single].astro:256-293`

### ❌ 20. Outbound links to social profiles and/or local brand mentions
**Status: MISSING**
No `sameAs` property in the location page schema. No social icons or links rendered on the location page. The homepage schema includes `sameAs` with social URLs but the location page does not.
- Ref: `src/pages/locations/[single].astro:57-142`

### ❌ 21. Driving directions from the city center (not the airport)
**Status: MISSING**
No "driving directions" section, component, or content field in the location page template, schema, or content. The `google_map` only provides an embed with no directions link.
- Ref: `src/pages/locations/[single].astro`, `src/types/pages.collection.ts`

### ❌ 22. Internal links from service pages and blog posts to location page
**Status: MISSING**
- **Service pages**: Zero links to `/locations/` in `services/[single].astro`.
- **Blog posts**: No blog content exists yet; only an index file.
- **Footer**: Links to "Frederick, MD" and "All Locations" — this is the only cross-linking.
- **Homepage**: No location links on the homepage.
- Ref: `src/pages/services/[single].astro`, `src/pages/index.astro`

---

## Summary

| Status | Count | Items |
|--------|-------|-------|
| ✅ Completed | 4 | #1, #2, #3, #4 |
| 🔶 Partial | 9 | #5, #6, #7, #8, #9, #10, #11, #12, #13 |
| ❌ Missing | 9 | #14, #15, #16, #17, #18, #19, #20, #21, #22 |

## Top Priority Gaps

1. **Add `FAQPage` schema** to location page — highest-impact schema gap for FAQ rich results
2. **Complete LocalBusiness schema** — add `streetAddress`, `postalCode`, `@id`, `sameAs`, `aggregateRating`, `review`
3. **Add visible NAP block** with name, full street address, phone number, and opening hours
4. **Add GBP outbound link** and "View on Google Maps / Get Directions" link
5. **Add review links** to Google Business Profile and Yelp, plus a CTA to leave a review
6. **Add cross-links from service pages** back to location pages (e.g., "Areas We Serve" section)
7. **Add `postalCode`/`zip_codes` field** to the location content schema and display zip codes served
8. **Add "near me" keyword targeting** to H1 or subtitle copy