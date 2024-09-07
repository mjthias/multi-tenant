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
