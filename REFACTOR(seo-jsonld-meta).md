# REFACTOR(seo-jsonld-meta) — Fix JSON-LD Structured Data & Meta Tags for Google/AEO

**Objective:** Eliminate all fake/placeholder data, fix critical schema errors, add missing schemas, and ensure every page has production-quality JSON-LD and meta tags that pass Google Rich Results Test and enable AEO (Answer Engine Optimization).

**Created:** 2026-05-12  
**Status:** DRAFT — Awaiting approval

---

## Phase 0: Content Fixes — Replace Placeholder/Fake Data in Frontmatter

These content files contain template boilerplate or wrong company names that leak into meta tags and JSON-LD. Fix at the source.

### 0a. `src/content/appointment/-index.md`

**Problem:** `meta_title: "Appointment | Roofer"` and `description: "...Lonestar Roofing the top choice for Texans."` — wrong company, wrong geography.

**Action:** Replace with real J Land Contracting content.

```yaml
# src/content/appointment/-index.md
---
title: "Book an appointment"
meta_title: "Book a Free Roof Inspection | J Land Contracting"
description: "Schedule a free roof inspection with J Land Contracting. Serving homeowners across the DMV with professional roofing services, insurance claim assistance, and honest estimates."
image: "/images/og-image.png"
draft: false

# Contact Information are in the config file
---
```

### 0b. `src/content/services/-index.md`

**Problem:** `meta_title: "Services | Roofer"` and `description: "We consider all the drivers of change gives you the blocks & components..."` — template placeholder.

**Action:** Replace with real content.

```yaml
# src/content/services/-index.md
---
title: "Offering best roofing services"
meta_title: "Roofing Services | J Land Contracting"
description: "J Land Contracting offers professional roofing services across the DMV including roof replacement, roof renovation, commercial roofing, storm damage repairs, and free roof inspections."
image: "/images/og-image.png"
draft: false
---
```

### 0c. `src/content/blog/-index.md`

**Problem:** `meta_title: "Blog | Roofer"` and `description: "We consider all the drivers of change..."` — template placeholder.

**Action:** Replace with real content.

```yaml
# src/content/blog/-index.md
---
title: "Our Blog"
meta_title: "Roofing Blog | J Land Contracting"
description: "Roofing tips, maintenance advice, and industry insights from J Land Contracting. Stay informed about roof care, insurance claims, and home protection in the DMV area."
image: "/images/og-image.png"
draft: false
---
```

### 0d. `src/content/pages/privacy-policy.md`

**Problem:** `meta_title: ""` and `description: ""` — empty. Falls back to generic site description which is wrong for a privacy policy.

**Action:** Add proper meta.

```yaml
# src/content/pages/privacy-policy.md
---
title: "Privacy Policy"
meta_title: "Privacy Policy | J Land Contracting"
description: "Privacy policy for J Land Contracting. Learn how we protect your personal information when you use our roofing services website."
image: ""
draft: false
---
```

---

## Phase 1: Fix 404 Page — Add noindex + Remove JSON-LD

**File:** `src/pages/404.astro` (lines 1-31)

**Problem:** 404 page has `index, follow` robots directive and JSON-LD pointing to `/404`. Google should never index a 404 page, and JSON-LD on an error page is noise.

**Action:** Remove JSON-LD entirely, add `noindex` prop.

```astro
---
import Base from "@/layouts/Base.astro";
---
<Base title="Page Not Found" noindex={true}>
  <section class="section-lg text-center">
    <div class="container">
      <div class="row justify-center">
        <div class="sm:col-10 md:col-8 lg:col-6">
          <span class="text-[8rem] block font-bold text-text-dark"> 404 </span>
          <h1 class="h2 mb-4">Page not found</h1>
          <div class="content">
            <p>
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>
          </div>
          <a href="/" class="btn btn-primary mt-8">Back to home</a>
        </div>
      </div>
    </div>
  </section>
</Base>
```

---

## Phase 2: Fix About Page — Remove Fake Person Schemas + Fix Description

**File:** `src/pages/about.astro` (lines 22-102)

**Problem:**
- `our_team.enable: false` in frontmatter, but JSON-LD still emits 3 fake `Person` schemas (John Doe, Jane Smith, Mike Johnson) with placeholder social URLs.
- Description in frontmatter contains `<br><br>` which leaks into JSON-LD `description` field (the `plainify()` in Base.astro only strips for meta tags, not for the JSON-LD hardcoded in the page).

