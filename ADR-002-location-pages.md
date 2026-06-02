# ADR-002: Location Pages

**Date:** 2026-05-12  
**Status:** Proposed  
**Context:** J Land Contracting serves the DMV area from a base in Jefferson, MD. The site currently has no location-specific pages, which limits visibility for high-intent local search queries like "roofing contractor frederick md." Competitors with location pages outrank us for these terms. This ADR defines the architecture for adding city-level location pages using existing project components and patterns.

---

## Decision

We will implement a `/locations/` directory with individual city pages under `/locations/:slug`, backed by a new `locationpage` content collection, reusing existing Astro components and layout patterns.

---

## URL Structure

```
/locations                           → Location index page (list all cities)
/locations/frederick-md              → City location page
/locations/urbana-md                 → City location page
/locations/middletown-md             → City location page
/locations/jefferson-md              → City location page
/locations/walkersville-md           → City location page
/locations/brunswick-md              → City location page
/locations/thurmont-md               → City location page
/locations/mount-airy-md             → City location page
/locations/new-market-md             → City location page
/locations/bethesda-md               → City location page (expanded DMV)
/locations/rockville-md              → City location page (expanded DMV)
/locations/arlington-va              → City location page (Virginia)
/locations/washington-dc             → City location page (DC)
```

**Why `/locations/` and not `/service-areas/` or city-at-root:**

- `/locations/` is the most search-friendly pattern for "roofing [city]" queries — it signals a distinct section Google can identify as a location hub.
- A dedicated directory keeps the URL short and scannable.
- Avoids collisions with existing routes (`/about`, `/services`, `/contact`, `/blog`, `/appointment`).
- Creates a natural breadcrumb hierarchy (Home > Locations > City).
- The `-state` suffix disambiguates cities (there is a Frederick, CO; a Urbana, IL; etc.) and matches how users search ("roofer frederick md").

---

## Content Collection Schema

A new `locationpage` collection in `src/types/pages.collection.ts`:

```ts
export const locationpage = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/locations" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string(),
    image: z.string().optional(),
    draft: z.boolean(),
    date: z.coerce.date().optional(),

    city: z.string(),
    state: z.string(),
    state_full: z.string(),
    county: z.string(),
    slug: z.string(),

    geo: z.object({
      latitude: z.string(),
      longitude: z.string(),
    }),

    population: z.string().optional(),

    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      image: z.string(),
    }),

    intro: z.string(),

    services: z.array(z.object({
      slug: z.string(),
      title_override: z.string().optional(),
      description_override: z.string().optional(),
    })),

    why_choose_us: z.object({
      enable: z.boolean(),
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      features: z.array(z.string()).optional(),
    }),

    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),

    nearby_areas: z.array(z.object({
      name: z.string(),
      slug: z.string(),
    })).optional(),

    testimonials: z.array(z.object({
      name: z.string(),
      designation: z.string(),
      avatar: z.string(),
      content: z.string(),
    })).optional(),

    contact_form: z.object({
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
      button_label: z.string(),
    }),

    google_map: z.object({
      enable: z.boolean(),
      embed_url: z.string().optional(),
    }).optional(),
  }),
});
```

Register in `src/content.config.ts`:

```ts
import { locationpage } from "./types/pages.collection";

export const collections = {
  // ...existing...
  locationpage,
};
```

---

## Directory Structure

```
src/content/locations/
  -index.md                    → Index page frontmatter (title, description, hero)
  frederick-md.md
  urbana-md.md
  middletown-md.md
  jefferson-md.md
  walkersville-md.md
  brunswick-md.md
  thurmont-md.md
  mount-airy-md.md
  new-market-md.md

src/pages/locations/
  index.astro                  → /locations (listing page)
  [single].astro               → /locations/:slug (individual city page)
```

---

## Page Layouts

### Location Index Page (`/locations`)

Lists all locations with cards linking to individual city pages. Reuses the pattern from `services/index.astro`.

