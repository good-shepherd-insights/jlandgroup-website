# J Land Group Design System

Comprehensive documentation of the J Land Contracting design system, capturing all exact tokens, color schemes, and core branding principles accurately.

## 🎨 Color Palette

The J Land Group color system utilizes CSS variables with RGB values to support Tailwind CSS alpha-channel transparency.

### Brand Colors
| Token | Variable | RGB | Hex | Role |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | `--color-brand-primary` | `38 35 39` | `#262327` | Main headings, dark backgrounds, core brand identity. |
| **Secondary** | `--color-brand-secondary` | `125 120 119` | `#7D7877` | Body text, subheadings, subtle contrast. |
| **Border** | `--color-brand-border` | `193 185 188` | `#C1B9BC` | UI borders, dividers, subtle containment. |

### Accent Colors
| Token | Variable | RGB | Hex | Role |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | `--color-accent-primary` | `253 184 19` | `#FDB813` | Primary CTAs, highlights, links, focus states. |
| **Secondary** | `--color-accent-secondary` | `196 164 100` | `#C4A464` | Hover states, secondary highlights. |

### Semantic / State Colors
| Token | Variable | RGB | Hex | Role |
| :--- | :--- | :--- | :--- | :--- |
| **Success** | `--color-state-success` | `59 110 68` | `#3B6E44` | Affirmative actions, success messages. |
| **Error** | `--color-state-error` | `185 46 46` | `#B92E2E` | Alerts, destructive actions, error messages. |

### Background Colors
| Token | Variable | RGB | Hex | Role |
| :--- | :--- | :--- | :--- | :--- |
| **Light** | `--color-background-light` | `248 249 250` | `#F8F9FA` | Main page background, light sections. |
| **Dark** | `--color-background-dark` | `38 35 39` | `#262327` | Dark mode sections, footers. |

> [!NOTE]
> In `src/styles/global.css`, `--color-background-dark` is defined as `rgb(50, 48, 52)` (#323034), providing a slightly softer dark tone than the Brand Primary.

---

## 🔡 Typography

### Font Families
- **Sans/Body**: `Inter`, sans-serif
- **Heading**: `Poppins`, sans-serif
- **Secondary Sans**: `Montserrat`, sans-serif

### Type Scales
- **Content Max-Width**: `72rem` (`maxWidth.content`)
- **Prose Width**: `65ch` (`maxWidth.prose`)
- **Prose Sizes**: Supporting `prose-lg` and `prose-xl` for long-form content.

---

## 🔳 UI Tokens

### Spacing Scale (Extensions)
- **18**: `4.5rem`
- **88**: `22rem`
- **128**: `32rem`

### Border Radius
- **4xl**: `2rem` (Used for large card components and section containers).

### Shadows
- **Brand Shadow**: `0 4px 14px 0 rgba(38, 35, 39, 0.1)`
- **Accent Shadow**: `0 4px 14px 0 rgba(253, 184, 19, 0.2)`

---

## 🕊️ Brand Foundations

### Core Values
- **Integrity & Reliability**: Moral excellence even when unobserved.
- **Devotion & Vision**: Following God's leading as the foundation of direction.
- **Team Unity & Accountability**: Caring for coworkers to foster collective growth.
- **God-Fearing & Honoring**: The ultimate standard for excellence.

### The Three Js (Foundation)
- **Jesus**: The Foundation.
- **Joseph**: The Hope.
- **Joshua**: The Vision.

### Mission Statement
To inform, to present, to build confidence and trust, and then to execute roofing, siding, and gutter solutions that provide total peace of mind for decades.

---

## 🛠️ Technical Integration Patterns (CloudCannon + Astro)

### Editable Region Patterns
- **Pure Templates**: Components must destructure props with **ZERO defaults** (no placeholders).
- **Single Source of Truth**: All content must live in Markdown frontmatter (`index.md`) or JSON data files (`data/layout.json`).
- **Data Scoping**: `@data[layout].key` for global data, plain `data-prop` for page-specific content.
- **Array Layers**: Three-layer pattern: `array` (container) -> `array-item` (loop iteration) -> `field` (individual value).