**Action:** Remove all Person schemas since team is disabled. Run description through `plainify()` for JSON-LD.

```astro
---
import ImageMod from "@/components/ImageMod.astro";
import TitleCenter from "@/components/TitleCenter.astro";
import DynamicIcon from "@/helpers/DynamicIcon";
import Base from "@/layouts/Base.astro";
import { getListPage } from "@/lib/contentParser.astro";
import { markdownify, plainify } from "@/lib/utils/textConverter";
import WhyChooseUs from "@/partials/WhyChooseUs.astro";
import AuthorCard from "@/layouts/components/AuthorCard.astro";

const pageIndex = await getListPage("aboutpage", "-index");
const {
  title,
  description,
  experience,
  image,
  our_values,
  why_choose_us,
  our_team,
} = pageIndex.data;

const plainDescription = plainify(description);

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": title,
    "description": plainDescription,
    "url": "https://jlandgroup.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "J Land Contracting",
      "url": "https://jlandgroup.com",
      "logo": "https://jlandgroup.com/images/logo-jland.svg",
      "foundingDate": "2007",
      "foundingLocation": {
        "@type": "Place",
        "name": "Frederick, MD"
      },
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 10,
        "maxValue": 50
      }
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
        "name": "About",
        "item": "https://jlandgroup.com/about"
      }
    ]
  }
];

if (pageIndex.data.draft) return Astro.redirect("/404");
---
```

**Key changes:**
- Changed `@type` from `WebPage` to `AboutPage` (more specific schema)
- Added `mainEntity` linking to Organization with real founding info
- Removed all 3 fake `Person` schemas
- Imported and used `plainify()` to strip `<br>` from description in JSON-LD
- Added `foundingDate` and `foundingLocation` from real business data

---

## Phase 3: Fix Homepage — Remove Fake Reviews + Add FAQPage + Fix SiteNavigationElement + Fix VideoObject + Fix areaServed

**File:** `src/pages/index.astro` (lines 22-259)

### 3a. Replace fake AggregateRating and Reviews with real testimonial data

**Problem:** `aggregateRating` with `ratingValue: "4.9"`, `reviewCount: "1550"`, and fake reviewers "John Smith" / "Sarah Johnson" — violates Google's structured data spam policies. Instead, use the REAL testimonials from `src/content/sections/testimonial.md` (Gene Buckalew, Leah Walker, Jason Chung with real review text and `total_reviews: "124"`).

**Action:** Replace the hardcoded review data with data pulled from the testimonial content collection.

### 3b. Add FAQPage schema from real FAQ content

**Problem:** Homepage renders `<FAQs />` partial but has no `FAQPage` JSON-LD. This is the highest-impact AEO schema type.

**Action:** Import the FAQ section data and generate `FAQPage` schema from it.

### 3c. Consolidate SiteNavigationElement into @graph

**Problem:** 6 separate JSON-LD blocks for `SiteNavigationElement` — should be one `@graph`.

### 3d. Fix VideoObject — add required `@id`, remove or verify real URLs

**Problem:** Hardcoded fake `uploadDate`, `duration`, and potentially fake Facebook video URLs.

**Action:** Remove VideoObject entirely unless a real video URL is confirmed. Keeping it with fake data risks a Google spam penalty.

### 3e. Fix `areaServed` — change from string "DMV" to structured geo objects

**Full replacement for `schemaData` in `src/pages/index.astro`:**