```
<Base>
  <TitleCenter title description />
  <section> — Grid of location cards (city, state, short description, "Learn More" link)
  <CallToAction />
</Base>
```

**Schema.org:** `CollectionPage` + `BreadcrumbList` (Home > Locations)

### Individual Location Page (`/locations/:slug`)

```
┌─────────────────────────────────────────────────────────────────┐
│ <Base> with location-specific schemaData                        │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Hero Section (location-specific)                          │  │
│  │ - city name, tagline, hero image                          │  │
│  │ - CTA button → /appointment                               │  │
│  │  [Existing pattern from HeroBanner.astro but simplified]  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Intro Section                                              │  │
│  │ - Markdown content from frontmatter.intro                  │  │
│  │  [Reuse TitleCenter + content div pattern from [regular]] │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Services at this Location                                  │  │
│  │ - Grid of ServiceCards filtered to location.services[]     │  │
│  │  [Reuse ServiceCard component from layouts/components/]    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Why Choose Us                                              │  │
│  │ - Location-specific or fallback to default                 │  │
│  │  [Reuse WhyChooseUs partial, pass location data]           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Location FAQs                                              │  │
│  │ - location.faqs (if provided) + fallback to global FAQs    │  │
│  │  [Reuse FAQs accordion pattern from partials/FAQs.astro]   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Testimonials                                               │  │
│  │ - Location-specific or global fallback                     │  │
│  │  [Reuse Testimonial partial]                               │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Contact Form + Map                                         │  │
│  │ - Inline contact form (reuse from services/[single])       │  │
│  │ - Google Map embed (reuse from contact.astro)              │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Nearby Areas                                               │  │
│  │ - Internal links to nearby_areas[]                         │  │
│  │ - New simple component: NearbyAreas.astro                  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  <CallToAction />  [Reuse existing global partial]              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Schema.org Structured Data

Each location page includes a `HomeAndContractTrade` schema (subclass of `LocalBusiness`) with location-specific data:

```json
[
  {
    "@context": "https://schema.org",
    "@type": "HomeAndContractTrade",
    "name": "J Land Contracting",
    "url": "https://jlandgroup.com/locations/frederick-md",
    "telephone": "(410) 292-0801",
    "email": "info@jlandgroup.com",
    "image": "https://jlandgroup.com/images/locations/frederick-md-hero.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Frederick",
      "addressRegion": "MD",
      "postalCode": "21701",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.4143",
      "longitude": "-77.4105"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "39.4143",
        "longitude": "-77.4105"
      },
      "geoRadius": "32187"
    },
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "12:00"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Roofing Services in Frederick, MD",
      "itemListElement": []
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://jlandgroup.com"
      },
      {
        "@type": "ListItem",
         "position": 2,
        "name": "Locations",
        "item": "https://jlandgroup.com/locations"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Frederick, MD",
        "item": "https://jlandgroup.com/locations/frederick-md"
      }
    ]
  }
]
```

---

## Section-by-Section Content Expectations

| Section | Source | Reused Component | Fallback |
|---|---|---|---|
| **Hero** | `hero.title`, `hero.subtitle`, `hero.image` | New `LocationHero.astro` (simplified HeroBanner pattern) | None |
| **Intro** | Markdown body + `intro` frontmatter | TitleCenter + `<Content />` pattern from `[regular].astro` | None |
| **Services** | `services[]` array (cross-references `servicepage` slugs) | ServiceCard grid (same as `services/index.astro`) | None |
| **Why Choose Us** | `why_choose_us` with location overrides | WhyChooseUs partial | Homepage `why_choose_us` data |
| **FAQs** | `faqs[]` | FAQ accordion (extract from `FAQs.astro` or inline) | Global `faqsSection` collection |
| **Testimonials** | `testimonials[]` | Testimonial partial (accept data as props) | Global `testimonialSection` collection |
| **Contact Form** | `contact_form` frontmatter | Inline form (same as `services/[single].astro`) | None |
| **Google Map** | `google_map.embed_url` | Iframe (same as `contact.astro`) | `config.google_map.embed_url` |
| **Nearby Areas** | `nearby_areas[]` | New `NearbyAreas.astro` component | None |
| **CTA** | Global `ctaSection` | CallToAction partial | N/A (always global) |

---

## Component Reuse Map

### Components requiring NO changes

- `Base.astro` — pass schemaData + frontmatter props as-is
- `TitleCenter.astro` — used for section headers
- `ServiceCard.astro` — reuse with service data fetched from `servicepage` collection
- `CallToAction.astro` — global partial, no changes
- `ImageMod.astro` — used throughout
- `Button.astro` — for CTAs
- `SEO.astro` — handles meta/OG tags from Base props

### Components requiring minor adaptation

- `WhyChooseUs.astro` — currently typed to `CollectionEntry<"aboutpage">["data"]["why_choose_us"]`. Loosen the type to a generic interface so location data can be passed. The location schema's `why_choose_us` shape (`enable`, `title`, `description`, `image`, `features[]`) matches the existing shape, so only the TypeScript type needs relaxing:

```ts
type WhyChooseUsData = {
  enable: boolean;
  title?: string;
  description?: string;
  image?: string;
  features?: string[];
};

