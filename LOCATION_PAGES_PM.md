# Project Management — Location Pages

> Generated 2026-05-15. Source audit: `LOCATION_SEO_CHECKLIST.md`

---

## Current Status

| Status | Count | Items |
|--------|-------|-------|
| ✅ Completed | 4 | #1, #2, #3, #4 |
| 🔶 Partial | 9 | #5, #6, #7, #8, #9, #10, #11, #12, #13 |
| ❌ Missing | 9 | #14, #15, #16, #17, #18, #19, #20, #21, #22 |

---

## Completed (No Action Needed)

| # | Item | Evidence |
|---|------|----------|
| 1 | Primary local keyword in page title | `meta_title: "Roofing Contractor Frederick MD \| J Land Contracting"` — `frederick-md.md:3` |
| 2 | Main services listed in H2/H3 tags | H2: "Our services in {city}, {state}" — `[single].astro:200`; ServiceCard H3s |
| 3 | Internal links from location → service pages | ServiceCards link to `/services/{id}` — `[single].astro:205` |
| 4 | Embedded GBP map on location page | Iframe when `google_map.enable` — `[single].astro:355-370` |

---

## Work Breakdown

### TASK 1 — New Component: `LocationNAP.astro`

**New file:** `src/layouts/components/LocationNAP.astro`

**Addresses checklist items:** #6 (full NAP section), #13 (opening hours visible), #18 (outbound Google Maps link)

**Description:** A visible NAP + hours block to render on the location page. Displays business name, full street address, phone number, opening hours, and a "View on Google Maps" / "Get Directions" outbound link.

**Props interface:**
```typescript
interface Props {
  business_name?: string;       // default from config.json site.title
  street_address?: string;      // from frontmatter or config.json
  city?: string;
  state?: string;
  zip?: string;                 // NEW schema field
  phone?: string;               // from frontmatter or config.json
  opening_hours?: { days: string; hours: string }[];
  google_maps_url?: string;     // derived from embed_url or new field
  directions_url?: string;      // Google Maps directions link
}
```

**Data sources:**
- `config.json` → `contact_info.address`, `contact_info.phone`, `contact_info.email`
- New frontmatter fields → per-location overrides
- `google_map.embed_url` → convert to clickable directions link

**Design variations:** Add to `src/layouts/components/designs/location-content/` following the existing variation pattern.

**Acceptance criteria:**
- [ ] Component renders name, address, phone, hours as visible HTML
- [ ] Phone number is a clickable `tel:` link
- [ ] Address is a clickable link to Google Maps directions
- [ ] "Get Directions" outbound link opens in new tab
- [ ] Opening hours are displayed in a readable table/list
- [ ] Falls back to `config.json` values when frontmatter fields are empty

---

### TASK 2 — New Component: `LocationReviews.astro`

**New file:** `src/layouts/components/LocationReviews.astro`

**Addresses checklist items:** #14 (GBP link), #19 (review links + CTA), #12 (review outbound links)

**Description:** Augments or replaces the existing hardcoded testimonials section with outbound links to Google Reviews, Yelp, etc., plus a "Leave a review on Google" CTA button.

**Props interface:**
```typescript
interface Props {
  gbp_url?: string;               // Google Business Profile URL
  google_reviews_url?: string;     // direct link to Google reviews
  yelp_url?: string;               // Yelp listing URL
  testimonials?: { name: string; designation: string; avatar: string; content: string }[];
}
```

**Design variations:** Add to `src/layouts/components/designs/location-content/` following the existing variation pattern.

**Acceptance criteria:**
- [ ] Renders outbound "See our reviews on Google" link (opens in new tab)
- [ ] Renders outbound "See our reviews on Yelp" link if `yelp_url` provided
- [ ] Renders CTA button: "Leave us a review on Google" linking to `google_reviews_url` or `gbp_url`
- [ ] Still renders existing testimonials below the review links
- [ ] Falls back gracefully when `gbp_url` / `yelp_url` are not provided

---

### TASK 3 — New Component: `LocationDirections.astro`

**New file:** `src/layouts/components/LocationDirections.astro`

**Addresses checklist items:** #21 (driving directions from city center)

**Description:** A section with concise driving directions text and a "Get Directions" link to Google Maps. Directions are authored per-location as markdown content.

**Props interface:**
```typescript
interface Props {
  directions?: string;           // markdown text with driving directions
  city?: string;
  state?: string;
  geo?: { latitude: string; longitude: string };
}
```

**The "Get Directions" link** is auto-generated from `geo` coordinates:
```
https://www.google.com/maps/dir/?api=1&destination={latitude},{longitude}
```

**Design variations:** Add to `src/layouts/components/designs/location-content/` following the existing variation pattern.

