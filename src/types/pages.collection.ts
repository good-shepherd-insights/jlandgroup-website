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
      component_id: z.literal("location-intro"),
      title: z.string(),
      description: z.string(),
      meta_title: z.string().optional(),
      date: z.coerce.date().optional(),
      image: z.string().optional(),
      draft: z.boolean(),
      city: z.string().optional(),
      state: z.string().optional(),
      county: z.string().optional(),
    }),
    z.object({
      component_id: z.literal("metadata"),
      title: z.string(),
      meta_title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      draft: z.boolean(),
    }),
    z.object({
      component_id: z.literal("location-content"),
      title: z.string(),
      description: z.string(),
      meta_title: z.string().optional(),
      date: z.coerce.date().optional(),
      image: z.string().optional(),
      draft: z.boolean(),
      city: z.string().optional(),
      state: z.string().optional(),
      county: z.string().optional(),
      challenges_title: z.string().optional(),
      challenges_body: z.string().optional(),
      service_area_title: z.string().optional(),
      service_area_intro: z.string().optional(),
      service_area_neighborhoods: z
        .array(
          z.object({
            name: z.string(),
            slug: z.string().optional(),
          }),
        )
        .optional(),
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

    intro_image: z.string().optional(),

    intro: z
      .object({
        body: z.string().optional(),
        challenges_title: z.string().optional(),
        challenges_body: z.string().optional(),
        service_area_title: z.string().optional(),
        service_area_intro: z.string().optional(),
        service_area_neighborhoods: z
          .array(
            z.object({
              name: z.string(),
              slug: z.string().optional(),
            }),
          )
          .optional(),
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

    directions: z.string().optional(),

    // Review URLs surfaced by `LocationReviews.astro` on each location page.
    // Populate these per-location in the frontmatter of files under
    // `src/content/locations/<slug>.md`. All three are optional — the component
    // hides any link whose URL is missing.
    //   gbp_url             — Google Business Profile listing (the public GBP/Maps page).
    //                         Used for the "See our reviews on Google" outbound link.
    //   google_reviews_url  — Direct "write a review" link from Google
    //                         (e.g. https://search.google.com/local/reviews?placeid=...).
    //                         Used for the "Leave us a review on Google" CTA.
    //   yelp_url            — Yelp "write a review" link
    //                         (e.g. https://www.yelp.com/writeareview/biz/<id>).
    //                         Used for the "See our reviews on Yelp" outbound link.
    gbp_url: z.string().optional(),
    google_reviews_url: z.string().optional(),
    yelp_url: z.string().optional(),
  }),
});
