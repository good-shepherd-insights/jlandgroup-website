# ADR 001: Modular Component Design Hub (Agnostic Infrastructure)

## Status
Proposed

## Context
A production-grade Design Hub must be completely decoupled from specific business logic. It should provide a universal framework for isolated component development, visual density testing, and A/B verification regardless of the component's data requirements.

## Technical Infrastructure Architecture

```typescript
// Pattern: [Component]Schema clones production-level types
const [ComponentA]Schema = z.object({ /* Production Fields */ });

export const designpage = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/designs" }),
  schema: z.discriminatedUnion("component_id", [
    z.object({ component_id: z.literal("[unique-id-a]"), ...[ComponentA]Schema.shape }),
    z.object({ component_id: z.literal("metadata"), title: z.string(), draft: z.boolean() }),
  ]),
});
```

### 2. Design Hub Index (`src/pages/designs/index.astro`)
The index page provides the entry point to the hub. It lists all components currently being developed by surfacing their `component_id` through the metadata collection.

```astro
---
import Layout from "../layouts/Layout.astro";
import { getCollection, getEntry } from "astro:content";

// Fetch index metadata (optional)
const pageIndex = await getEntry("designpage", "-index");
// Fetch all components to develop
const designs = await getCollection("designpage", ({ id }) => !id.startsWith("-"));
---

<Layout title={pageIndex?.data.title}>
  <section>
    <div>
      {designs.map((design) => (
        <div class="design-card">
          <h2>{design.data.title}</h2>
          <code>ID: {design.data.component_id}</code>
          <a href={`/designs/${design.id}`}>View Variations</a>
        </div>
      ))}
    </div>
  </section>
</Layout>
```

### 3. Universal Directory Structure
Components are grouped by their `component_id` and further subdivided into perfectly isolated variation folders.

```
src/layouts/components/[design-folder]/
├── [component-id]/
│   ├── variation-1/
│   │   └── [Component].astro
│   ├── variation-2/
│   │   └── [Component].astro
│   └── variation-3/
│       └── [Component].astro
```

### 3. Agnostic Dynamic Viewer (`src/pages/designs/[single].astro`)
The viewer infrastructure is component-agnostic. It resolves which component variations to render by looking up the `component_id` in a central registry.

```astro
---
import { getCollection, render } from "astro:content";
import { [VariationA1], [VariationB1] } from "../components/designs/registry";

const VariationRegistry = {
  "[unique-id-a]": [[VariationA1], [VariationA2]],
  "[unique-id-b]": [[VariationB1]],
};

export async function getStaticPaths() {
  const designs = await getCollection("designpage", ({ id }) => !id.startsWith("-"));
  return designs.map((design) => ({ params: { single: design.id }, props: { design } }));
}

const { design } = Astro.props;
const activeVariations = VariationRegistry[design.data.component_id] || [];
---

<Layout {...design.data}>
  <section>
    <div>
      {activeVariations.map((Component) => (
        <div class="variation-container">
          <div class="preview-grid">
            {/* Direct Injection of Isolated Component with Schema-Validated Props */}
            <Component data={design.data} id={design.id} />
          </div>
        </div>
      ))}
    </div>
  </section>
</Layout>
```

## Scaling Pattern for Any Component
1.  **Schema Alignment**: Add the target production schema as a new literal in the `designpage` union.
2.  **Data Hydration**: Create a markdown file in the designs folder using the production-accurate frontmatter.
3.  **Variation Implementation**: Implement the isolated Astro variations in the component's design sub-folder.
4.  **Registry Mapping**: Add the new variations to the `VariationRegistry`.

## Infrastructure Strengths
- **Decoupled Architecture**: No single part of the infrastructure is aware of another's specific business data.
- **Production Schema Parity**: Testing occurs against live data structures, eliminating integration surprises.
- **Infinite Scalability**: Adding new components requires zero index/viewer logic changes; only registration is needed.