type Props = {
  data: WhyChooseUsData;
  backgroundColor?: string;
  fallbackData?: WhyChooseUsData;
};
```

When a location doesn't provide `why_choose_us` overrides, the template passes the homepage/about page `why_choose_us` data as `fallbackData`.

- `FAQs.astro` / `Testimonial.astro` — currently read from global collections. Extract the accordion/carousel UI into prop-based components, or create lightweight wrapper components that accept data as props. The global partials continue to read from their collections; location pages pass data directly.

### New components needed

| File | Purpose |
|---|---|
| `src/pages/locations/index.astro` | Location listing page |
| `src/pages/locations/[single].astro` | Individual location page |
| `src/layouts/partials/NearbyAreas.astro` | Nearby areas internal linking section |
| `src/layouts/partials/LocationHero.astro` | Simplified hero for location pages (or inline in `[single].astro`) |

---

## Service Cross-Reference Strategy

The `services[]` array in each location's frontmatter references services by slug:

```yaml
services:
  - slug: roof-replacement
  - slug: free-inspection
  - slug: damage-repairs
    title_override: "Storm Damage Repair in Frederick, MD"
  - slug: commercial-roofing
  - slug: roof-renovation
```

In the `[single].astro` template, fetch the full service data and apply overrides:

```ts
const allServices = await getSinglePage("servicepage");
const locationServices = services
  .map(s => {
    const svc = allServices.find(svc => svc.id === s.slug);
    if (!svc) return null;
    return {
      ...svc,
      data: {
        ...svc.data,
        title: s.title_override || svc.data.title,
        description: s.description_override || svc.data.description,
      }
    };
  })
  .filter(Boolean);
