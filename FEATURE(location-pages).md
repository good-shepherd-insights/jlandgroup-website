# FEATURE(location-pages): Implement Location Pages

**Date:** 2026-05-12  
**ADR Reference:** ADR-002-location-pages.md  
**Status:** Pending Approval  

---

## Objective

Implement a `/locations/` section with an index listing page and individual city pages at `/locations/:slug`, backed by a new `locationpage` content collection. Reuse existing components (Base, TitleCenter, ServiceCard, CallToAction, ImageMod, Button, WhyChooseUs, FAQs, Testimonial). For sections that need new components (LocationHero, NearbyAreas, LocationFAQs, LocationTestimonials), leave inline placeholders matching existing patterns so the page compiles and renders without stub files.

---

## Known Limitations

- **Hardcoded geo meta tags:** `src/components/SEO.astro:73-76` hardcodes `geo.region=US-MD`, `geo.placename=Jefferson, MD`, and fixed lat/long coordinates. For location pages outside Maryland (e.g., Arlington VA, Washington DC), these meta tags will be incorrect. This is a pre-existing issue not introduced by this feature. A follow-up task should make these geo meta tags dynamic based on page props passed through `Base.astro`.

---

## Phase 1: Content Collection Schema

**Justification:** The `locationpage` collection must be registered before any page templates or content files can reference it. The schema follows the ADR and matches existing collection patterns (singleton `-index.md` for the listing page, individual `.md` files for each city). The `commonFields` spread is NOT used because the location schema has too many unique fields; instead, `title`, `description`, `meta_title`, `image`, `draft`, and `date` are declared inline to match the same shape.

**Decisions:**
- `slug` is NOT included in the schema. The content collection's `id` (derived from the filename) already serves as the slug. Including both would create a duplication risk where the two values diverge. All templates use `location.id` for URL generation.
- `intro` is NOT included in the schema. The markdown body (rendered via `<Content />`) serves this purpose, matching the pattern used by `services/[single].astro` and `[regular].astro`.

**Target:** `src/types/pages.collection.ts` (append after line 210)  
**Action:** Add `locationpage` export

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

    city: z.string().optional(),
    state: z.string().optional(),
    state_full: z.string().optional(),
    county: z.string().optional(),

    geo: z.object({
      latitude: z.string(),
      longitude: z.string(),
    }).optional(),

    population: z.string().optional(),

    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      image: z.string(),
    }).optional(),

    services: z.array(z.object({
      slug: z.string(),
      title_override: z.string().optional(),
      description_override: z.string().optional(),
    })).optional(),

    why_choose_us: z.object({
      enable: z.boolean(),
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      features: z.array(z.string()).optional(),
    }).optional(),

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
    }).optional(),

    google_map: z.object({
      enable: z.boolean(),
      embed_url: z.string().optional(),
    }).optional(),
  }),
});
```

**Why all location-specific fields are optional:** The `-index.md` file (used by the listing page) only needs `title`, `description`, `image`, `draft`. It does not provide `city`, `state`, `geo`, `hero`, etc. If these were required, the `-index.md` would fail Zod validation. The `servicepage` collection follows the same pattern — `commonFields` are required, and all service-specific fields (`featured`, `contact_form`) are optional. The `[single].astro` template handles absent location data with global fallbacks (see Phase 5).

---

## Phase 2: Register Collection

**Justification:** Astro's content layer requires the collection to be exported from `content.config.ts` before the dev server or build can resolve it.

**Target:** `src/content.config.ts`  
**Action:** Add import and export

Replace the import block (lines 1-10):

```ts
import {
  aboutpage,
  appointmentpage,
  blogpage,
  contactpage,
  homepage,
  locationpage,
  regularpage,
  servicepage,
  designpage,
} from "./types/pages.collection";
```

Add `locationpage` to the collections object (after line 27):

```ts
export const collections = {
  // Pages
  homepage,
  blogpage,
  aboutpage,
  servicepage,
  appointmentpage,
  contactpage,
  regularpage,
  designpage,
  locationpage,

  // sections
  ctaSection,
  testimonialSection,
  faqsSection,
};
```

---

## Phase 3: Content Files

**Justification:** The index page and frederick-md.md are the minimum viable content to build and test the page templates. Only frederick-md is created now; other cities can be added later by copying the pattern.

**Note:** The `slug` and `intro` fields from the ADR are omitted. The slug is derived from the filename (e.g., `frederick-md.md` → id `frederick-md`). The intro content lives in the markdown body, rendered via `<Content />`.

### 3a: Index page content

**Target:** `src/content/locations/-index.md` (NEW FILE)

```md
---
title: "Roofing Services Across the DMV"
meta_title: "Service Areas | J Land Contracting"
description: "J Land Contracting provides professional roofing services across Maryland, Virginia, and DC. Find a roofing contractor near you in Frederick, Urbana, Jefferson, and the greater DMV area."
image: "/images/og-image.png"
draft: false
---
```

### 3b: Frederick location content

**Target:** `src/content/locations/frederick-md.md` (NEW FILE)

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

geo:
  latitude: "39.4143"
  longitude: "-77.4105"

population: "~90,000"

hero:
  title: "Trusted Roofing in Frederick, MD"
  subtitle: "From downtown historic homes to new builds in Urbana — J Land Contracting has served Frederick County homeowners for over 27 years."
  image: "/images/locations/frederick-md-hero.jpg"

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

Frederick is the second-largest city in Maryland — and one of the fastest-growing. That growth means more homes, more roofs, and more storm exposure across the I-270 corridor and the Catoctin Mountain foothills.

J Land Contracting is based right here in Jefferson, just minutes from downtown Frederick. We've inspected, repaired, and replaced roofs in every neighborhood from Baker Park to Wormans Mill, from Ballenger Creek to Tuscarora. When Frederick homeowners need a roofer they can trust, they call us — and we show up.

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

## Phase 4: Location Index Page

**Justification:** The listing page follows the exact pattern of `services/index.astro` — fetch `locationpage` entries (which `getSinglePage` auto-filters for `draft: false` and `!id.startsWith("-")`), then render in a grid. No new component needed; the card markup is inline and simple (city, state, description, link).

**Target:** `src/pages/locations/index.astro` (NEW FILE)

```astro
---
import TitleCenter from "@/components/TitleCenter.astro";
import Base from "@/layouts/Base.astro";
import { getListPage, getSinglePage } from "@/lib/contentParser.astro";
import Testimonial from "@/partials/Testimonial.astro";
import CallToAction from "@/partials/CallToAction.astro";