**Acceptance criteria:**
- [ ] Renders markdown driving directions content
- [ ] Renders "Get Directions" button linking to Google Maps directions
- [ ] Directions link uses `geo` coordinates as destination
- [ ] Section is hidden when `directions` is not provided

---

### TASK 4 — New Component: `LocationSocialLinks.astro`

**New file:** `src/layouts/components/LocationSocialLinks.astro`

**Addresses checklist items:** #20 (social profile links), #13 (`sameAs` in schema)

**Description:** Renders social media icons with outbound links. Uses site-wide social URLs from `config.json` (a new `social` array to be added) rather than per-location frontmatter.

**Props interface:**
```typescript
interface Props {
  social_links?: { platform: string; url: string; icon: string }[];
}
```

**Data source:** New `social` array in `config.json`:
```json
"social": [
  { "platform": "Facebook", "url": "https://facebook.com/jlandcontracting", "icon": "FaFacebookF" },
  { "platform": "LinkedIn", "url": "https://linkedin.com/company/jlandcontracting", "icon": "FaLinkedinIn" },
  { "platform": "Twitter", "url": "https://twitter.com/jlandgroup", "icon": "FaTwitter" },
  { "platform": "Google Business", "url": "https://g.page/jlandcontracting", "icon": "FaGoogle" }
]
```

**Acceptance criteria:**
- [ ] Renders linked social icons from `config.json`
- [ ] Links open in new tab with `rel="noopener noreferrer"`
- [ ] Falls back gracefully if `social` config is missing
- [ ] Accessible with `aria-label` on links

---

### TASK 5 — New Component: `ServiceAreaLocations.astro`

**New file:** `src/layouts/components/ServiceAreaLocations.astro`

**Addresses checklist items:** #17 (service pages link back), #22 (internal links from service pages/blog to location)

**Description:** A "We Serve {City}" section for service page templates. Queries all locations from the `locationpage` collection that include the current service slug in their `services` array.

**Props interface:**
```typescript
interface Props {
  service_slug: string;          // current service page slug
  locations: { id: string; city: string; state: string }[];
}
```

**Implementation:** In `services/[single].astro`, query all locations and filter by `services` array containing the current service slug, then pass matching locations to this component.

**Acceptance criteria:**
- [ ] Only shows locations that explicitly list the current service in their `services` frontmatter
- [ ] Each location card links to `/locations/{id}`
- [ ] Section heading: "Areas we serve for {service title}"
- [ ] Visible on the service page template

---

### TASK 6 — Schema Updates: `locationpage` Collection

**File:** `src/types/pages.collection.ts` (lines 248-355)

**Addresses checklist items:** #6, #7, #13, #14, #19, #21

**New fields to add to `locationpage` schema:**

```typescript
// After google_map (line ~353):

street_address: z.string().optional(),
// e.g. "3636 Glenoble Court" — for NAP display + schema streetAddress

phone: z.string().optional(),
// Location-specific phone override — for NAP display

zip_codes: z.array(z.string()).optional(),
// e.g. ["21701", "21702", "21703", "21704", "21705", "21709"]
// Displayed in service area section + added to areaServed schema

opening_hours: z.array(
  z.object({
    days: z.string(),   // e.g. "Monday – Friday"
    hours: z.string(),  // e.g. "8:00 AM – 5:00 PM"
  })
).optional(),
// Visible NAP hours — rendered by LocationNAP component

gbp_url: z.string().optional(),
// Google Business Profile URL — e.g. "https://g.page/jland-contracting"

google_reviews_url: z.string().optional(),
// Direct link to Google reviews — e.g. "https://search.google.com/local/writereview?placeid=..."

yelp_url: z.string().optional(),
// Yelp listing URL — e.g. "https://yelp.com/biz/j-land-contracting-jefferson"

directions: z.string().optional(),
// Markdown driving directions from city center
```

**Also update** the `designpage` `location-content` discriminated union with the same new fields.

**Acceptance criteria:**
- [ ] All 7 new fields added to `locationpage` schema
- [ ] matching fields added to `designpage` `location-content` union member
- [ ] Build passes without type errors
- [ ] Existing content files continue to work (all new fields are optional)

---

### TASK 7 — Schema Fix: Add `FAQPage` Schema to Location Page

**File:** `src/pages/locations/[single].astro` (lines 57-142)

**Addresses checklist items:** #10 (FAQ section with FAQ schema)

**Description:** Add a `FAQPage` JSON-LD entry to the `schemaData` array alongside the existing `HomeAndContractTrade` and `BreadcrumbList` schemas.

**Implementation:**
```typescript
// Add to schemaData array after BreadcrumbList:
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": effectiveFaqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}
```

**Acceptance criteria:**
- [ ] `FAQPage` schema generated when FAQs are present
- [ ] Schema validates at https://search.google.com/test/rich-results
- [ ] No duplicate schema entries when FAQs are empty/fallback