```

This lets ServiceCards render with location-specific titles while pulling icons and images from the service collection.

---

## FAQ Strategy

Two approaches considered:

**Option A: Props-based (Recommended)** — Extract the FAQ accordion UI from `FAQs.astro` into a reusable `FAQAccordion.astro` component that accepts `faqs_list` as a prop. The global `FAQs.astro` partial continues to read from the `faqsSection` collection. Location pages pass `location.faqs` directly to `FAQAccordion`. If `location.faqs` is empty, fall back to the global FAQ data.

**Option B: Collection-per-location** — Create a `locationFaqSection` that reads per-location FAQ files. This adds content management overhead without much benefit and is rejected.

---

## Navigation Integration

Add "Locations" to `src/config/menu.json`:

```json
{
  "main": [
    { "name": "Home", "url": "/" },
    { "name": "About", "url": "/about" },
    { "name": "Services", "url": "/services" },
    { "name": "Locations", "url": "/locations" },
    { "name": "Appointment", "url": "/appointment" },
    { "name": "Contact", "url": "/contact" },
    { "name": "Blog", "url": "/blog" }
  ],
  "footer": [
    {
      "title": "Service Areas",
      "children": [
        { "name": "Frederick, MD", "url": "/locations/frederick-md" },
        { "name": "Urbana, MD", "url": "/locations/urbana-md" },
        { "name": "Jefferson, MD", "url": "/locations/jefferson-md" },
        { "name": "Middletown, MD", "url": "/locations/middletown-md" },
        { "name": "All Locations", "url": "/locations" }
      ]
    }
  ]
}
```

---

## Internal Linking Mesh

Location pages should cross-link to:

- **Services** → Each location page links to service pages (`/services/roof-replacement`), and service pages should add a "Service Areas" section linking back to locations.
- **Nearby locations** → `nearby_areas[]` creates a geographic mesh between location pages.
- **Homepage** → The homepage's `areaServed` in schema.org is already set; add a "Areas We Serve" section that links to `/locations`.
- **Blog posts** → Future blog posts about specific areas can link to location pages.

---

## Example Location Content File

`src/content/locations/frederick-md.md`:

```md
---
title: "Roofing Services in Frederick, MD"
meta_title: "Roofing Contractor Frederick MD | J Land Contracting"
description: "Professional roofing services in Frederick, MD — roof replacement, storm damage repair, free inspections, and insurance claim support. J Land Contracting has served 1,500+ Frederick County homeowners with integrity."
image: "/images/locations/frederick-md-hero.jpg"
draft: false

city: "Frederick"
state: "MD"
state_full: "Maryland"
county: "Frederick County"
slug: "frederick-md"

geo:
  latitude: "39.4143"
  longitude: "-77.4105"

population: "~90,000"

hero:
  title: "Trusted Roofing in Frederick, MD"
  subtitle: "From downtown historic homes to new builds in Urbana — J Land Contracting has served Frederick County homeowners for over 27 years."
  image: "/images/locations/frederick-md-hero.jpg"

intro: |
  Frederick is the second-largest city in Maryland — and one of the fastest-growing. That growth means more homes, more roofs, and more storm exposure across the I-270 corridor and the Catoctin Mountain foothills.

  J Land Contracting is based right here in Jefferson, just minutes from downtown Frederick. We've inspected, repaired, and replaced roofs in every neighborhood from Baker Park to Wormans Mill, from Ballenger Creek to Tuscarora. When Frederick homeowners need a roofer they can trust, they call us — and we show up.

services:
  - slug: roof-replacement
    title_override: "Roof Replacement in Frederick, MD"
  - slug: free-inspection
  - slug: damage-repairs
    title_override: "Storm Damage Repair in Frederick, MD"
  - slug: commercial-roofing
  - slug: roof-renovation

why_choose_us:
  enable: true
  title: "Why Frederick homeowners choose J Land."
  description: "We've completed over 1,500 roofing projects across Frederick County. When your neighbors in Urbana, Walkersville, and Mount Airy need a roof they can rely on, they call J Land."
  image: "/images/why-choose-us.jpg"
  features:
    - "**Local Expertise**: We know Frederick's weather — from Catoctin Mountain thunderstorms to winter freeze-thaw cycles — and how it impacts your roof."
    - "**Insurance Claim Support**: We handle the entire claim process with your insurer, so you never deal with adjusters alone."
    - "**Free Inspections**: No cost, no pressure. We'll tell you honestly whether your roof needs work or not."

faqs:
  - question: "Do you offer free roof inspections in Frederick, MD?"
    answer: "Yes. J Land Contracting provides free, no-obligation roof inspections throughout Frederick and Frederick County. We'll come to your home, assess the condition of your roof, and give you an honest report — typically within 2–3 business days of your request."
  - question: "How long does a roof replacement take in Frederick?"
    answer: "Most residential roof replacements in the Frederick area are completed in 1–2 days. Our vetted contractor crews are experienced with Frederick's building codes and permit requirements, and we handle all scheduling and coordination on your behalf."
  - question: "Does J Land Contracting help with insurance claims for storm damage in Frederick County?"
    answer: "Yes — insurance claim coordination is a core part of our service. Frederick County sees frequent thunderstorms and high winds, especially during spring and summer. If your roof has storm damage, we document it, communicate directly with your insurer, and coordinate the repair from start to finish."