const pageIndex = await getListPage("locationpage", "-index");
if (pageIndex.data.draft) return Astro.redirect("/404");
const locations = await getSinglePage("locationpage");

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageIndex.data.title,
    "description": pageIndex.data.description,
    "url": "https://jlandgroup.com/locations",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Service Areas",
      "numberOfItems": locations.length,
      "itemListElement": locations.map((loc, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "City",
          "name": `${loc.data.city}, ${loc.data.state}`,
          "url": `https://jlandgroup.com/locations/${loc.id}`
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
      }
    ]
  }
];
---

<Base {...pageIndex.data} schemaData={schemaData}>
  <section class="section-lg">
    <div class="container">
      <TitleCenter
        title={pageIndex.data.title}
        description={pageIndex.data.description}
        centerText
      />

      <div class="grid md:grid-cols-2 xl:grid-cols-3 mt-16 gap-8 md:gap-6">
        {
          locations?.map((loc) => (
            <div class="border border-border rounded-xl p-8 flex flex-col">
              <h3 class="h5 font-semibold mb-4">{loc.data.city}, {loc.data.state}</h3>
              <p class="mb-6 grow">{loc.data.description}</p>
              <a
                href={`/locations/${loc.id}`}
                class="mt-auto inline-block text-text-dark/75 font-medium group"
              >
                Learn More
                <span class="inline-block transition-transform group-hover:translate-x-2 duration-300 text-xl ml-1">
                  &rarr;
                </span>
              </a>
            </div>
          ))
        }
      </div>
    </div>
  </section>
  <Testimonial />
  <CallToAction />