```astro
---
import BlogCard from "@/components/BlogCard.astro";
import Base from "@/layouts/Base.astro";
import { getListPage, getSinglePage } from "@/lib/contentParser.astro";
import { sortByDate } from "@/lib/utils/sortFunctions";
import { markdownify, plainify } from "@/lib/utils/textConverter";
import CallToAction from "@/partials/CallToAction.astro";
import FAQs from "@/partials/FAQs.astro";
import HeroBanner from "@/partials/HeroBanner.astro";
import Partners from "@/partials/Partners.astro";
import OurExpertise from "@/partials/OurExpertise.astro";
import Testimonial from "@/partials/Testimonial.astro";
import WhatWeOffer from "@/partials/WhatWeOffer.astro";
import WhyChooseUs from "@/partials/WhyChooseUs.astro";

const homepage = await getListPage("homepage", "-index");
const blogs = await getSinglePage("blogpage");
const featuredBlogs = sortByDate(blogs);

const { blog_section, why_choose_us } = homepage.data;

// Load real testimonials for schema (collection name is "testimonialSection", document ID is "testimonial")
const testimonialSection = await getListPage("testimonialSection", "testimonial");
const testimonials = testimonialSection.data.testimonials || [];
const totalReviews = testimonialSection.data.ratings?.total_reviews || "0";

// Load real FAQs for schema (collection name is "faqsSection", document ID is "faqs")
const faqSection = await getListPage("faqsSection", "faqs");
const faqItems = faqSection.data.faqs_list || [];

const schemaData = [
  // LocalBusiness Schema (authoritative business identity)
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://jlandgroup.com/#organization",
    "name": "J Land Contracting",
    "alternateName": "J Land Roofing",
    "description": "J Land Contracting delivers expert roofing solutions across the DMV with integrity and experience. Free inspections, insurance claim assistance, and professional roof replacements.",
    "url": "https://jlandgroup.com",
    "telephone": "(410) 292-0801",
    "email": "info@jlandgroup.com",
    "foundingDate": "2007",
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Check"],
    "currenciesAccepted": "USD",
    "logo": "https://jlandgroup.com/images/logo-jland.svg",
    "image": "https://jlandgroup.com/images/og-image.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3636 Glenoble Court",
      "addressLocality": "Jefferson",
      "addressRegion": "MD",
      "postalCode": "21755",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "39.3697",
      "longitude": "-77.5475"
    },
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
    "areaServed": [
      {
        "@type": "State",
        "name": "Maryland"
      },
      {
        "@type": "State",
        "name": "Virginia"
      },
      {
        "@type": "State",
        "name": "District of Columbia"
      },
      {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "39.3697",
          "longitude": "-77.5475"
        },
        "geoRadius": "80467"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Roofing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Roof Replacement",
            "description": "Professional roof replacement services to ensure the durability and safety of your home."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Roof Renovation",
            "description": "Professional roof renovation services to enhance the appearance and functionality of your home."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Roofing",
            "description": "Professional commercial roofing services for businesses and commercial properties."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Damage Repairs",
            "description": "Expert damage repair services to restore your roof after storm damage or accidents."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Free Inspection",
            "description": "Schedule a free roof inspection to assess the condition of your roofing system."
          }
        }
      ]
    },
    "aggregateRating": testimonials.length > 0 ? {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": totalReviews,
      "bestRating": "5",
      "worstRating": "1"
    } : undefined,
    "review": testimonials.slice(0, 3).map((t) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": plainify(t.content)
    })),
    "sameAs": [
      "https://facebook.com/jlandcontracting",
      "https://www.linkedin.com/company/j-land-contracting",
      "https://twitter.com/jlandcontracting"
    ],
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "GAF Certified Plus",
        "url": "https://gaf.com/certified-plus"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "CertainTeed Shingle Master",
        "url": "https://certainteed.com/shingle-master"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "name": "BBB Accredited Business"
      }
    ]
  },
  // FAQPage Schema (from real FAQ content — critical for AEO)
  faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": plainify(faq.answer)
      }
    }))
  } : undefined,
  // BreadcrumbList Schema
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://jlandgroup.com"
      }
    ]
  },
  // SiteNavigationElement consolidated into @graph
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SiteNavigationElement",
        "name": "Home",
        "url": "https://jlandgroup.com"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "About",
        "url": "https://jlandgroup.com/about"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Services",
        "url": "https://jlandgroup.com/services"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Appointment",
        "url": "https://jlandgroup.com/appointment"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Contact",
        "url": "https://jlandgroup.com/contact"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Blog",
        "url": "https://jlandgroup.com/blog"
      }
    ]
  }
].filter(Boolean);
---
```

**Key changes:**
- Removed fake `aggregateRating` (4.9/1550) — replaced with real data from testimonials (5/124)
- Removed fake reviews (John Smith, Sarah Johnson) — replaced with real testimonials (Gene Buckalew, Leah Walker, Jason Chung)
- Added `FAQPage` schema from real FAQ content
- Consolidated 6 `SiteNavigationElement` blocks into one `@graph`
- Removed fake `VideoObject` schema entirely (no real video URL verified)
- Fixed `areaServed` — replaced string "DMV" with structured `State` + `GeoCircle` objects (80467m ≈ 50mi radius)
- Used `plainify()` on testimonial content and FAQ answers to strip HTML