nearby_areas:
  - name: "Urbana"
    slug: "urbana-md"
  - name: "Jefferson"
    slug: "jefferson-md"
  - name: "Middletown"
    slug: "middletown-md"
  - name: "Walkersville"
    slug: "walkersville-md"
  - name: "Mount Airy"
    slug: "mount-airy-md"

testimonials:
  - name: "Gene Buckalew"
    designation: "Homeowner, Frederick, MD"
    avatar: "/images/avatar/jland-contracting-google-review-customer-gene-buckalew.png"
    content: "Jland Contracting did a professional and noteworthy job of replacing my storm damaged roofing and siding. There were no 'games' played with the inspection and interaction with my home insurer."
  - name: "Leah Walker"
    designation: "Homeowner, Urbana, MD"
    avatar: "/images/avatar/jland-contracting-google-review-customer-leah-walker.png"
    content: "During the stressful time dealing with roof related issues, it was very helpful to have Danny constantly checking in with me and providing an honest and reliable service."

contact_form:
  enable: true
  title: "Get a free estimate in Frederick"
  description: "Tell us about your project and we'll get back to you within 24 hours."
  button_label: "Request a Free Estimate"

google_map:
  enable: true
  embed_url: "https://maps.google.com/maps?q=Frederick,+MD&t=&z=13&ie=UTF8&iwloc=&output=embed"
---

## Serving Frederick, MD

Frederick is home — and we treat every roof like it's our own. Whether you're in a historic property near Baker Park, a new development off I-270, or a rural home outside Middletown, J Land Contracting brings the same commitment: honest assessments, quality work, and full insurance claim support when storm damage strikes.

### Frederick's Roofing Challenges

Frederick's location at the foot of the Catoctin Mountains creates unique roofing challenges. The mountain corridors funnel high winds, summer thunderstorms bring heavy rain and hail, and winter freeze-thaw cycles are harder on roofing materials than in milder parts of Maryland. Homes in valley areas like Jefferson and Adamstown experience strong downdrafts that can damage shingles without visible signs from the ground.

### Our Frederick Service Area

We serve all of Frederick County, including:

- Downtown Frederick and the historic district
- Urbana and Urbana Highlands
- Ballenger Creek and Tuscarora
- Spring Ridge and Lake Linganore
- Walkersville and Woodsboro
- Thurmont and Emmitsburg
- Brunswick and Point of Rocks
- Middletown and Myersville
- New Market and Mount Airy
```

---

## Template Pseudocode for `[single].astro`

```astro
---
import Base from "@/layouts/Base.astro";
import TitleCenter from "@/components/TitleCenter.astro";
import ServiceCard from "@/layouts/components/ServiceCard.astro";
import WhyChooseUs from "@/partials/WhyChooseUs.astro";
import CallToAction from "@/partials/CallToAction.astro";
import ImageMod from "@/components/ImageMod.astro";
import Button from "@/components/Button.astro";
import { getSinglePage, getListPage } from "@/lib/contentParser.astro";
import { render } from "astro:content";

export async function getStaticPaths() {
  const locations = await getSinglePage("locationpage");
  return locations.map((loc) => ({
    params: { single: loc.id },
    props: { location: loc },
  }));
}

const { location } = Astro.props;
const { Content } = await render(location);
const {
  city, state, state_full, county, slug, geo, hero, intro, services,
  why_choose_us, faqs, nearby_areas, testimonials, contact_form,
  google_map
} = location.data;