</Base>
```

---

## Phase 5: Individual Location Page

**Justification:** The `[single].astro` page follows the `services/[single].astro` pattern for `getStaticPaths` and data fetching. It composes existing partials (WhyChooseUs, CallToAction) and inlines patterns from other pages (hero from HeroBanner layout, contact form from `[single].astro`, map from `contact.astro`). Sections that would need new components are left as inline placeholders with comments.

**Key decisions:**
- Uses `location.id` (not `slug` from frontmatter) for all URL generation — single source of truth.
- FAQ accordion `<script>` is included directly in this file. Without it, the FAQ accordion would be non-functional on a cold page load (user landing on `/locations/frederick-md` directly from search). The script in `FAQs.astro` only runs if that component is rendered on the same page.
- No `plainDescription` variable — it was unused.

**Target:** `src/pages/locations/[single].astro` (NEW FILE)

```astro
---
import ImageMod from "@/components/ImageMod.astro";
import TitleCenter from "@/components/TitleCenter.astro";
import Button from "@/components/Button.astro";
import ServiceCard from "@/layouts/components/ServiceCard.astro";
import Base from "@/layouts/Base.astro";
import config from "@/config/config.json";
import { getSinglePage, getListPage } from "@/lib/contentParser.astro";
import { markdownify } from "@/lib/utils/textConverter";
import WhyChooseUs from "@/partials/WhyChooseUs.astro";
import CallToAction from "@/partials/CallToAction.astro";
import { render } from "astro:content";

export async function getStaticPaths() {
  const locations = await getSinglePage("locationpage");

  const paths = locations.map((loc) => ({
    params: {
      single: loc.id,
    },
    props: { location: loc },
  }));
  return paths;
}

const { location } = Astro.props;
const { Content } = await render(location);
const {
  city, state, state_full, county, geo, hero,
  services, why_choose_us, faqs, nearby_areas,
  testimonials, contact_form, google_map,
} = location.data;

const locationSlug = location.id;

// Fetch full service data for cross-referenced services
const allServices = await getSinglePage("servicepage");
const locationServices = (services || [])
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
const effectiveFaqs = (faqs && faqs.length > 0) ? faqs : faqSection.data.faqs_list;

const testimonialSection = await getListPage("testimonialSection", "testimonial");
const effectiveTestimonials = (testimonials && testimonials.length > 0)
  ? testimonials
  : testimonialSection.data.testimonials;

// Determine effective why_choose_us (location overrides > global fallback)
const effectiveWhyChooseUs = (why_choose_us && why_choose_us.enable) ? {
  enable: true,
  title: why_choose_us.title || globalWhyChooseUs.title,
  description: why_choose_us.description || globalWhyChooseUs.description,
  image: why_choose_us.image || globalWhyChooseUs.image,
  features: why_choose_us.features || globalWhyChooseUs.features,
} : globalWhyChooseUs;

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "HomeAndContractTrade",
    "name": "J Land Contracting",
    "url": `https://jlandgroup.com/locations/${locationSlug}`,
    "telephone": "(410) 292-0801",
    "email": "info@jlandgroup.com",
    "image": hero?.image
      ? `https://jlandgroup.com${hero.image}`
      : "https://jlandgroup.com/images/og-image.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city || "Jefferson",
      "addressRegion": state || "MD",
      "addressCountry": "US"
    },
    "geo": geo ? {
      "@type": "GeoCoordinates",
      "latitude": geo.latitude,
      "longitude": geo.longitude
    } : undefined,
    "areaServed": geo ? {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": geo.latitude,
        "longitude": geo.longitude
      },
      "geoRadius": "32187"
    } : undefined,
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
        "item": `https://jlandgroup.com/locations/${locationSlug}`
      }
    ]
  }
];
---