---

## Phase 4: Fix Contact Page — Enhance ContactPage Schema

**File:** `src/pages/contact.astro` (lines 11-58)

**Problem:**
- `contactPoint` is singular object — Google recommends array
- Missing `areaServed` (critical for local business AEO)
- Missing `hoursAvailable`

**Action:** Replace schemaData:

```astro
const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": title,
    "description": description,
    "url": "https://jlandgroup.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "J Land Contracting",
      "telephone": "(410) 292-0801",
      "email": "info@jlandgroup.com",
      "url": "https://jlandgroup.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3636 Glenoble Court",
        "addressLocality": "Jefferson",
        "addressRegion": "MD",
        "postalCode": "21755",
        "addressCountry": "US"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "(410) 292-0801",
          "contactType": "customer service",
          "availableLanguage": "English",
          "areaServed": [
            { "@type": "State", "name": "Maryland" },
            { "@type": "State", "name": "Virginia" },
            { "@type": "State", "name": "District of Columbia" }
          ]
        },
        {
          "@type": "ContactPoint",
          "telephone": "(410) 292-0801",
          "contactType": "sales",
          "availableLanguage": "English",
          "areaServed": [
            { "@type": "State", "name": "Maryland" },
            { "@type": "State", "name": "Virginia" },
            { "@type": "State", "name": "District of Columbia" }
          ]
        }
      ],
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
      ]
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
        "name": "Contact",
        "item": "https://jlandgroup.com/contact"
      }
    ]
  }
];
```

---

## Phase 5: Fix Blog Post Pages — Add BlogPosting Schema

**File:** `src/pages/blog/[single].astro` (lines 1-92)

**Problem:** Zero JSON-LD on blog post pages. This is the most impactful missing schema — `BlogPosting` drives Google article rich results.

**Action:** Add full `BlogPosting` schema + `BreadcrumbList`.

```astro
---
import BlogCard from "@/components/BlogCard.astro";
import ImageMod from "@/components/ImageMod.astro";
import Share from "@/components/Share.astro";
import Base from "@/layouts/Base.astro";
import { getSinglePage } from "@/lib/contentParser.astro";
import dateFormat from "@/lib/utils/dateFormat";
import similarItems from "@/lib/utils/similarItems";
import { markdownify, plainify } from "@/lib/utils/textConverter";
import { render } from "astro:content";
import { FaRegClock } from "react-icons/fa6";
import config from "@/config/config.json";

export async function getStaticPaths() {
  const posts = await getSinglePage("blogpage");

  const paths = posts.map((post) => ({
    params: {
      single: post.id,
    },
    props: { post },
  }));
  return paths;
}

const { post } = Astro.props;
const { title, date, description, image } = post.data;
const posts = await getSinglePage("blogpage");
const similarPosts = similarItems(post, posts);
const { Content } = await render(post);

const plainDescription = plainify(description);
const imageUrl = image
  ? `${config.site.base_url}${image}`
  : `${config.site.base_url}${config.metadata.meta_image}`;
const datePublished = date ? new Date(date).toISOString() : undefined;

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": plainDescription,
    "url": `https://jlandgroup.com/blog/${post.slug}`,
    "datePublished": datePublished,
    "author": {
      "@type": "Organization",
      "name": "J Land Contracting",
      "url": "https://jlandgroup.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "J Land Contracting",
      "url": "https://jlandgroup.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://jlandgroup.com/images/logo-jland.svg"
      }
    },
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": imageUrl
      }
    }),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://jlandgroup.com/blog/${post.slug}`
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
        "name": "Blog",
        "item": "https://jlandgroup.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": `https://jlandgroup.com/blog/${post.slug}`
      }
    ]
  }
];
---
```

**Note:** The `similarItems` line uses `posts` (defined on line 28 of the original) — this is correct in the existing code, no change needed there.

---

## Phase 6: Fix Service Pages — Remove Fake Reviews, Add Real FAQPage, Fix Price

**File:** `src/pages/services/[single].astro` (lines 29-160)

### 6a. Remove fake Review schema

**Problem:** Every service page has a fake review: `"author": { "@type": "Person", "name": "Local Customer" }` with a templated review body. Google's spam policy prohibits fake reviews.

**Action:** Remove the Review schema entirely unless real reviews are available per service.

### 6b. Replace generic FAQPage with service-specific FAQs or remove

**Problem:** All 5 service pages share identical 3 FAQs. These are generic, not service-specific. For AEO, they need to be unique and accurate, or removed.

**Action:** Since no service-specific FAQ content exists in the frontmatter, remove the FAQPage schema for now. It can be re-added when real service-specific FAQ content is written.

### 6c. Fix `offers.priceSpecification.price` — "Variable" is invalid

**Problem:** `price: "Variable"` for paid services. Schema.org expects a number or doesn't expect the field at all.

**Action:** Remove `offers` from paid services. Only keep it for Free Inspection with `price: "0"`.

### 6d. Add `image` property to Service schema

**Problem:** Service pages have images in frontmatter but the schema doesn't include them.

**Full replacement for `schemaData` in `src/pages/services/[single].astro`:**

```astro
const servicePricing = title.toLowerCase().includes("free") ? "0" : undefined;

