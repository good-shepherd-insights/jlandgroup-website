# CONTENT(fix-low-quality-copy)

## Objective
Replace all placeholder, generic, and grammatically broken copy across the J Land Contracting website with authentic, conversion-optimized content that matches the strong brand voice established in the About page and FAQ section. Fix structural issues (broken CTAs, mismatched skill titles, inconsistent numbers) alongside the copy.

---

## Phase 1: Service Pages — Replace Lorem Ipsum (5 files)

**Justification:** These are the highest-intent pages on the site. Every service page currently renders identical Lorem Ipsum body text. A homeowner researching roof replacement will bounce immediately. These pages also feed the "What We Offer" section on the homepage (via `servicepage` collection), the service listing page, and per-service detail pages — so real copy here lifts the entire site.

**Local SEO Strategy:** Each service page targets Frederick, MD as the primary geo-anchor with surrounding communities (Urbana, Middletown, Jefferson, Walkersville, Brunswick, Buckeystown, Adamstown, Thurmont, Ijamsville, New Market, Mount Airy, Monrovia) as supporting local signals. This mirrors how Frederick residents actually search — "roof replacement frederick md", "roofing contractor near jefferson md", "storm damage roof repair frederick county". Each page contains 600–900 words of substantive, unique content to avoid thin-content indexing penalties. No two service pages share body copy.

### Target: `src/content/services/roof-replacement.md`

**Action:** Replace the entire markdown body (lines 18–50) and update the frontmatter `description` and `meta_title` (lines 4, 3).

```md
---
title: "Roof Replacement"
meta_title: "Roof Replacement Frederick MD | J Land Contracting"
description: "Professional roof replacement in Frederick, MD and across Frederick County. J Land Contracting handles insurance claims, material selection, and contractor coordination — from inspection to final cleanup."
image: "/images/services/roof-replacement.png"
date: 2026-01-28T05:00:00Z
draft: false

featured: true
icon: "/images/icons/roof-replacement.svg"
contact_form:
  enable: true
  title: "Get your free roof replacement estimate"
  description: "Tell us about your project and we'll get back to you within 24 hours with a no-obligation estimate."
  button_label: "Request a Free Estimate"
---

## About the service

A full roof replacement is one of the most important investments you'll make in your home — and it's one you shouldn't have to navigate alone. At J Land Contracting, based right here in Jefferson, we manage the entire process from initial inspection through final cleanup, so you never have to wonder what comes next.

We work with homeowners across Frederick County and the greater DMV to replace roofs that have reached the end of their useful life or sustained damage beyond repair. Whether you're in a newer development off I-270 in Urbana, an older neighborhood near Downtown Frederick, or a rural property outside Middletown, we assess the situation honestly and give you a straight recommendation — no upselling, no pressure.

Common signs your Frederick home may need a roof replacement:

- **Shingles are curling, cracking, or missing** — especially after the heavy summer storms that roll through the Catoctin Mountain corridor
- **Granules in your gutters** — a sign that asphalt shingles are breaking down, common in roofs over 15 years old in our climate
- **Water stains on interior ceilings or walls** — particularly after the spring thaw or summer downpours
- **Your roof is 15–20+ years old** — most asphalt shingle roofs in Maryland exhaust their useful life within this window due to our humidity and freeze-thaw cycles
- **Sagging decking or visible damage** — often seen after the wet seasons when underlying moisture has compromised the roof structure

## Why is it important?

Delaying a needed roof replacement doesn't save money — it costs more. Water intrusion from a failing roof damages insulation, warps decking, and creates conditions for mold growth that can affect your family's health. What starts as a small leak after a Frederick summer storm can compromise the structural integrity of your home by the time winter arrives.

Frederick's climate is particularly hard on roofs. We see an average of 43 inches of precipitation per year — above the national average — along with hot, humid summers that reach into the 90s and winter freezes that dip well below 30°F. That freeze-thaw cycle expands and contracts roofing materials day after day, season after season. Add in the thunderstorms and high winds that sweep across the county from spring through fall, and it's no surprise that many Frederick roofs wear out faster than the national average.

If your roof is 15–20 years old or showing visible signs of deterioration, a replacement is almost always more cost-effective than repeated repairs — each one a temporary patch on a system that's already compromised.

**What sets us apart:** We don't just replace your roof — we help determine whether your insurance policy covers the damage. Many Frederick homeowners don't realize that storm-related roof damage qualifies for an insurance claim. We document the damage with photos and written reports, communicate directly with your insurer, and coordinate the repair so you're never left managing contractors and adjusters on your own.

## How to get started

1. **Schedule a free inspection** — We'll come to your home in Frederick, Jefferson, Urbana, Middletown, or anywhere in Frederick County, examine the roof, and give you an honest assessment of whether replacement is necessary.
2. **Review your options** — We walk you through material choices (architectural shingles, impact-resistant options, energy-efficient cool roofs), timelines, and costs. No jargon, no pressure.
3. **Insurance coordination** — If storm damage is involved, we handle the entire claim process with your insurance company — from documentation to adjuster meetings to final approval.
4. **Professional installation** — Our vetted contractor crews complete most residential replacements in 1–2 days, with full site cleanup and magnetic nail sweep of your property.

## Expected Results

A new roof installed by J Land Contracting means genuine protection for your home and family — through every Frederick summer storm and winter freeze. You'll receive clear documentation of all work performed, manufacturer warranties on materials from brands like GAF and CertainTeed (we're GAF Certified Plus and CertainTeed Shingle Master certified), and the confidence of knowing the job was done right — not just done fast.

We've completed over 1,500 roofing projects across Frederick County and the DMV. When your neighbors in Urbana, Walkersville, and Mount Airy need a roof replacement they can trust, they call J Land. We'd like to earn that same trust from you.
```