<Base {...location.data} schemaData={schemaData}>
  <!-- ===== HERO (inline — will become LocationHero.astro) ===== -->
  {
    hero && (
      <section class="relative pt-40 pb-12 lg:pb-16 lg:pt-56 overflow-hidden">
        <ImageMod
          src={hero.image}
          alt={`${city}, ${state}`}
          class="absolute inset-0 w-full h-full object-cover"
          width={1900}
          height={800}
          format="webp"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-dark/70 to-dark/30" />
        <div class="container relative z-10">
          <div class="lg:max-w-[65%]">
            <h1
              class="mb-4 lg:text-[80px] lg:leading-24 text-text-light max-lg:text-center"
              set:html={markdownify(hero.title)}
            />
            <p
              class="mb-10 text-text-light text-xl max-lg:text-center"
              set:html={markdownify(hero.subtitle)}
            />
            <div class="flex gap-6 flex-wrap max-lg:justify-center">
              <Button data={{ enable: true, label: "Book A Free Consultation", link: "/appointment", icon: "FaPhone" }} />
              <Button data={{ enable: true, label: "Explore Our Services", link: "/services", icon: "" }} variant="outline" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  <!-- ===== INTRO ===== -->
  <section class="section-lg">
    <div class="container">
      <TitleCenter
        title={location.data.title}
        description={location.data.description}
        className="mb-26"
        centerText
      />
      <div class="lg:w-[80%] mx-auto">
        <div class="content">
          <Content />
        </div>
      </div>
    </div>
  </section>

  <!-- ===== SERVICES AT THIS LOCATION ===== -->
  {
    locationServices.length > 0 && (
      <section class="section bg-light">
        <div class="container">
          <TitleCenter
            title={`Our services in ${city}, ${state}`}
            centerText
          />
          <div class="grid md:grid-cols-2 xl:grid-cols-3 mt-16 gap-8 md:gap-6">
            {locationServices.map(svc => <ServiceCard data={svc.data} id={svc.id} />)}
          </div>
        </div>
      </section>
    )
  }

  <!-- ===== WHY CHOOSE US ===== -->
  <WhyChooseUs data={effectiveWhyChooseUs} />

  <!-- ===== FAQ (placeholder — will become FAQAccordion.astro) ===== -->
  <!-- Inline FAQ accordion with location-specific data. The script block is included
       here because the one in FAQs.astro only fires if that component is present on
       the page. A user landing directly on a location page from search would have no
       working accordion without this script.
       TODO: Extract FAQAccordion.astro that accepts faqs_list as a prop and includes
       its own script, then replace this section with <FAQAccordion faqs={effectiveFaqs} /> -->
  <section class="section border-t border-border">
    <div class="container">
      <h2 class="h2 text-center">
        {faqs && faqs.length > 0
          ? `Frequently asked questions about roofing in ${city}, ${state}`
          : "Frequently asked questions."
        }
      </h2>
      <p class="text-lg mt-6 mb-6 lg:mb-12 max-w-[80%] mx-auto text-center text-balance">
        We offer a wide range of roofing services and products from trusted manufacturers.
      </p>
      <div class="w-full lg:max-w-218 mx-auto flex flex-col">
        {
          effectiveFaqs.map((faq, i) => (
            <div
              role="button"
              tabindex="0"
              aria-expanded="false"
              aria-controls={`loc-faq-answer-${i}`}
              class="group p-7 border-b border-border cursor-pointer transition-all duration-300 flex flex-col faq-item-fix"
              data-faq-id={i}
            >
              <div class="flex justify-between items-center">
                <h6 set:html={markdownify(faq.question)} />
                <span
                  class="toggle-icon text-text-dark text-[32px] transition-all duration-300 rotate-0"
                  aria-hidden="true"
                >
                  +
                </span>
              </div>
              <p
                id={`loc-faq-answer-${i}`}
                class="faq-answer overflow-hidden max-h-0 opacity-0 transition-[max-height,opacity] duration-[600ms,400ms] ease-in-out max-w-195"
                set:html={markdownify(faq.answer)}
              />
            </div>
          ))
        }
      </div>
    </div>
  </section>

  <!-- ===== TESTIMONIALS (placeholder — will become LocationTestimonials.astro) ===== -->
  <!-- Using inline testimonial rendering. The existing Testimonial.astro reads from
       the testimonialSection collection and cannot accept props.
       TODO: Create a prop-based TestimonialCarousel.astro component. -->
  <section class="section bg-light">
    <div class="container">
      <div class="flex max-lg:flex-col max-lg:text-center gap-6 items-center mb-12 lg:mb-20">
        <div class="flex-2">
          <h2 class="h1 mb-6">See what our clients in {city} say</h2>
          <p class="text-balance text-lg">
            We are proud of the trust we've built with our community. Here is what some of our satisfied customers have to say about our roofing and restoration services.
          </p>
        </div>
      </div>
      <!-- PLACEHOLDER: Render testimonial cards in a simple grid.
           TODO: Replace with TestimonialCarousel.astro using astro-swiper -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {
          effectiveTestimonials.map((item) => (
            <div class="rounded-2xl bg-body p-10 relative">
              <div class="flex items-center relative z-10">
                <div class="text-text-dark">
                  <ImageMod
                    height={70}
                    width={70}
                    class="rounded-full"
                    src={item.avatar}
                    alt={item.name}
                    format="webp"
                  />
                </div>
                <div class="ml-4">
                  <h3 set:text={item.name} class="h6 font-primary font-semibold" />
                  <p set:text={item.designation} class="text-text-dark/80" />
                </div>
              </div>
              <blockquote class="mt-8" set:html={markdownify(item.content)} />
            </div>
          ))
        }
      </div>
    </div>
  </section>

  <!-- ===== CONTACT FORM + MAP ===== -->
  {
    contact_form && contact_form.enable && (
      <section class="section-lg">
        <div class="container">
          <div class="flex max-lg:flex-col gap-16 items-center">
            <div class="lg:w-[45%]">
              <TitleCenter
                title={contact_form.title}
                description={contact_form.description}
                className="xl:w-[80%]"
              />
            </div>
            <div class="w-[90%] md:w-[70%] lg:w-[55%]">
              <form
                action={config.params.contact_form_action}
                method="POST"
                class="bg-dark px-10 py-12 rounded-2xl"
              >
                <fieldset class="mb-8">
                  <label for="loc-name" class="sr-only" aria-label="Full Name" />
                  <input
                    id="loc-name"
                    name="name"
                    class="form-input"
                    placeholder="Full Name"
                    type="text"
                    required
                  />
                </fieldset>
                <fieldset class="mb-8">
                  <label for="loc-phone" class="sr-only" aria-label="Phone Number" />
                  <input
                    id="loc-phone"
                    name="phone"
                    class="form-input"
                    placeholder="Phone Number"
                    type="tel"
                    required
                  />
                </fieldset>
                <fieldset class="mb-8">
                  <label for="loc-service" class="sr-only" aria-label="Service You Need" />
                  <input
                    id="loc-service"
                    name="service_needed"
                    class="form-input"
                    placeholder="Service You Need"
                    type="text"
                    required
                  />
                </fieldset>
                <button class="btn btn-primary w-full" type="submit">
                  {contact_form.button_label}
                </button>
              </form>
            </div>
          </div>

          {
            google_map?.enable && google_map.embed_url && (
              <div class="mt-16">
                <div class="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <iframe
                    src={google_map.embed_url}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowfullscreen={true}
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title={`${city}, ${state} map`}
                  />
                </div>
              </div>
            )
          }
        </div>
      </section>
    )
  }

  <!-- ===== NEARBY AREAS (placeholder — will become NearbyAreas.astro) ===== -->
  {
    nearby_areas && nearby_areas.length > 0 && (
      <section class="section bg-light">
        <div class="container">
          <h2 class="h2 text-center">Also serving nearby areas</h2>
          <div class="grid md:grid-cols-3 xl:grid-cols-5 gap-6 mt-12">
            {
              nearby_areas.map(area => (
                <a
                  href={`/locations/${area.slug}`}
                  class="block p-6 bg-body rounded-xl hover:shadow-lg transition-shadow text-center"
                >
                  <h3 class="h5">{area.name}, {state}</h3>
                </a>
              ))
            }
          </div>
        </div>
      </section>
    )
  }

  <CallToAction />
</Base>

<script>
  interface FAQElements {
    item: HTMLElement;
    answer: HTMLElement;
    icon: HTMLElement;
  }

  class FAQAccordion {
    private items: HTMLElement[];
    private activeItem: HTMLElement | null = null;

    constructor() {
      this.items = Array.from(
        document.querySelectorAll<HTMLElement>(".faq-item-fix"),
      );
      this.init();
    }

    private init(): void {
      if (this.items.length === 0) return;

      this.openItem(this.items[0]);

      this.items.forEach((item) => {
        item.addEventListener("click", (e) => this.handleClick(e, item));
        item.addEventListener("keydown", (e) => this.handleKeydown(e, item));
      });
    }

    private getElements(item: HTMLElement): FAQElements | null {
      const answer = item.querySelector<HTMLElement>(".faq-answer");
      const icon = item.querySelector<HTMLElement>(".toggle-icon");

      if (!answer || !icon) {
        console.warn("FAQ item missing required elements");
        return null;
      }

      return { item, answer, icon };
    }

    private handleClick(e: Event, item: HTMLElement): void {
      e.preventDefault();
      this.toggleItem(item);
    }

    private handleKeydown(e: KeyboardEvent, item: HTMLElement): void {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.toggleItem(item);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        this.focusNext(item);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.focusPrevious(item);
      }
    }

    private focusNext(currentItem: HTMLElement): void {
      const currentIndex = this.items.indexOf(currentItem);
      const nextIndex = (currentIndex + 1) % this.items.length;
      this.items[nextIndex].focus();
    }

    private focusPrevious(currentItem: HTMLElement): void {
      const currentIndex = this.items.indexOf(currentItem);
      const previousIndex =
        currentIndex === 0 ? this.items.length - 1 : currentIndex - 1;
      this.items[previousIndex].focus();
    }

    private toggleItem(item: HTMLElement): void {
      const isCurrentlyActive = this.activeItem === item;

      this.items.forEach((i) => this.closeItem(i));

      if (!isCurrentlyActive) {
        this.openItem(item);
      }
    }

    private openItem(item: HTMLElement): void {
      const elements = this.getElements(item);
      if (!elements) return;

      const { answer, icon } = elements;

      item.setAttribute("aria-expanded", "true");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
      answer.classList.remove("opacity-0");
      answer.classList.add("opacity-100");
      icon.classList.remove("rotate-0");
      icon.classList.add("rotate-180");
      icon.textContent = "−";
      item.classList.remove("bg-transparent", "gap-0");
      item.classList.add("bg-body", "gap-2");

      this.activeItem = item;
    }

    private closeItem(item: HTMLElement): void {
      const elements = this.getElements(item);
      if (!elements) return;

      const { answer, icon } = elements;

      item.setAttribute("aria-expanded", "false");
      answer.style.maxHeight = "0";
      answer.classList.remove("opacity-100");
      answer.classList.add("opacity-0");
      icon.classList.remove("rotate-180");
      icon.classList.add("rotate-0");
      icon.textContent = "+";
      item.classList.remove("bg-dark", "gap-2");
      item.classList.add("bg-body", "gap-2");

      if (this.activeItem === item) {
        this.activeItem = null;
      }
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    new FAQAccordion();
  });

  document.addEventListener("astro:page-load", () => {
    new FAQAccordion();
  });
</script>
```

---

## Phase 6: Loosen WhyChooseUs Type

**Justification:** `WhyChooseUs.astro` currently types its `data` prop as `CollectionEntry<"aboutpage">["data"]["why_choose_us"]` which requires a `title: string` (not optional). The location schema's `why_choose_us` has optional `title`, `description`, `image`, `features` — but the `effectiveWhyChooseUs` computed in Phase 5 always fills in fallback values, so the data passed to WhyChooseUs will always have all required fields. The type just needs to be loosened to accept a plain object instead of a collection entry type.

**Target:** `src/layouts/partials/WhyChooseUs.astro` lines 1-14

Replace the frontmatter type block (lines 1-14):

```astro
---
import ImageMod from "@/components/ImageMod.astro";
import FacebookVideo from "../components/FacebookVideo.astro";
import { markdownify } from "@/lib/utils/textConverter";
import { FaCheck } from "react-icons/fa6";

type Props = {
  data: {
    enable: boolean;
    title: string;
    description: string;
    image: string;
    features: string[];
  };
  backgroundColor?: string;
};

const { data, backgroundColor = "bg-light" } = Astro.props;
if (!data.enable) return null;
---
```

**Audit note:** The existing callers of `WhyChooseUs` are:
1. `src/pages/index.astro:252` — passes `homepage.data.why_choose_us` (type `homepage["why_choose_us"]`, shape `{enable, title, description, image, features}`)
2. `src/pages/about.astro:163` — passes `why_choose_us` from `aboutpage` data (same shape)

Both callers pass objects that satisfy the new plain-object type. No breaking change. The `CollectionEntry` import is no longer needed and is removed.

---

## Phase 7: Navigation Updates

**Justification:** The `/locations` route needs to be reachable from the main nav and footer. The `menu.json` structure already supports `hasChildren` and nested items in the header, but for now we only add a top-level link (no dropdown). The footer gets a new "Service Areas" section.

**Target:** `src/config/menu.json`

Replace the full file content:

```json
{
  "main": [
    {
      "name": "Home",
      "url": "/"
    },
    {
      "name": "About",
      "url": "/about"
    },
    {
      "name": "Services",
      "url": "/services"
    },
    {
      "name": "Locations",
      "url": "/locations"
    },
    {
      "name": "Appointment",
      "url": "/appointment"
    },
    {
      "name": "Contact",
      "url": "/contact"
    },
    {
      "name": "Blog",
      "url": "/blog"
    }
  ],
  "footer": [
    {
      "title": "Service Areas",
      "children": [
        {
          "name": "Frederick, MD",
          "url": "/locations/frederick-md"
        },
        {
          "name": "All Locations",
          "url": "/locations"
        }
      ]
    },
    {
      "title": "Services",
      "children": [
        {
          "name": "Commercial Roofing",
          "url": "/services/commercial-roofing"
        },
        {
          "name": "Damage Repairs",
          "url": "/services/damage-repairs"
        },
        {
          "name": "Roof Renovation",
          "url": "/services/roof-renovation"
        },
        {
          "name": "Roof Replacement",
          "url": "/services/roof-replacement"
        },
        {
          "name": "Free Inspection",
          "url": "/services/free-inspection"
        }
      ]
    },
    {
      "title": "Quick Links",
      "children": [
        {
          "name": "Home",
          "url": "/"
        },
        {
          "name": "About Us",
          "url": "/about"
        },
        {
          "name": "Contact",
          "url": "/contact"
        },
        {
          "name": "Privacy Policy",
          "url": "/privacy-policy"
        },
        {
          "name": "Elements",
          "url": "/elements"
        }
      ]
    }
  ]
}
```

**Audit note:** The footer now has 3 sections. The existing `Footer.astro` uses `grid grid-cols-2 lg:grid-cols-3` which will layout correctly with 3 columns.

---

## Phase 8: Placeholder Image for Hero

**Justification:** The frederick-md.md references `/images/locations/frederick-md-hero.jpg` which does not exist yet. Without a placeholder image, `ImageMod` will throw a build error (Astro's sharpImageService requires valid source paths for local images). We need to either use a remote URL or copy an existing image as a stand-in.

**Target:** Copy an existing hero image as a temporary placeholder.

**Action:** Run in terminal:
```bash
mkdir -p public/images/locations && cp public/images/banner.png public/images/locations/frederick-md-hero.jpg
```

This reuses the existing `banner.png` as a temporary image. It will be replaced with an actual Frederick-specific image later.

---

## Anti-Laziness Audit

### Checked edge cases:

1. **`getSinglePage` filter behavior:** The function filters out entries where `id.startsWith("-")` and `draft === true`. The frederick-md.md has `draft: false` and id `frederick-md` — will pass. The -index.md has id `-index` — will be excluded from listings, only fetched via `getListPage`. Correct.

2. **`WhyChooseUs` type compatibility:** Changed from `CollectionEntry<"aboutpage">["data"]["why_choose_us"]` to a plain object type. The `effectiveWhyChooseUs` computed in `[single].astro` always provides all fields (`enable`, `title`, `description`, `image`, `features`) with fallbacks, satisfying the required string types. The `CollectionEntry` import is removed from WhyChooseUs.astro. Correct.

3. **`Testimonial.astro` reads from collection, not props:** The existing Testimonial partial cannot accept location-specific data. Handled by inlining testimonial cards as a placeholder grid. TODO noted for future `TestimonialCarousel.astro` component.

4. **FAQ accordion script on cold page load:** The `<script>` in `FAQs.astro` only runs if that component is rendered on the current page. A user landing directly on a location page from search would have non-functional accordions. **Fixed** by including the full FAQ accordion `<script>` block directly in `[single].astro`. The script targets `.faq-item-fix` class elements, which both the global FAQs.astro and the location page use. If both are on the same page, the second `new FAQAccordion()` call will re-initialize all `.faq-item-fix` elements, which is safe (the constructor overwrites any previous state). Correct.

5. **`commonFields` spread not used for locationpage:** The location schema has too many unique fields for the spread pattern to be beneficial. `title`, `description`, `meta_title`, `image`, `draft`, `date` are declared inline with the same types. Correct.

6. **Form field IDs:** The location page form uses `loc-name`, `loc-phone`, `loc-service` instead of `name`, `phone`, `service_needed` to avoid HTML ID conflicts if the FAQ/testimonial sections also have forms. The `name` attributes for form submission remain `name`, `phone`, `service_needed` for backend compatibility. FAQ answer IDs use `loc-faq-answer-${i}` prefix to avoid clashing with FAQ IDs on other pages if both render simultaneously via view transitions. Correct.

7. **Hero image path:** `/images/locations/frederick-md-hero.jpg` must exist in `public/`. Phase 8 addresses this with a copy of `banner.png`. Correct.

8. **`nearby_areas` links to slugs that don't have content files yet** (e.g., `urbana-md`, `jefferson-md`): These links will 404 until those content files are created. This is acceptable — the ADR specifies these as initial content; more cities will be added iteratively. The links are internal and won't break the build (Astro generates static pages; unlinked routes don't fail).

9. **Service cross-reference lookup:** `allServices.find(svc => svc.id === s.slug)` — the `id` in the content collection is the filename without extension (e.g., `roof-replacement`). The `s.slug` in the location frontmatter also uses `roof-replacement`. These match. Correct.

10. **`slug` removed from schema:** All URL generation uses `location.id` (derived from filename). The frontmatter `slug` field was redundant and created a risk of the two values diverging. `locationSlug = location.id` is declared once and used consistently in schema.org URLs and breadcrumb data. Correct.

11. **`intro` removed from schema:** The markdown body (rendered via `<Content />`) serves the same purpose as the `intro` field. This matches the pattern in `services/[single].astro` and `[regular].astro` where the body content is the primary content. Correct.

12. **Hardcoded geo meta tags in SEO.astro:** `src/components/SEO.astro:73-76` hardcodes Maryland-specific geo meta tags. For non-MD location pages, these will show incorrect data. This is a pre-existing issue, not introduced by this feature. Documented as a known limitation at the top of this blueprint. Follow-up task required to make these dynamic.

13. **Optional schema fields for index page compatibility:** The `-index.md` file only provides `title`, `description`, `image`, `draft`. All location-specific fields (`city`, `state`, `geo`, `hero`, `services`, `why_choose_us`, `contact_form`, etc.) are `.optional()` in the schema. Without this, Zod validation would reject the `-index.md` at build time. The `servicepage` collection follows the same pattern — `commonFields` are required, service-specific fields are optional. The `[single].astro` template handles absent data with null checks (`hero &&`, `contact_form &&`, `services || []`, `why_choose_us?.enable`, `geo ?` ternaries). Correct.

---

## Files Summary

| Action | File | Phase |
|---|---|---|
| **Modify** | `src/types/pages.collection.ts` — append `locationpage` export | 1 |
| **Modify** | `src/content.config.ts` — register `locationpage` | 2 |
| **Create** | `src/content/locations/-index.md` | 3a |
| **Create** | `src/content/locations/frederick-md.md` | 3b |
| **Create** | `src/pages/locations/index.astro` | 4 |
| **Create** | `src/pages/locations/[single].astro` | 5 |
| **Modify** | `src/layouts/partials/WhyChooseUs.astro` — loosen type | 6 |
| **Modify** | `src/config/menu.json` — add Locations nav + footer | 7 |
| **Create** | `public/images/locations/frederick-md-hero.jpg` — placeholder | 8 |

### Placeholder components (inline, no new files):

| Future Component | Current Location | How Rendered Now |
|---|---|---|
| `LocationHero.astro` | Inlined in `[single].astro` hero section | Full markup with ImageMod + gradient overlay + Button |
| `NearbyAreas.astro` | Inlined in `[single].astro` nearby areas section | Grid of anchor tags |
| `FAQAccordion.astro` | Inlined in `[single].astro` FAQ section + script block | FAQ accordion markup with working JS |
| `TestimonialCarousel.astro` | Inlined in `[single].astro` testimonials section | Simple grid of testimonial cards (no swiper) |

### Follow-up tasks (out of scope):

1. Make SEO.astro geo meta tags dynamic based on page-level props (`geo.region`, `geo.placename`, `geo.position`, `ICBM`).
2. Extract `FAQAccordion.astro` from the inline FAQ section to accept `faqs_list` as props.
3. Extract `TestimonialCarousel.astro` with prop-based data (using `astro-swiper`).
4. Add more location content files (urbana-md.md, jefferson-md.md, etc.).
5. Replace placeholder hero image with location-specific photography.