// Fetch full service data for cross-referenced services
const allServices = await getSinglePage("servicepage");
const locationServices = services
  .map(s => {
    const svc = allServices.find(svc => svc.id === s.slug);
    if (!svc) return null;
    return {
      ...svc,
      data: {
        ...svc.data,
        title: s.title_override || svc.data.title,
        description: s.description_override || svc.data.description,
      }
    };
  })
  .filter(Boolean);

// Fallback data
const homepage = await getListPage("homepage", "-index");
const globalWhyChooseUs = homepage.data.why_choose_us;
const faqSection = await getListPage("faqsSection", "faqs");
const testimonialSection = await getListPage("testimonialSection", "testimonial");

// Determine effective why_choose_us
const effectiveWhyChooseUs = why_choose_us.enable ? {
  enable: true,
  title: why_choose_us.title || globalWhyChooseUs.title,
  description: why_choose_us.description || globalWhyChooseUs.description,
  image: why_choose_us.image || globalWhyChooseUs.image,
  features: why_choose_us.features || globalWhyChooseUs.features,
} : globalWhyChooseUs;

// Determine effective FAQs
const effectiveFaqs = (faqs && faqs.length > 0)
  ? faqs
  : faqSection.data.faqs_list;

// Determine effective testimonials
const effectiveTestimonials = (testimonials && testimonials.length > 0)
  ? testimonials
  : testimonialSection.data.testimonials;

// Schema.org
const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "HomeAndContractTrade",
    "name": "J Land Contracting",
    "url": `https://jlandgroup.com/locations/${slug}`,
    "telephone": "(410) 292-0801",
    "email": "info@jlandgroup.com",
    "image": hero.image
      ? `https://jlandgroup.com${hero.image}`
      : "https://jlandgroup.com/images/og-image.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": state,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geo.latitude,
      "longitude": geo.longitude
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": geo.latitude,
        "longitude": geo.longitude
      },
      "geoRadius": "32187"
    },
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        "opens": "08:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "12:00"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Roofing Services in ${city}, ${state}`,
      "itemListElement": locationServices.map((svc, i) => ({
        "@type": "Offer",
        "position": i + 1,
        "itemOffered": {
          "@type": "Service",
          "name": svc.data.title,
          "description": svc.data.description,
          "url": `https://jlandgroup.com/services/${svc.id}`
        }
      }))
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://jlandgroup.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": "https://jlandgroup.com/locations"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${city}, ${state}`,
        "item": `https://jlandgroup.com/locations/${slug}`
      }
    ]
  }
];
---