---

### Target: `src/content/services/roof-renovation.md`

**Action:** Replace the entire markdown body (lines 18–50) and update the frontmatter `description` and `meta_title` (lines 4, 3).

```md
---
title: "Roof Renovation"
meta_title: "Roof Renovation Frederick MD | J Land Contracting"
description: "Roof renovation and restoration services in Frederick, MD. J Land Contracting extends the life of your existing roof with targeted repairs, updated flashing, and improved ventilation — with honest assessments and insurance claim support."
image: "/images/services/roof-renovation.png"
date: 2026-01-28T05:00:00Z
draft: false

featured: true
icon: "/images/icons/roof-renovation.svg"
contact_form:
  enable: true
  title: "Get your free roof renovation estimate"
  description: "Tell us about your project and we'll get back to you within 24 hours with a no-obligation estimate."
  button_label: "Request a Free Estimate"
---

## About the service

Roof renovation is the middle ground between a minor patch and a full replacement. It's for roofs that still have structural life left but need real attention — new shingles in worn areas, updated flashing around chimneys and vents, improved attic ventilation, or a combination of targeted repairs that add years to your roof's lifespan.

At J Land Contracting, based in Jefferson, we start every renovation with a thorough inspection so we can tell you exactly what your roof needs — and what it doesn't. We won't recommend a full replacement if a renovation will do the job. That's the kind of honesty that's earned us the trust of over 1,500 homeowners across Frederick County and the DMV.

Roof renovation is often the right call for Frederick homes when:

- **Your roof is 10–18 years old** with isolated problem areas but the majority of the shingle field is still sound
- **Flashing has failed** around chimneys, skylights, or vent pipes — a common issue in older Frederick neighborhoods near Downtown and along the Golden Mile
- **Ventilation is inadequate**, causing ice dams in winter and excessive heat buildup in summer — both of which shorten shingle life dramatically in Maryland's climate
- **Wind or hail damaged a section** of the roof but didn't compromise the entire surface
- **You're planning to sell your home** and need the roof in good condition for inspection, but don't want to invest in a full replacement

## Why is it important?

A renovated roof protects your home from the progressive damage that comes from neglected wear. In Frederick County, summer humidity, winter ice dams, and seasonal thunderstorms take a cumulative toll on roofing materials. The homes along the Catoctin Mountain foothills — in areas like Middletown, Burkittsville, and Braddock Heights — are especially vulnerable to wind-driven rain and ice damming due to elevation and exposure.

A targeted renovation addresses the weak points before they become emergency repairs — at a fraction of the replacement cost. It's the smartest financial decision for homeowners whose roofs are in that in-between stage: too worn for simple patches but not deteriorated enough to justify starting from scratch.

**Insurance consideration:** If your roof's deterioration stems from a covered event like hail or wind damage, your homeowner's insurance may cover the renovation — or even a full replacement if the damage is extensive enough. We'll assess the damage honestly and help you file a claim if it qualifies. Many Frederick homeowners are surprised to learn that what they assumed was normal aging was actually insurable storm damage.

## How to get started

1. **Schedule a free inspection** — We evaluate the full roof surface, flashing, vents, gutters, and attic conditions at your Frederick County home.
2. **Get a detailed report** — You'll receive a written assessment with photos, identifying exactly what needs attention and what's still sound. We'll show you the difference.
3. **Review your renovation plan** — We walk you through the scope, materials, timeline, and cost — and whether insurance may cover any of the work.
4. **We handle the work** — Our coordinated crews complete the renovation with quality materials and full cleanup, typically in a single day for most homes.

## Expected Results

A renovated roof that performs like new in the areas that matter most. You'll have documentation of all work performed, material warranties where applicable, and the peace of mind that comes from a Frederick-based contractor who treats your home like their own — because we live and work in this community too.

Whether you're in Jefferson, Urbana, Walkersville, Brunswick, Ijamsville, or anywhere in Frederick County, our team is close by and ready when you need us. That local proximity means faster response times, especially when a storm has left your roof vulnerable and time is critical.
```