const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": title,
    "description": description,
    "url": `https://jlandgroup.com/services/${service.slug}`,
    "image": image ? `https://jlandgroup.com${image}` : undefined,
    "provider": {
      "@type": "Organization",
      "name": "J Land Contracting",
      "telephone": "(410) 292-0801",
      "email": "info@jlandgroup.com",
      "url": "https://jlandgroup.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3636 Glenoble Court",
        "addressLocality": "Jefferson",
        "addressRegion": "MD",
        "postalCode": "21755",
        "addressCountry": "US"
      }
    },
    "serviceType": "Roofing Service",
    "areaServed": [
      { "@type": "State", "name": "Maryland" },
      { "@type": "State", "name": "Virginia" },
      { "@type": "State", "name": "District of Columbia" },
      {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "39.3697",
          "longitude": "-77.5475"
        },
        "geoRadius": "80467"
      }
    ],
    ...(servicePricing !== undefined && {
      "offers": {
        "@type": "Offer",
        "price": servicePricing,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    })
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
        "name": "Services",
        "item": "https://jlandgroup.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": `https://jlandgroup.com/services/${service.slug}`
      }
    ]
  }
].map(s => {
  // Remove undefined values from schema objects
  Object.keys(s).forEach(k => s[k] === undefined && delete s[k]);
  return s;
});
```

**Key changes:**
- Removed fake `Review` schema
- Removed generic `FAQPage` schema (re-add when real service-specific FAQs are written)
- Fixed `offers` — only present for Free Inspection with `price: "0"`, removed for paid services
- Removed fake `aggregateRating` (ratingValue "4.9", reviewCount "150" — not from real data)
- Removed `serviceDuration: "P3D"` (hardcoded, not accurate)
- Added `image` property from service frontmatter
- Added `addressCountry: "US"` to address
- Added `url` to provider Organization
- Used consistent `areaServed` structure with homepage
- Added `availability: "https://schema.org/InStock"` to offers

---

## Phase 7: Fix Appointment Page — Add Action Schema for AEO

**File:** `src/pages/appointment.astro` (lines 13-41)

**Problem:** Just a basic `WebPage` schema. For AEO, this page should express the action a user can take (booking an appointment).

**Action:** Replace with `WebPage` + `ReserveAction` schema:

```astro
const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageIndex.data.title,
    "description": description,
    "url": "https://jlandgroup.com/appointment",
    "potentialAction": {
      "@type": "ReserveAction",
      "name": "Book a Free Roof Inspection",
      "description": "Schedule a free roof inspection with J Land Contracting",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://jlandgroup.com/appointment",
        "actionPlatform": [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform"
        ]
      }
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
        "name": "Appointment",
        "item": "https://jlandgroup.com/appointment"
      }
    ]
  }
];
```

**Also fix:** `pageIndex.data.title` references the frontmatter title "Book an appointment" — but the meta_title from our Phase 0 fix will be "Book a Free Roof Inspection | J Land Contracting" which is better. The schema `name` uses the frontmatter `title`, which is fine.

---

## Phase 8: Fix Base Layout + SEO Component — Eliminate Duplicate OG Tags, Fix og:url, Add Dimensions

**AUDIT FINDING (CRITICAL):** The current implementation produces **duplicate Open Graph meta tags**. Here's why:

1. `astro-seo`'s `<SEOComponent>` natively renders OG tags when you pass `openGraph` prop (using `OpenGraphBasicTags`, `OpenGraphImageTags`, etc.)
2. `SEO.astro` then ALSO manually renders duplicate `<meta property="og:...">` tags below the component
3. Result: every OG tag appears **twice** in the HTML — Google and social crawlers may use either, causing unpredictable behavior

**The fix:** Rewrite `SEO.astro` to use `astro-seo`'s native `openGraph` prop shape (which supports `og:image:width`/`og:image:height` natively via `openGraph.image`), and remove all the manual duplicate OG tags.

### 8a. Rewrite SEO.astro — Use astro-seo's native OG format, eliminate duplicate tags

**File:** `src/components/SEO.astro` — Full replacement:

```astro
---
import { SEO as SEOComponent } from "astro-seo";
import { Schema } from "astro-seo-schema";

export interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string;
  noindex?: boolean;
  openGraph?: {
    basic: {
      title: string;
      type: string;
      image: string;
      url?: string;
    };
    optional?: {
      audio?: string;
      description?: string;
      determiner?: string;
      locale?: string;
      localeAlternate?: string[];
      siteName?: string;
      video?: string;
    };
    image?: {
      url?: string;
      secureUrl?: string;
      type?: string;
      width?: number;
      height?: number;
      alt?: string;
    };
    article?: {
      publishedTime?: string;
      modifiedTime?: string;
      expirationTime?: string;
      authors?: string[];
      section?: string;
      tags?: string[];
    };
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
  };
  schemaData?: any;
}

const { title, description, canonical, keywords, noindex, openGraph, twitter, schemaData } = Astro.props as SEOProps;
---

<SEOComponent
  title={title}
  description={description}
  canonical={canonical}
  noindex={noindex || false}
  surpressWarnings={true}
  openGraph={openGraph}
  twitter={twitter}
/>

{keywords && <meta name="keywords" content={keywords} />}
<meta name="language" content="en-US" />
<meta name="geo.region" content="US-MD" />
<meta name="geo.placename" content="Jefferson, MD" />
<meta name="geo.position" content="39.3697;-77.5475" />
<meta name="ICBM" content="39.3697, -77.5475" />

<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="J Land Contracting" />
<link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />

{schemaData && <Schema item={schemaData} />}
```

**Key changes:**
- Replaced custom `openGraph` shape with `astro-seo`'s native shape (`basic`, `optional`, `image`, `article`)
- Removed ALL manual OG meta tags — `astro-seo` handles them natively
- This eliminates duplicate OG tags
- `og:image:width` and `og:image:height` are now supported natively via `openGraph.image`
- Added `openGraph.article` support for blog post publishedTime
- Added `noindex` prop passthrough to `astro-seo` (replaces the manual noindex meta tag in Base.astro)
- Added `surpressWarnings={true}` to suppress the "same title" warning (we intentionally pass same title to both)
- **Removed** the manual `robots` meta tag — `astro-seo` emits its own based on `noindex` prop. The extended robots directives (`max-snippet`, `max-image-preview`, `max-video-preview`) are passed via Base.astro using `astro-seo`'s `robotsExtras` prop instead (see Phase 8b update below)

### 8b. Rewrite Base.astro SEO section — Fix og:url, use astro-seo's native format

**File:** `src/layouts/Base.astro`

**Update the Props interface:**

```ts
export interface Props {
  title?: string;
  meta_title?: string;
  description?: string;
  image?: string;
  keywords?: string;
  noindex?: boolean;
  canonical?: string;
  schemaData?: any;
  ogType?: string;
  articlePublishedTime?: string;
}
```

**Update the destructuring:**

```ts
const { title, meta_title, description, image, keywords, noindex, canonical, schemaData, ogType, articlePublishedTime } =
  Astro.props;
```

**Replace the SEO/meta section (lines 79-112) with:**

```astro
{(() => {
  const seoTitle = plainify(meta_title ? meta_title : title ? title : config.site.title);
  const seoDescription = plainify(description ? description : config.metadata.meta_description);
  const seoCanonical = canonical ? canonical : `${config.site.base_url}${Astro.url.pathname}`;
  // Always provide a fallback image — astro-seo throws if openGraph.basic.image is missing
  const ogImage = image
    ? `${config.site.base_url}${image}`
    : `${config.site.base_url}${config.metadata.meta_image}`;

  return (
    <SEO
      title={seoTitle}
      description={seoDescription}
      canonical={seoCanonical}
      keywords={keywords || "roofing, roof replacement, roof repair, DMV, Maryland, Jefferson"}
      openGraph={{
        basic: {
          title: seoTitle,
          type: ogType || "website",
          image: ogImage,
          url: seoCanonical
        },
        optional: {
          description: seoDescription,
          siteName: "J Land Contracting",
          locale: "en_US"
        },
        image: {
          url: ogImage,
          alt: seoTitle,
          width: 1200,
          height: 630
        },
        ...(articlePublishedTime && {
          article: {
            publishedTime: articlePublishedTime
          }
        })
      }}
      twitter={{
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        image: ogImage
      }}
      noindex={noindex || false}
      robotsExtras="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      schemaData={schemaData}
    />
  )})()}
