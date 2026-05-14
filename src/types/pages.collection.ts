import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const commonFields = {
  title: z.string(),
  description: z.string(),
  meta_title: z.string().optional(),
  date: z.coerce.date().optional(),
  image: z.string().optional(),
  icon: z.string().optional(),
  draft: z.boolean(),
};

export const button = z.object({
  enable: z.boolean(),
  label: z.string(),
  link: z.string(),
  icon: z.string().optional(),
});

export const homepage = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({
    banner: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      satisfied_customers: z.object({
        enable: z.boolean(),
        count: z.string(),
        label: z.string(),
        images: z.array(z.string()),
      }),
      button_solid: button,
      button_outline: button,
    }),
    partners: z
      .array(
        z.object({
          name: z.string(),
          logo: z.string(),
        }),
      )
      .optional(),
    why_choose_us: z.object({
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
      image: z.string(),
      features: z.array(z.string()),
    }),
    what_we_offer: z.object({
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
      button: button,
    }),
    our_expertise: z.object({
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
      experience: z.object({
        years: z.string(),
        label: z.string(),
      }),
      images: z.array(z.string()),
      skills: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      ),
    }),
    blog_section: z.object({
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
    }),
  }),
});

export const blogpage = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }),
  schema: z.object({
    ...commonFields,
    categories: z.array(z.string()).optional(),
    featured: z.boolean().default(false).optional(),
  }),
});

export const aboutpage = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/about" }),
  schema: z.object({
    ...commonFields,
    experience: z.object({
      years: z.string(),
      label: z.string(),
    }),

    our_values: z.object({
      enable: z.boolean(),
      image: z.string(),
      values: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
        }),
      ),
    }),
    why_choose_us: z.object({
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
      image: z.string(),
      features: z.array(z.string()),
    }),

    our_team: z.object({
      enable: z.boolean(),
      title: z.string(),
      description: z.string(),
      members: z.array(
        z.object({
          name: z.string(),
          position: z.string(),
          image: z.string(),
          social: z.array(
            z.object({
              name: z.string(),
              link: z.string(),
              icon: z.string(),
            }),
          ),
        }),
      ),
    }),
  }),
});

export const servicepage = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/services" }),
  schema: z.object({
    ...commonFields,
    featured: z.boolean().default(false).optional(),
    contact_form: z
      .object({
        enable: z.boolean(),
        title: z.string(),
        description: z.string(),
        button_label: z.string(),
      })
      .optional(),
  }),
});

export const designpage = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/designs" }),
  schema: z.discriminatedUnion("component_id", [
    z.object({
      component_id: z.literal("service-card"),
      title: z.string(),
      description: z.string(),
      meta_title: z.string().optional(),
      date: z.coerce.date().optional(),
      image: z.string().optional(),
      icon: z.string().optional(),
      draft: z.boolean(),
      featured: z.boolean().default(false).optional(),
      contact_form: z
        .object({
          enable: z.boolean(),
          title: z.string().optional(),
          description: z.string().optional(),
          button_label: z.string().optional(),
        })
        .optional(),
    }),
    z.object({
      component_id: z.literal("metadata"),
      title: z.string(),
      meta_title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      draft: z.boolean(),
    }),
  ]),
});

export const appointmentpage = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/appointment" }),
  schema: z.object({
    ...commonFields,
  }),
});

export const contactpage = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/contact" }),
  schema: z.object({
    ...commonFields,
  }),
});

export const regularpage = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({
    ...commonFields,
  }),
});

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

    geo: z
      .object({
        latitude: z.string(),
        longitude: z.string(),
      })
      .optional(),

    population: z.string().optional(),

    hero: z
      .object({
        title: z.string(),
        subtitle: z.string(),
        image: z.string(),
      })
      .optional(),

    services: z
      .array(
        z.object({
          slug: z.string(),
          title_override: z.string().optional(),
          description_override: z.string().optional(),
        }),
      )
      .optional(),

    faqs: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .optional(),

    nearby_areas: z
      .array(
        z.object({
          name: z.string(),
          slug: z.string(),
        }),
      )
      .optional(),

    testimonials: z
      .array(
        z.object({
          name: z.string(),
          designation: z.string(),
          avatar: z.string(),
          content: z.string(),
        }),
      )
      .optional(),

    contact_form: z
      .object({
        enable: z.boolean(),
        title: z.string(),
        description: z.string(),
        button_label: z.string(),
      })
      .optional(),

    google_map: z
      .object({
        enable: z.boolean(),
        embed_url: z.string().optional(),
      })
      .optional(),
  }),
});