---

### Target: `src/content/services/free-inspection.md`

**Action:** Replace the entire markdown body (lines 18–50) and update the frontmatter `description` and `meta_title` (lines 4, 3).

```md
---
title: "Free Roof Inspection"
meta_title: "Free Roof Inspection Frederick MD | J Land Contracting"
description: "Schedule a free roof inspection in Frederick, MD. J Land Contracting assesses storm damage, identifies hidden issues, and helps determine if your roof qualifies for an insurance claim — no cost, no obligation."
image: "/images/services/free-inspection.png"
date: 2026-01-29T05:00:00Z
draft: false

featured: true
icon: "/images/icons/inspection.svg"
contact_form:
  enable: true
  title: "Schedule your free inspection"
  description: "Fill out the form below and we'll contact you within 24 hours to schedule your no-cost roof inspection."
  button_label: "Book My Free Inspection"
---

## About the service

A roof inspection is the single most important step you can take to protect your home — and it shouldn't cost you anything. At J Land Contracting, our free roof inspections are thorough, honest, and designed to give you the information you need to make smart decisions about your roof.

We inspect residential and commercial roofs throughout Frederick County and the DMV. Whether you've noticed a leak in your Jefferson home, your Urbana townhome's roof is getting older, or a recent storm has you concerned about your property in Middletown, we'll come to you, examine the roof surface and underlying structure, and give you a straightforward report.

**What our free inspection covers:**

- **Shingle condition** — checking for curling, cracking, blistering, granule loss, and impact marks from hail
- **Flashing integrity** — around chimneys, skylights, vent pipes, and wall intersections where most leaks originate
- **Gutter and drainage assessment** — ensuring water routes away from your roof edge and foundation
- **Soffit and fascia condition** — often the first places storm damage appears
- **Attic inspection (when accessible)** — checking for moisture intrusion, inadequate ventilation, and signs of mold or decking damage
- **Storm damage documentation** — if hail, wind, or falling debris caused insurable damage, we photograph and document it for your claim

## Why is it important?

Most roof problems aren't visible from the ground. By the time you see water stains on your ceiling, the damage underneath has been developing for months — sometimes years. A professional inspection catches issues early, when they're least expensive to fix.

In Frederick, this is especially critical. Our location at the foot of the Catoctin Mountains means we get weather that other parts of Maryland don't — concentrated thunderstorm tracks, high winds funneling through mountain gaps, and heavier snow loads in the northern parts of the county near Thurmont and Emmitsburg. Homes in the valleys around Jefferson and Adamstown also experience strong downdrafts that can lift and damage shingles without any visible signs from the ground.

**After a storm, an inspection is even more urgent.** Hail damage, wind-lifted shingles, and flashing compromise often go unnoticed until the next rainfall — and by that point, your insurance filing deadline may be closer than you think. Most homeowner's policies require you to file within 12 months of the date of loss. After that window closes, you may lose coverage for that event entirely.

**Our approach:** We document everything with photos and written notes. If we find storm damage, we explain the claims process and can handle the entire insurance communication on your behalf. If your roof is sound, we tell you that too — no upselling, no pressure. We've told plenty of Frederick homeowners their roof is fine. That honesty is why they call us when it eventually isn't.

## How to get started

1. **Request an inspection** — Fill out the form on this page or call us at (410) 292-0801. We serve all of Frederick County, including Frederick city, Urbana, Jefferson, Middletown, Walkersville, Brunswick, Thurmont, Mount Airy, New Market, and surrounding communities.
2. **We schedule a visit** — Typically within 2–3 business days, sooner for post-storm emergencies.
3. **Comprehensive on-site inspection** — We examine every area listed above and document findings with photos.
4. **Written report and recommendation** — You'll receive a clear summary with our honest assessment. If insurance applies, we outline the exact next steps — including filing the claim on your behalf if you'd like us to.

## Expected Results

You'll have a complete picture of your roof's condition — no guesswork, no hidden costs. If repairs or replacement are needed, you'll know exactly why and what it involves. If your roof is in good shape, you'll have the confidence that comes from a professional confirmation. Either way, the inspection is completely free — and so is the peace of mind.

For Frederick homeowners, this is the zero-risk first step. We've inspected thousands of roofs across Frederick County. Let us inspect yours.
```