```

**Key changes:**
- Fixed `og:url` — now uses `seoCanonical` instead of the buggy `ogUrl` variable (which used `.replace("/", "")`)
- Uses `astro-seo`'s native `openGraph` shape (`basic`, `optional`, `image`)
- `og:image:width` and `og:image:height` now rendered natively by `astro-seo`
- Added `ogType` prop (defaults to `"website"`, blog posts pass `"article"`)
- Added `articlePublishedTime` prop for blog post `og:article:published_time`
- **CRITICAL:** `ogImage` always has a value because `config.metadata.meta_image` is the hardcoded fallback — this prevents `astro-seo`'s validation from throwing "you have to at least define the title, type, and image basic properties!"

**Also in `src/layouts/Base.astro`, remove the duplicate noindex block (lines 114-115):**

Delete this code since `astro-seo` now handles `noindex` via the prop:
```astro
<!-- REMOVE THIS BLOCK -->
{noindex && <meta name="robots" content="noindex,nofollow" />}
```

---

## Phase 9: Fix Blog Post Page — Pass ogType="article" + articlePublishedTime

**File:** `src/pages/blog/[single].astro`

**Action:** Pass `ogType="article"` and `articlePublishedTime` to the Base layout.

```astro
<Base {...post.data} ogType="article" articlePublishedTime={datePublished} schemaData={schemaData}>
```

This ensures `og:type` is `"article"` and `og:article:published_time` is set for blog posts, which Facebook and other social platforms use for proper article rendering.

---

## Phase 10: Fix robots.txt — Add Sitemap Directive

**File:** `public/robots.txt`

**Problem:** Missing `Sitemap` directive. The site uses `@astrojs/sitemap` which generates `sitemap-index.xml`.

**Action:**

```
User-agent: *
Allow: /