<Base {...location.data} schemaData={schemaData}>
  <!-- Hero -->
  <section class="relative pt-40 pb-12 lg:pb-16 lg:pt-56">
    <ImageMod
      src={hero.image}
      alt={`${city}, ${state}`}
      class="absolute inset-0 w-full h-full object-cover"
      width={1900}
      height={800}
      format="webp"
    />
    <div class="container relative z-10">
      <h1 class="text-text-light mb-4" set:html={hero.title} />
      <p class="text-text-light text-xl mb-10">{hero.subtitle}</p>
      <Button data={{ enable: true, label: "Book A Free Consultation", link: "/appointment", icon: "FaPhone" }} />
    </div>
  </section>

  <!-- Intro -->
  <section class="section-lg">
    <div class="container">
      <TitleCenter title={location.data.title} description={location.data.description} />
      <div class="lg:w-[80%] mx-auto content">
        <Content />
      </div>
    </div>
  </section>

  <!-- Services at this Location -->
  <section class="section bg-light">
    <div class="container">
      <TitleCenter title={`Our services in ${city}, ${state}`} centerText />
      <div class="grid md:grid-cols-2 xl:grid-cols-3 mt-16 gap-8 md:gap-6">
        {locationServices.map(svc => <ServiceCard data={svc.data} id={svc.id} />)}
      </div>
    </div>
  </section>

  <!-- Why Choose Us -->
  <WhyChooseUs data={effectiveWhyChooseUs} />

  <!-- FAQs -->
  <!-- Render FAQ accordion with effectiveFaqs data -->

  <!-- Testimonials -->
  <!-- Render testimonial carousel with effectiveTestimonials -->

  <!-- Contact Form + Map -->
  <section class="section-lg">
    <div class="container flex max-lg:flex-col gap-16 items-center">
      <div class="lg:w-[45%]">
        <TitleCenter title={contact_form.title} description={contact_form.description} />
      </div>
      <div class="lg:w-[55%]">
        <!-- Form markup reused from services/[single].astro pattern -->
      </div>
    </div>
    {google_map?.enable && google_map.embed_url && (
      <div class="container mt-16">
        <iframe src={google_map.embed_url} width="100%" height="500" style={{ border: 0 }} loading="lazy" title={`${city}, ${state} map`} />
      </div>
    )}
  </section>

  <!-- Nearby Areas -->
  {nearby_areas && nearby_areas.length > 0 && (
    <section class="section bg-light">
      <div class="container">
        <h2 class="h2 text-center">Also serving nearby areas</h2>
        <div class="grid md:grid-cols-3 gap-6 mt-12">
          {nearby_areas.map(area => (
            <a href={`/locations/${area.slug}`} class="block p-6 bg-body rounded-xl hover:shadow-lg transition-shadow">
              <h3 class="h5">{area.name}, {state}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  )}

  <CallToAction />
</Base>
```

---

## SEO Considerations

- Each location page gets a unique `meta_title`, `description`, and `<h1>` with the city+state pattern ("Roofing Contractor Frederick MD").
- `HomeAndContractTrade` schema with per-city `geo`, `addressLocality`, and `areaServed`.
- BreadcrumbList schema: Home > Locations > City, State.
- Internal linking mesh between locations, services, and homepage creates topical authority.
- The `/locations` index page acts as a sitemap for crawlers and a hub for users.
- Each location page cross-links to its services, which reinforces the service-location relationship Google uses for local ranking.

---

## Files to Create/Modify

| Action | File |
|---|---|
| **Create** | `ADR-002-location-pages.md` (this file) |
| **Create** | `src/types/pages.collection.ts` — add `locationpage` collection export |
| **Modify** | `src/content.config.ts` — register `locationpage` collection |
| **Create** | `src/content/locations/` directory |
| **Create** | `src/content/locations/-index.md` — index page frontmatter |
| **Create** | `src/content/locations/frederick-md.md` (and other cities) |
| **Create** | `src/pages/locations/index.astro` — listing page |
| **Create** | `src/pages/locations/[single].astro` — individual location page |
| **Create** | `src/layouts/partials/NearbyAreas.astro` — nearby areas section |
| **Create** | `src/layouts/partials/LocationHero.astro` — location hero section |
| **Modify** | `src/layouts/partials/WhyChooseUs.astro` — loosen type to accept generic data |
| **Modify** | `src/config/menu.json` — add "Locations" to nav + footer |
| **Modify** | `src/pages/index.astro` — add internal link to /locations from homepage |
| **Optional** | `src/layouts/partials/FAQAccordion.astro` — extract reusable accordion from `FAQs.astro` |

---

## Consequences

**Positive:**
- Captures high-intent local search traffic ("roofing frederick md", "roof replacement urbana md").
- Each location page has unique content, unique schema, and unique URLs — no duplicate content risk.
- Reuses existing component architecture (ServiceCard, WhyChooseUs, CallToAction, TitleCenter, Base, SEO).
- Content-driven: adding a new location is just a new `.md` file — no code changes.
- Internal linking mesh strengthens site-wide SEO authority.
- Service cross-references mean location pages stay in sync with the service collection automatically.

**Negative:**
- Each location page requires unique, quality content to avoid thin-content penalties. Copy-paste templates with only city name swapped will hurt rather than help.
- More pages to maintain when services or business details change.
- WhyChooseUs partial needs a type refactor to accept generic data (low risk).
- Need to create hero images for each location (photography or stock imagery).