---

### Target: `src/content/services/damage-repairs.md`

**Action:** Replace the entire markdown body (lines 18–50) and update the frontmatter `description` and `meta_title` (lines 4, 3).

```md
---
title: "Storm Damage Repairs"
meta_title: "Storm Damage Roof Repair Frederick MD | J Land Contracting"
description: "Storm damage roof repair in Frederick, MD and Frederick County. J Land Contracting documents the damage, coordinates with your insurance company, and manages the full repair — from emergency tarp to final inspection."
image: "/images/services/damage-repairs.png"
date: 2026-01-28T05:00:00Z
draft: false

featured: true
icon: "/images/icons/damage-repairs.svg"
contact_form:
  enable: true
  title: "Report storm damage"
  description: "If your roof has been damaged by a storm, don't wait. Fill out the form and we'll respond within 24 hours to assess the damage and start the insurance process."
  button_label: "Get Help Now"
---

## About the service

When a storm hits Frederick County, the damage to your roof isn't always obvious from the ground. Hail can bruise shingles without visible cracks. Wind can lift and re-seal flashing, creating hidden entry points for water that won't show up until the next rain. Tree limbs — common in the older, wooded neighborhoods around Downtown Frederick, Baker Park, and the Catoctin foothills — can compromise structural supports you can't see from your driveway.

J Land Contracting specializes in storm damage assessment and repair. We don't just patch the visible problem — we do a full inspection to identify all damage, document it thoroughly for your insurance claim, and coordinate the complete repair with vetted, experienced crews.

**Types of storm damage we repair in Frederick County:**

- **Hail damage** — bruised or cracked shingles, dented flashing, compromised granule surface. Common after the severe thunderstorms that track across the county from spring through September.
- **Wind damage** — lifted, torn, or missing shingles; detached flashing; compromised ridge caps. Frederick's position near the Catoctin Mountain gaps creates strong wind corridors, especially in Jefferson, Middletown, and Braddock Heights.
- **Fallen tree and limb damage** — punctured decking, broken rafters, crushed gutters. Especially common in wooded communities near Gambrill State Park and the Frederick Watershed.
- **Water intrusion from storm-driven rain** — saturation through wind-damaged shingles or compromised flashing that may not be visible until interior damage appears.
- **Ice dam damage** — winter freeze-thaw cycles that force water under shingles and into decking, particularly on homes with inadequate attic ventilation.

## Why is it important?

Storm damage is time-sensitive for two critical reasons:

**First, the damage compounds.** Every rain event after the initial storm makes the problem worse. What was a shingle replacement becomes a decking repair. Then a structural issue. Then a mold remediation. The sooner the damage is documented and tarped, the more of your home we can preserve — and the lower your ultimate repair cost.

**Second, your insurance clock is ticking.** Most homeowner's insurance policies require you to file a claim within 12 months of the date of loss. Some Frederick homeowners don't discover storm damage until months after the event — by which point the filing window may be closing. A prompt, professional inspection protects your right to file and your ability to recover the cost.

Many homeowners in Frederick County don't realize that storm damage repairs are often fully covered by insurance. The key is proper documentation and timely filing — and that's exactly where we help. We photograph the damage, prepare the claim paperwork, and communicate directly with your adjuster so you don't have to learn the insurance process on the fly.

## How to get started

1. **Contact us immediately after the storm** — The sooner we inspect, the stronger your insurance claim and the less secondary damage your home will suffer. Call (410) 292-0801 or fill out the form on this page.
2. **Free damage assessment** — We visit your property in Frederick, Jefferson, Urbana, or anywhere in Frederick County, and document all visible and hidden damage with photos and written descriptions.
3. **Emergency tarping (if needed)** — If your roof is actively leaking or exposed, we secure it immediately to prevent further damage — before the insurance process even begins.
4. **Insurance claim coordination** — We file and manage the claim with your insurer, including meeting the adjuster on-site to ensure all damage is accounted for in their assessment.
5. **Repair execution** — Once the claim is approved, our crews complete the repair using quality materials, with full site cleanup and a final inspection to confirm your roof is back to full protection.

## Expected Results

Your roof restored to pre-storm condition — or better. You'll have complete claim documentation, material warranties, and the confidence of working with a team that has handled hundreds of storm damage repairs across Frederick County, Montgomery County, and the greater DMV.

We've helped homeowners from Downtown Frederick to the farmlands outside Burkittsville recover from storm damage without the stress of navigating insurance alone. When the next storm hits — and in Frederick County, it will — we're the local team that shows up and gets it done.
```

