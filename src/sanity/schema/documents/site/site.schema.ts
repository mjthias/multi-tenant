import { defineField, defineType } from "sanity";
import { EarthGlobeIcon } from "@sanity/icons";

export const site = defineType({
  name: "site",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "domain",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
