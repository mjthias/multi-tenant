import { toUrlSafe } from "@/lib/toUrlSafe";
import { defineField } from "sanity";

export const page = defineField({
  name: "page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "site",
      type: "reference",
      to: [{ type: "site" }],
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "parent",
      type: "reference",
      to: [{ type: "page" }],
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        slugify: toUrlSafe,
      },
      validation: (SlugRule) =>
        SlugRule.custom((self: any) => {
          if (!self || !self?.current) return "Slug is required";
          const slug = self.current;
          if (toUrlSafe(slug) != slug) return "Slug is not URL-safe";
          return true;
        }),
    }),
  ],
});