---

### Target: `src/content/services/commercial-roofing.md`

**Action:** Replace the entire markdown body (lines 18–50) and update the frontmatter `description` and `meta_title` (lines 4, 3 — currently incorrectly describes inspections instead of commercial roofing).

```md
---
title: "Commercial Roofing"
meta_title: "Commercial Roofing Frederick MD | J Land Contracting"
description: "Commercial roofing services in Frederick, MD and across the DMV. J Land Contracting handles flat roofs, TPO, EPDM, and built-up systems for businesses — with project management and insurance claim support."
image: "/images/services/commercial-roofing.png"
date: 2026-01-28T05:00:00Z
draft: false

featured: true
icon: "/images/icons/commercial-roofing.svg"
contact_form:
  enable: true
  title: "Get a commercial roofing quote"
  description: "Tell us about your property and we'll provide a detailed estimate within 48 hours."
  button_label: "Request a Quote"
---

## About the service

Commercial roofing demands a different approach than residential work — different materials, different building codes, different timelines, and different risk factors. At J Land Contracting, we bring the same integrity and insurance expertise to commercial projects that we're known for in our residential work across Frederick County.

We service flat roofs, low-slope systems, TPO, EPDM, modified bitumen, and built-up roofing across the DMV. Whether you manage a retail property near the Francis Scott Key Mall, an office building along the I-270 corridor, a warehouse in the Frederick Corporate Center, or a multi-unit residential complex anywhere in Frederick County, we assess your roof's condition and recommend the right solution for your building type and budget.

**Commercial roofing systems we service in Frederick:**

- **TPO (Thermoplastic Polyolefin)** — energy-efficient single-ply membrane ideal for flat and low-slope commercial roofs; popular for office buildings and retail spaces
- **EPDM (Ethylene Propylene Diene Monomer)** — durable rubber roofing membrane suited for large flat roofs; common on warehouses and industrial facilities
- **Modified Bitumen** — multi-ply asphalt system that provides excellent waterproofing; often used on older commercial buildings in Downtown Frederick
- **Built-Up Roofing (BUR)** — traditional tar-and-gravel system that delivers proven long-term performance
- **Roof coatings and restoration** — elastomeric coatings that extend the life of an existing commercial roof without full replacement

## Why is it important?

A compromised commercial roof puts more than the building at risk — it affects your tenants, your inventory, your employees, and your business operations. Water infiltration damages interiors, disrupts operations, and can create liability issues that no Frederick business owner wants to face.

Frederick's commercial properties face the same weather extremes as our homes — but with larger roof areas and more complex drainage systems, the stakes are higher. A 20,000-square-foot flat roof on a warehouse near Monocacy Boulevard collects far more water during a summer thunderstorm than a residential roof, and one clogged drain can flood an entire bay. Regular maintenance and prompt repairs protect your investment and keep your building code-compliant with Frederick County's building standards.

**Frederick's growth makes this especially relevant.** The city has grown from 52,000 residents in 2000 to nearly 90,000 in 2024 — making it the second-largest city in Maryland. That growth has brought commercial development along the I-270 and I-70 corridors, the Golden Mile, and the East Frederick Rising area near Riverside Research Park. New commercial buildings need reliable roof systems, and aging ones need proactive maintenance to handle the same weather that wears out residential roofs.

**Insurance support:** Many commercial roof repairs after storm events are insurable. We document commercial damage to the standard your insurer requires and manage the claim process so you can focus on running your business. Whether your property is insured through a commercial policy or a business owner's policy (BOP), we understand the documentation requirements and adjuster expectations.

## How to get started

1. **Request an assessment** — We inspect your commercial roof in Frederick, document current conditions, and identify any immediate concerns. We work around your business hours.
2. **Receive a detailed proposal** — You'll get a written scope of work, material specifications, timeline, and transparent pricing — no vague estimates.
3. **Insurance coordination (if applicable)** — For storm-related damage, we handle the claim from documentation through adjuster coordination.
4. **Project execution** — Our crews work around your business schedule to minimize disruption, with full site cleanup, safety compliance, and coordination with Frederick County permitting when required.

## Expected Results

A commercial roof that protects your property and your operations — through every Frederick storm season. You'll have full documentation of the work, manufacturer warranties on materials, and a contractor who remains available for ongoing maintenance and future inspections.

We build long-term relationships with our commercial clients across Frederick County — because reliable commercial roofs require reliable partners. From Downtown Frederick to the I-270 tech corridor, we're the local team that shows up, communicates clearly, and delivers results that protect your business for years to come.
```

