import {
  aboutpage,
  appointmentpage,
  blogpage,
  contactpage,
  homepage,
  regularpage,
  servicepage,
  designpage,
} from "./types/pages.collection";
import {
  ctaSection,
  faqsSection,
  testimonialSection,
} from "./types/sections.collection";

// Export collections
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

  // sections
  ctaSection,
  testimonialSection,
  faqsSection,
};
// Force reload after schema update
