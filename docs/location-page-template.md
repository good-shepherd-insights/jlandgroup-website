# Location Page Template

> **Source of truth:** DOCS(location-copy-strategy) / FEATURE(location-services-naming) — GOO-86
>
> Copy this template as `src/content/locations/<slug>.md` (e.g. `urbana-md.md`)
> and replace every `{PLACEHOLDER}` with real data.

---

## Prescribed Heading Structure (H1–H3)

| Level | Location | Pattern | Example |
|-------|----------|---------|---------|
| H1 | Hero | `{Category} Near {City}, {State}` | Roofing Contractor Near Frederick, MD |
| H2 | Intro | `Local {Category} Experts in {City}` | Local Roofing Experts in Frederick |
| H2 | Services | `Our {Category} Services in {City}, {State}` | Our Roofing Services in Frederick, MD |
| H3 | Service card | `{Service Name} in {City}, {State}` | Roof Replacement in Frederick, MD |
| H3 | Challenges | `{City}'s Roofing Challenges` | Frederick's Roofing Challenges |

## GEO Signal Requirements

- **Neighborhoods:** 5–8 specific neighborhoods (e.g., Baker Park, Wormans Mill)
- **Landmarks:** 2+ local landmarks (e.g., Catoctin Mountain)
- **Transit:** Major corridors (e.g., I-270, US-15)

## Service Naming Strategy

Every service listed in the `services` array **must** include a `title_override` that
incorporates the city and state. This ensures each H3 service card title is a
localized entity signal for 'near me' queries.

**Required pattern:**
```yaml
services:
  - slug: roof-replacement
    title_override: "Roof Replacement in {City}, {State}"
  - slug: free-inspection
    title_override: "Free Roof Inspection in {City}, {State}"
  - slug: damage-repairs
    title_override: "Storm Damage Repair in {City}, {State}"
  - slug: commercial-roofing
    title_override: "Commercial Roofing in {City}, {State}"
  - slug: roof-renovation
    title_override: "Roof Renovation in {City}, {State}"
```

## Frontmatter Template

```yaml
---
title: "Local {Category} Experts in {City}"
meta_title: "{Category} Near {City} {State} | J Land Contracting"
description: "Professional {service} in {City}, {State} — {service 1}, {service 2}, and {service 3}. Serving {County} homeowners with integrity."
image: "/images/locations/{slug}-hero.jpg"
draft: false

city: "{City}"
state: "{ST}"
state_full: "{StateName}"
county: "{County} County"

geo:
  latitude: "{Lat}"
  longitude: "{Long}"

population: "{Population}"

hero:
  title: "{Category} Near {City}, {State}"
  subtitle: "Trusted local {category} services near you — {benefit} in {City}."
  image: "/images/locations/{slug}-hero.jpg"

intro_image: "/images/locations/{slug}-hero.jpg"

intro:
  body: "{City} is {local fact}. [Narrative about the area]. J Land Contracting is based near here in {BaseCity}. We serve every neighborhood from {Neighborhood 1} to {Neighborhood 2}."
  challenges_title: "{City}'s Roofing Challenges"
  challenges_body: "[Specific weather or architectural challenges unique to this area]."
  service_area_title: "Our {City} Service Area"
  service_area_intro: "We serve all of {County} County, including:"
  service_area_neighborhoods:
    - name: "{Neighborhood 1}"
    - name: "{Neighborhood 2}"
    - name: "{Neighborhood 3}"
    - name: "{Neighborhood 4}"
    - name: "{Neighborhood 5}"
    - name: "{Neighborhood 6}"
    - name: "{Neighborhood 7}"
    - name: "{Neighborhood 8}"

services_section_title: "Our Roofing Services in {City}, {State}"

services:
  - slug: roof-replacement
    title_override: "Roof Replacement in {City}, {State}"
  - slug: free-inspection
    title_override: "Free Roof Inspection in {City}, {State}"
  - slug: damage-repairs
    title_override: "Storm Damage Repair in {City}, {State}"
  - slug: commercial-roofing
    title_override: "Commercial Roofing in {City}, {State}"
  - slug: roof-renovation
    title_override: "Roof Renovation in {City}, {State}"

faqs:
  - question: "Do you offer free roof inspections in {City}, {State}?"
    answer: "Yes. J Land Contracting provides free inspections throughout {City} and {County} County. We typically arrive within 24-48 hours."

nearby_areas:
  - name: "{Adjacent Town 1}"
    slug: "{town-slug-1}"
  - name: "{Adjacent Town 2}"
    slug: "{town-slug-2}"

contact_form:
  enable: true
  title: "Get a free estimate in {City}"
  description: "Tell us about your project and we'll get back to you within 24 hours."
  button_label: "Request a Free Estimate"

google_map:
  enable: true
  embed_url: "https://maps.google.com/maps?q={City},+{ST}&t=&z=13&ie=UTF8&iwloc=&output=embed"

street_address: "{Street Address}"
phone: "{Phone Number}"
zip_codes:
  - "{Zip 1}"
  - "{Zip 2}"

opening_hours:
  monday:
    open: "08:00"
    close: "17:00"
  tuesday:
    open: "08:00"
    close: "17:00"
  wednesday:
    open: "08:00"
    close: "17:00"
  thursday:
    open: "08:00"
    close: "17:00"
  friday:
    open: "08:00"
    close: "17:00"
  saturday:
    open: "08:00"
    close: "12:00"
  sunday:
    closed: true

directions:
  from_dc:
    title: "From Washington, DC"
    description: "[Driving directions from DC]"
    drive_time: "~{X} minutes"
    distance: "~{X} miles"
  from_baltimore:
    title: "From Baltimore, MD"
    description: "[Driving directions from Baltimore]"
    drive_time: "~{X} minutes"
    distance: "~{X} miles"

gbp_url: "{GBP URL}"
google_reviews_url: "{Google Review URL}"
yelp_url: "{Yelp URL}"
---
```

## Validation Checklist

- [ ] H1 matches `{Category} Near {City}, {State}`
- [ ] Intro H2 matches `Local {Category} Experts in {City}`
- [ ] Services H2 matches `Our {Category} Services in {City}, {State}`
- [ ] **Every service has a `title_override`** with `{Service Name} in {City}, {State}`
- [ ] Challenges H3 matches `{City}'s Roofing Challenges`
- [ ] 5–8 neighborhoods listed
- [ ] 2+ local landmarks referenced in intro body
- [ ] Transit corridors referenced in intro body
- [ ] Schema: `LocalBusiness` and `FAQPage` data complete
- [ ] NAP data (street_address, phone, zip_codes) populated
- [ ] Opening hours populated
- [ ] Directions populated
- [ ] Review URLs (gbp_url, google_reviews_url, yelp_url) populated