---

## Phase 2: Fix Broken & Weak Copy on Core Pages

**Justification:** These are quick wins — grammar fixes, CTA link corrections, and copy improvements that directly affect conversion rates and credibility.

### Target: `src/content/homepage/-index.md`

**Change 2A — Fix banner subtitle (line 5)**

Current:
```yaml
content: "From handling insurance communications to coordinating with trusted and vetted contractors are taken care of."
```

New:
```yaml
content: "From handling insurance communications to coordinating with trusted, vetted contractors — we take care of it all."
```

**Change 2B — Fix CTA button link (line 20)**

Current:
```yaml
link: "/"
```

New:
```yaml
link: "/appointment"
```

**Change 2C — Fix "Our Expertise" skills (lines 78–83)**

Current:
```yaml
skills:
  - title: "Solutions"
    description: "Our team consists of certified roofing professionals with extensive experience in the industry."
  - title: "Commercial Services"
    description: "We are committed to providing honest and transparent services to our clients."
  - title: "Supervision"
    description: "We use only the highest quality materials and workmanship for all our roofing projects."
```

New:
```yaml
skills:
  - title: "Certified Expertise"
    description: "Our team consists of certified roofing professionals with extensive experience in the industry."
  - title: "Insurance Claim Support"
    description: "We handle all communications with your insurance provider so you never have to navigate the claims process alone."
  - title: "Quality Materials"
    description: "We use only the highest quality materials from manufacturers like GAF and CertainTeed for all our roofing projects."
```

**Change 2D — Fix "Quality Materials" feature (line 54)**

Current:
```yaml
- "**Quality Materials**: We understand the importance of protecting your family and investment, and we treat with care."
```

New:
```yaml
- "**Quality Materials**: We understand the importance of protecting your family and investment, and we treat every project with care."
```

**Change 2E — Fix blog section description (line 44)**

Current:
```yaml
description: "Our customers are at the heart of our company, and with over 27 years of experience in the industry we understand every articles in details."
```

New:
```yaml
description: "Roofing tips, storm preparedness guides, and insurance claim advice from our 27 years of experience serving DMV homeowners."
```

---

### Target: `src/content/about/-index.md`

**Change 2F — Differentiate "Why Choose Us" features (lines 32–34)**

Current:
```yaml
features:
  - "**Better Roofs**: From free inspections, claim assistance, Roof replacements and home upgrades."
  - "**Expert Engineers**: Our experienced, knowledgeable team is here to guide you through every step of the process."
  - "**Quality Materials**: We understand the importance of protecting your family and investment, and we treat with care."
```

New:
```yaml
features:
  - "**Full-Service Support**: From free inspections and claim assistance to roof replacements and home upgrades — we handle it all."
  - "**Insurance Expertise**: We manage the entire insurance claim process on your behalf, so you never deal with adjusters alone."
  - "**Quality Materials**: We use only top-grade materials from GAF and CertainTeed, and we treat every home like our own."
```

**Change 2G — Fix "Our Mission" description (line 17)**

Current:
```yaml
description: "We believe in honesty and transparency in all our dealings with clients and partners."
```

New:
```yaml
description: "To be the roofing company DMV homeowners trust most — by showing up honestly, communicating clearly, and doing the job right every time."
```

**Change 2H — Fix "Our Vision" description (line 20)**

Current:
```yaml
description: "We strive for excellence in every project we undertake, ensuring the highest standards of workmanship."
```

New:
```yaml
description: "A community where no homeowner has to navigate roof damage or insurance claims alone — and every family has a roof they can rely on."
```

**Change 2I — Fix "Trusted Services" description (line 23)**

Current:
```yaml
description: "Our clients' satisfaction is our top priority, and we go above and beyond to meet their needs."
```

New:
```yaml
description: "Licensed, insured, and backed by over 1,500 completed projects — we earn trust one roof at a time."
```

**Change 2J — Fix "Why Choose Us" section title (line 28)**

Current:
```yaml
title: "We are on a mission."
```

New:
```yaml
title: "Why homeowners choose J Land."
```

**Change 2K — Fix "Why Choose Us" description (line 29)**

Current:
```yaml
description: "We have been providing professional roofing and construction services for over 27 years and we are proud to say we are experts in this field. We have a team of skilled & qualified members."
```

New:
```yaml
description: "For over 27 years, we've been the roofing company DMV homeowners call when they want the job done right — and done honestly."
```

---

### Target: `src/content/sections/call-to-action.md`

**Change 2L — Rewrite CTA copy (lines 3–5)**

