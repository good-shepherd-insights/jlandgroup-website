# Code Review for `feat/goo-10-service-area-locations`

## What I Did:
1. Checked out the branch `feat/goo-10-service-area-locations` (`013fd70`).
2. Examined the new component `src/layouts/components/ServiceAreaLocations.astro`.
3. Examined the modifications to `src/pages/services/[single].astro`.
4. Validated the build by running `npm run build` and `npx astro check`. The build completed successfully without regressions (existing type warnings were pre-existing).

## Feedback

**Strengths:**
- **Local SEO Improvement:** The inclusion of `cityAreas` array with `@type: City` and `sameAs` directly pointing to the location pages in the Service's `areaServed` JSON-LD schema is excellent for local SEO and cross-linking.
- **Component Reusability:** Extracting `ServiceAreaLocations` as a standalone UI component keeps `[single].astro` clean.
- **Robustness:** Using `locations.length > 0` conditionally prevents the section from rendering when a service isn't offered in any locations yet.

**Areas for Improvement / Minor Issues:**
1. **Schema Warning (`src/pages/services/[single].astro`):**
   When building `areaServed`, `geoRadius` uses a string `"80467"`. For strictly valid JSON-LD/Schema.org, distance values in `GeoCircle` often expect a number or a string with units (e.g., `"80467"` is technically a string, schema.org validators might prefer a number or `Distance` object, but it's acceptable in many parsers).
2. **Type Safety (`src/pages/services/[single].astro`):**
   The mapping function for `locations` prop uses `loc.data.city || ""` and `loc.data.state || ""`. If a location is accidentally created without these fields, it will render as `", "`. It might be safer to filter out locations without a city/state before passing them to the component.
3. **Empty Link Target (`src/layouts/components/ServiceAreaLocations.astro`):**
   The link `href={"/locations/${loc.id}"}` is good. However, if any styling or container is empty, it might be weird. The UI is fine.

**Conclusion:**
Overall, this PR perfectly addresses the requirements of the task (SEO checklist items #17 and #22). The code is clean, functional, and builds without issues. LGTM.