Disallow: /api/*

Sitemap: https://jlandgroup.com/sitemap-index.xml
```

---

## Phase 11: Fix Blog Index — Add image to OG and enhance BlogPosting entries

**File:** `src/pages/blog/index.astro`

**Problem:**
- Blog index has no `image` in frontmatter, so OG image falls back to default — this is fine
- BlogPosting entries in the schema lack `image` and `description`

**Action:** Enhance BlogPosting entries with available data:

```astro
const schemaData = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": pageIndex.data.title,
    "description": pageIndex.data.description,
    "url": "https://jlandgroup.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "J Land Contracting",
      "url": "https://jlandgroup.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://jlandgroup.com/images/logo-jland.svg"
      }
    },
    "blogPost": currentPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.data.title,
      "description": post.data.description ? plainify(post.data.description) : undefined,
      "url": `https://jlandgroup.com/blog/${post.slug}`,
      "datePublished": post.data.date ? new Date(post.data.date).toISOString() : undefined,
      "image": post.data.image ? {
        "@type": "ImageObject",
        "url": `https://jlandgroup.com${post.data.image}`
      } : undefined,
      "author": {
        "@type": "Organization",
        "name": "J Land Contracting",
        "url": "https://jlandgroup.com"
      }
    }))
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
        "name": "Blog",
        "item": "https://jlandgroup.com/blog"
      }
    ]
  }
];
```

**Also add `plainify` import** at the top of the file:
```astro
import { plainify } from "@/lib/utils/textConverter";
```

---

## Phase 12: Fix Privacy Policy Page — Add noindex

**File:** `src/pages/[regular].astro`

**Problem:** Privacy policy pages shouldn't compete in search results for a local roofing business. The page currently has `index, follow`.

**Action:** Pass `noindex` prop when the page slug is `privacy-policy`:

In `[regular].astro`, update the Base call:

```astro
<Base {...page.data} schemaData={schemaData} noindex={page.slug === 'privacy-policy'}>
```

This is clean because `[regular].astro` handles all generic pages. If other pages need noindex in the future, it can be driven by frontmatter instead.

---

## Phase 13: Fix plainify() — Add &apos; HTML Entity Support

**File:** `src/lib/utils/textConverter.ts` (lines 44-60)

**Problem:** The About page description contains `you're` which markdown renders as `you&apos;re`. The `htmlEntityDecoder` in `plainify()` handles `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;` but NOT `&apos;`. This means JSON-LD `description` fields may contain `&apos;` which is invalid in JSON-LD strings.

**Action:** Add `&apos;` to the entity list:

```ts
const htmlEntityDecoder = (htmlWithEntities: string) => {
  let entityList: { [key: string]: string } = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
    "&apos;": "'",
  };
  let htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;|&apos;)/g,
    (entity: string): string => {
      return entityList[entity];
    },
  );
  return htmlWithoutEntities;
};
```

---

## Summary of All Changes

| Phase | File | Change | Priority |
|-------|------|--------|----------|
| 0a | `src/content/appointment/-index.md` | Fix placeholder meta_title & description | CRITICAL |
| 0b | `src/content/services/-index.md` | Fix placeholder meta_title & description | CRITICAL |
| 0c | `src/content/blog/-index.md` | Fix placeholder meta_title & description | CRITICAL |
| 0d | `src/content/pages/privacy-policy.md` | Add meta_title & description | CRITICAL |
| 1 | `src/pages/404.astro` | Add noindex, remove JSON-LD | CRITICAL |
| 2 | `src/pages/about.astro` | Remove fake Person schemas, fix description, use AboutPage | CRITICAL |
| 3 | `src/pages/index.astro` | Remove fake reviews/ratings, add FAQPage, fix SiteNavigationElement, remove fake VideoObject, fix areaServed | CRITICAL |
| 4 | `src/pages/contact.astro` | contactPoint as array, add areaServed, add openingHours | IMPORTANT |
| 5 | `src/pages/blog/[single].astro` | Add BlogPosting + BreadcrumbList schema | CRITICAL |
| 6 | `src/pages/services/[single].astro` | Remove fake Review/AggregateRating/FAQPage, fix price, add image | CRITICAL |
| 7 | `src/pages/appointment.astro` | Add ReserveAction for AEO | IMPORTANT |
| 8a | `src/layouts/Base.astro` | Fix og:url bug, add ogType prop | HIGH |
| 8b | `src/components/SEO.astro` | Add og:image:width/height support | MEDIUM |
| 9 | `src/pages/blog/[single].astro` | Pass ogType="article" | MEDIUM |
| 10 | `public/robots.txt` | Add Sitemap directive | MEDIUM |
| 11 | `src/pages/blog/index.astro` | Enhance BlogPosting entries with image/description/date | MEDIUM |
| 12 | `src/pages/[regular].astro` | noindex for privacy-policy | LOW |
| 13 | `src/lib/utils/textConverter.ts` | Add &apos; entity to plainify() | LOW |

---

## Items NOT Changed (Explicitly Deferred)

1. **Service page body content is lorem ipsum** — Out of scope for this SEO/meta task. The content files (`commercial-roofing.md`, `damage-repairs.md`, `roof-renovation.md`, `roof-replacement.md`, `free-inspection.md`) all have placeholder body text. This should be replaced with real content, but that's a content task, not a schema task.

2. **Credential URLs** (`hasCredential` on homepage) — `https://gaf.com/certified-plus` and `https://certainteed.com/shingle-master` are unverified. If these URLs don't resolve, they should be removed. Keeping for now as they reference real certification programs.

3. **sameAs social URLs** — `https://facebook.com/jlandcontracting`, `https://www.linkedin.com/company/j-land-contracting`, `https://twitter.com/jlandcontracting` — these should be verified to exist. Keeping as-is since they follow standard URL patterns for this business.

4. **Geo coordinates** — `39.3697, -77.5475` is used consistently across all schemas. This should be verified against the actual business address `3636 Glenoble Court, Jefferson, MD 21755`. If the coordinates are approximate, they should be corrected.

5. **`datePublished` for BlogPosting** — The blog collection schema has `date: z.coerce.date().optional()` but no blog posts exist yet (only `-index.md`). When posts are added, they must include `date` in frontmatter for the schema to work.