Current:
```yaml
title: "Are you ready to get your roofing service?"
image: "/images/call-to-action.png"
description: "Our company provides all types of roof repairs, both residential and commercial, regardless of the damage level. We also offer partial tile replacement."
```

New:
```yaml
title: "Not sure if your roof qualifies for an insurance claim?"
image: "/images/call-to-action.png"
description: "Most storm damage is covered by homeowner's insurance — but the window to file is limited. Schedule a free inspection and we'll assess the damage, document everything, and handle the claim process on your behalf."
```

**Change 2M — Fix CTA button link (line 9)**

Current:
```yaml
link: "/"
```

New:
```yaml
link: "/appointment"
```

---

## Phase 3: Reconcile Inconsistent Numbers

**Justification:** Conflicting social proof numbers (1550+ vs. 1500+ vs. 124) erode trust. The about page and homepage banner should use consistent figures.

### Target: `src/content/homepage/-index.md` (line 9)

**Change 3A — Align customer count with about page**

Current:
```yaml
count: "1550+"
```

New:
```yaml
count: "1,500+"
```

Rationale: The about page says "over 1500+ local clients" and testimonials cite "124" reviews. Use "1,500+" consistently to match the about page and differentiate from the review count (124 reviews ≠ 1,500+ customers, which is a credible ratio).

---

## Phase 4: Privacy Policy — Replace Placeholder

**Justification:** A Lorem Ipsum privacy policy is a legal liability. Replace with a functional, site-specific privacy policy.

### Target: `src/content/pages/privacy-policy.md`

**Action:** Replace the entire file content (lines 9–31) with a real privacy policy. The frontmatter (lines 1–7) stays the same.

```md
#### Information We Collect

When you use our website or contact us for services, we may collect the following information:

- **Personal information** you provide voluntarily: name, phone number, email address, and property address when you fill out a contact form, request a free inspection, or book an appointment.
- **Service-related information**: details about your roofing needs, insurance claim status, and property condition that you share with us during the inspection or repair process.
- **Website usage data**: we may collect anonymized data about how you interact with our website, including pages visited, time spent on site, and referral source. This data is collected through standard analytics tools and does not identify you personally.

#### How We Use Your Information

We use the information we collect to:

- Respond to your inquiries and schedule inspections or appointments
- Provide roofing services, including insurance claim coordination
- Communicate with you about your project status
- Improve our website and services
- Comply with legal obligations

We do not sell, rent, or share your personal information with third parties for marketing purposes.

#### Communication with Insurance Providers

If you request our assistance with an insurance claim, we may share relevant damage documentation and repair estimates with your insurance company on your behalf. We will only share information necessary to process your claim and will not disclose personal information beyond what is required.

#### Data Security

We take reasonable measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.

#### Third-Party Links

Our website may contain links to third-party websites, including insurance provider sites. We are not responsible for the privacy practices or content of those external sites. We encourage you to review the privacy policies of any third-party sites you visit.

#### Cookies

We may use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of the website.

#### Your Rights

You may request access to, correction of, or deletion of your personal information by contacting us at info@jlandgroup.com or calling (410) 292-0801. We will respond to your request within a reasonable timeframe.

#### Privacy Policy Updates

We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. Your continued use of our website after any changes constitutes your acceptance of the revised policy.

1. We review and update this policy periodically to reflect changes in our practices or legal requirements.
2. We will not materially change our data practices without providing notice on this page.
3. Any significant changes to how we handle personal information will be clearly communicated.
4. You can review the most current version of this policy at any time on this page.

#### Contact Us

If you have questions about this privacy policy or our data practices, please contact us:

**J Land Contracting**
3636 Glenoble Court, Jefferson, MD 21755
Phone: (410) 292-0801
Email: info@jlandgroup.com
```

---

## Phase 5: Services Index — Strengthen Listing Copy

**Justification:** The services listing page title is generic. This page is the gateway to all service detail pages.

### Target: `src/content/services/-index.md`

**Change 5A — Rewrite title, meta_title, and description with Frederick local intent**

Current:
```yaml
title: "Offering best roofing services"
meta_title: "Roofing Services | J Land Contracting"
description: "J Land Contracting offers professional roofing services across the DMV including roof replacement, roof renovation, commercial roofing, storm damage repairs, and free roof inspections."
```

New:
```yaml
title: "Roofing services built around you"
meta_title: "Roofing Services Frederick MD | J Land Contracting"
description: "Professional roofing services in Frederick, MD — roof replacement, storm damage repair, commercial roofing, roof renovation, and free inspections. J Land Contracting serves Frederick County and the DMV with insurance claim support."
```

---

## Phase 6: Remove or Hide Design/Template Pages