---

### TASK 8 — Schema Fix: Complete LocalBusiness Schema

**File:** `src/pages/locations/[single].astro` (lines 57-142)

**Addresses checklist items:** #11 (Local Business Schema rich results ready)

**Missing fields to add:**

| Field | Value | Source |
|-------|-------|--------|
| `@id` | `https://jlandgroup.com/locations/{slug}#business` | Generated |
| `streetAddress` | `street_address` frontmatter or `config.json` | New schema field |
| `postalCode` | from `zip_codes[0]` or config | New schema field |
| `sameAs` | social URLs from config | New `config.json` `social` array |
| `aggregateRating` | aggregate of testimonials | Could be hardcoded or new field |
| `review` | testimonials as Review schema | From existing `testimonials` data |

**Implementation for `review` schema:**
```typescript
"review": effectiveTestimonials.map(t => ({
  "@type": "Review",
  "author": { "@type": "Person", "name": t.name },
  "reviewBody": t.content
}))
```

**Implementation for `aggregateRating`:**
```typescript
// New frontmatter field OR hardcoded:
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": String(effectiveTestimonials.length)
}
```

**Acceptance criteria:**
- [ ] All 6 missing fields added to LocalBusiness schema
- [ ] Schema validates at https://search.google.com/test/rich-results
- [ ] No schema errors in Google Rich Results Test
- [ ] `sameAs` uses social URLs from `config.json`
- [ ] `review` entries use testimonial data

---

### TASK 9 — Template Updates: Location Page

**File:** `src/pages/locations/[single].astro`

**Addresses checklist items:** #6, #7, #11, #12, #13, #14, #18, #19, #20, #21

**Changes:**

1. **Import and render `LocationNAP`** in the contact/map section (after line ~370)
2. **Import and render `LocationReviews`** near the testimonials section (after line ~293)
3. **Import and render `LocationDirections`** above the map embed (before line ~355)
4. **Import and render `LocationSocialLinks`** in the page footer area (before closing `</Base>`)
5. **Improve hero image alt text**: Replace `${city}, ${state}` with `"Roofing contractor serving ${city}, ${state}"` (line 152)
6. **Add `zip_codes` to `areaServed` schema**: Include zip codes in the GeoCircle `areaServed` description
7. **Add `"near me"` to hero subtitle**: Update content files (see TASK 11)
8. **Add dedup guard in `getStaticPaths()`**: Throw on duplicate city+state combination

**Dedup guard implementation:**
```typescript
export async function getStaticPaths() {
  const locations = await getSinglePage("locationpage");
  const seen = new Map<string, string>();
  for (const loc of locations) {
    const key = `${loc.data.city},${loc.data.state}`;
    if (seen.has(key)) {
      throw new Error(`Duplicate location: ${loc.id} conflicts with ${seen.get(key)} (both ${key})`);
    }
    seen.set(key, loc.id);
  }
  return locations.map((loc) => ({
    params: { single: loc.id },
    props: { location: loc },
  }));
}
```

**Acceptance criteria:**
- [ ] All 4 new components rendered in appropriate page sections
- [ ] Hero image `alt` text is descriptive and keyword-rich
- [ ] `areaServed` schema includes zip codes
- [ ] Dedup guard throws on duplicate city+state
- [ ] Build and visual review pass

---

### TASK 10 — Template Updates: Service Pages

**File:** `src/pages/services/[single].astro`

**Addresses checklist items:** #17, #22

**Changes:**

1. **Query all locations** that reference the current service slug
2. **Import and render `ServiceAreaLocations`** at the bottom of the service page template

**Implementation:**
```typescript
// In frontmatter:
const allLocations = await getSinglePage("locationpage");
const servingLocations = allLocations.filter(loc =>
  loc.data.services?.some(s => s.slug === service.id)
);
```

```astro
<!-- In template body: -->
{servingLocations.length > 0 && (
  <ServiceAreaLocations
    service_slug={service.id}
    locations={servingLocations.map(loc => ({
      id: loc.id,
      city: loc.data.city,
      state: loc.data.state,
    }))}
  />
)}
```

**Acceptance criteria:**
- [ ] "Areas we serve" section visible on each service page
- [ ] Only locations that explicitly list the service are shown
- [ ] Each location links to `/locations/{id}`
- [ ] Section is hidden when no locations reference the service

---

### TASK 11 — Content Updates: Location Frontmatter

**Files:** All location content files (e.g., `src/content/locations/frederick-md.md`, future locations)

**Addresses checklist items:** #5, #6, #7, #13, #14, #16, #19, #21

**New frontmatter fields to populate per location:**