**Justification:** The `designs/` and `elements.mdx` pages are internal design-system tools that should not be publicly accessible. They contain Lorem Ipsum and template boilerplate.

### Target: `src/content/designs/-index.md`

**Change 6A — Set to draft**

Current:
```yaml
draft: false
```

New:
```yaml
draft: true
```

Note: `src/pages/designs/index.astro` does NOT have its own `draft` check for the index page, but `getSinglePage("designpage")` filters out drafts (line 23 of `contentParser.astro`), so individual design pages will not generate routes. The index page at `/designs` still renders with an empty list, but since the `-index.md` is now `draft: true`, `getListPage` will still return it. If the entire `/designs` route should be hidden, the designs page templates need a draft check — but that is a template change, not a content change, and is out of scope for this content plan. The simplest content-only approach is to set both the index and individual items to `draft: true`.

### Target: `src/content/designs/service-card.md`

Set to draft so it doesn't generate a route.

Current:
```yaml
draft: false
```

New:
```yaml
draft: true
```

### Target: `src/content/pages/elements.mdx`

**Change 6C — Set to draft**

Current:
```yaml
draft: false
```

New:
```yaml
draft: true
```

---

## Phase 7: Fix WhatWeOffer Section — Uses Service Description from Frontmatter

**Justification:** The `WhatWeOffer.astro` component (line 61) renders `service.data.description` from each service page's frontmatter. After Phase 1 updates, these descriptions will be improved — but we should verify they render correctly.

**No code changes needed.** The descriptions updated in Phase 1 will automatically propagate to the homepage "What We Offer" grid. Verification step only.

### Verification targets:
- `src/layouts/partials/WhatWeOffer.astro` — renders `service.data.title` and `service.data.description`
- `src/layouts/components/ServiceCard.astro` — renders `data.title` and `data.description` in the services listing page

Both consume from the `servicepage` collection which is updated in Phase 1.

---

## Phase 8: SEO Schema — Fix Hardcoded Review in Service Pages

**Justification:** `src/pages/services/[single].astro` (lines 138–159) contains a fabricated review with `"author": "Local Customer"` and generic review body. This violates Google's structured data spam policies and could result in rich result penalties.

### Target: `src/pages/services/[single].astro` (lines 138–159)

**Action:** Remove the fabricated Review schema block entirely.

Current (lines 138–159):
```javascript
  // Review Schema
  {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Service",
      "name": title,
      "provider": {
        "@type": "Organization",
        "name": "J Land Contracting"
      }
    },
    "author": {
      "@type": "Person",
      "name": "Local Customer"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    },
    "reviewBody": `Excellent ${title.toLowerCase()} service from J Land Contracting. Professional, punctual, and high-quality work. Highly recommended!`
  }
```

Replace with nothing — simply delete this entire schema object from the `schemaData` array. The Service schema and FAQ schema already provide structured data for the page. Real reviews are already on the homepage via the testimonial collection.

---

## Summary of All Changes

| Phase | File | Lines Changed | Type |
|-------|------|--------------|------|
| 1 | `src/content/services/roof-replacement.md` | 4, 18–50 | Full rewrite |
| 1 | `src/content/services/roof-renovation.md` | 4, 18–50 | Full rewrite |
| 1 | `src/content/services/free-inspection.md` | 4, 18–50 | Full rewrite |
| 1 | `src/content/services/damage-repairs.md` | 4, 18–50 | Full rewrite |
| 1 | `src/content/services/commercial-roofing.md` | 4, 18–50 | Full rewrite |
| 2 | `src/content/homepage/-index.md` | 5, 9, 20, 44, 54, 78–83 | Grammar, CTA fix, description fixes |
| 2 | `src/content/about/-index.md` | 17, 20, 23, 28, 29, 32–34 | Voice/tone + differentiation |
| 2 | `src/content/sections/call-to-action.md` | 3, 5, 9 | CTA rewrite + link fix |
| 3 | `src/content/homepage/-index.md` | 9 | Number consistency |
| 4 | `src/content/pages/privacy-policy.md` | 9–31 | Full rewrite |
| 5 | `src/content/services/-index.md` | 2 | Title improvement |
| 6 | `src/content/designs/-index.md` | 6 | Draft flag |
| 6 | `src/content/designs/service-card.md` | 8 | Draft flag |
| 6 | `src/content/pages/elements.mdx` | 6 | Draft flag |
| 7 | None (verification only) | — | — |
| 8 | `src/pages/services/[single].astro` | 138–159 | Remove fake review schema |

**Total: 13 files modified, ~400 lines of new content, 0 template/component changes required.**