```yaml
# NAP data
street_address: "3636 Glenoble Court"
phone: "(410) 292-0801"
zip_codes:
  - "21701"
  - "21702"
  - "21703"
  - "21704"
  - "21705"
  - "21709"

# Opening hours
opening_hours:
  - days: "Monday – Friday"
    hours: "8:00 AM – 5:00 PM"
  - days: "Saturday"
    hours: "8:00 AM – 12:00 PM"
  - days: "Sunday"
    hours: "Closed"

# GBP and review links
gbp_url: "https://g.page/j-land-contracting"
google_reviews_url: "https://search.google.com/local/writereview?placeid=ChIJ..."
yelp_url: "https://yelp.com/biz/j-land-contracting-jefferson"

# Driving directions (markdown supported)
directions: "From downtown Frederick, head south on S Market St toward W Patrick St. Turn right onto W Patrick St/US-40 Alt. Continue for 2.5 miles, then turn left onto Glenoble Ct. Our office will be on the right."

# Hero updates for "near me" targeting
hero:
  title: "Roofing Contractor Near Frederick, MD"
  subtitle: "Trusted local roofing services near you — free inspections, storm damage repair, and full roof replacements in Frederick County."
```

**Also update `meta_title`** to include "near me":
```yaml
meta_title: "Roofing Contractor Near Frederick MD | J Land Contracting"
```

**Acceptance criteria:**
- [ ] All new frontmatter fields populated for frederick-md.md
- [ ] Hero H1 includes GBP category ("Roofing Contractor") and "near" phrasing
- [ ] `meta_title` includes "near me" or "near" phrasing
- [ ] Zip codes specific to the location are listed
- [ ] Directions are from city center, not from airport
- [ ] GBP and review URLs are verified working

---

## Task Dependency Map

```
TASK 6 (Schema updates)
  ├── TASK 1 (LocationNAP) — needs street_address, phone, opening_hours, zip_codes
  ├── TASK 2 (LocationReviews) — needs gbp_url, google_reviews_url, yelp_url
  ├── TASK 3 (LocationDirections) — needs directions
  ├── TASK 7 (FAQPage schema) — uses existing effectiveFaqs
  ├── TASK 8 (LocalBusiness schema) — needs street_address, zip_codes, social config
  ├── TASK 9 (Location template) — needs all component imports + schema fields
  └── TASK 11 (Content updates) — needs schema fields to exist first

TASK 4 (LocationSocialLinks) — needs config.json social array
  └── TASK 9 (Location template) — renders the component

TASK 5 (ServiceAreaLocations) — standalone
  └── TASK 10 (Service template) — renders the component
```

**Recommended build order:**
1. TASK 6 — Schema updates (foundation for everything)
2. TASK 4 — Config.json social array + LocationSocialLinks component
3. TASK 1 — LocationNAP component
4. TASK 2 — LocationReviews component
5. TASK 3 — LocationDirections component
6. TASK 5 — ServiceAreaLocations component
7. TASK 7 — FAQPage schema
8. TASK 8 — LocalBusiness schema completion
9. TASK 9 — Location page template integration
10. TASK 10 — Service page template integration
11. TASK 11 — Content updates (final, after all templates work)

---

## Checklist Item → Task Mapping

| Checklist # | Item | Task(s) |
|-------------|------|---------|
| 1 | Primary local keyword in page title | ✅ Done |
| 2 | Main services in H2/H3 tags | ✅ Done |
| 3 | Internal links from location → services | ✅ Done |
| 4 | Embedded GBP map | ✅ Done |
| 5 | GBP primary category in H1/title | TASK 11 |
| 6 | Full NAP section | TASK 1, TASK 6, TASK 9 |
| 7 | Zip codes and neighborhoods | TASK 6, TASK 9, TASK 11 |
| 8 | Content optimization (entities) | TASK 8, TASK 11 |
| 9 | Topic coverage matching competitors | Covered by all tasks collectively |
| 10 | FAQ section with FAQ schema | TASK 7 |
| 11 | Local Business Schema | TASK 8 |
| 12 | Image optimization | TASK 9 (alt text), TASK 11 (filenames — content) |
| 13 | Opening hours displayed | TASK 1, TASK 6, TASK 9 |
| 14 | GBP link on location page | TASK 2, TASK 6, TASK 9 |
| 15 | Duplicate location pages | TASK 9 (dedup guard) |
| 16 | "Nearby"/"Near Me" phrasing | TASK 11 |
| 17 | Service pages link back to location | TASK 5, TASK 10 |
| 18 | Outbound Google Maps link | TASK 1, TASK 9 |
| 19 | Review links + CTA | TASK 2, TASK 6, TASK 9 |
| 20 | Social profile links | TASK 4, TASK 9 |
| 21 | Driving directions | TASK 3, TASK 6, TASK 9 |
| 22 | Internal links from services/blog to location | TASK 5, TASK 10 |