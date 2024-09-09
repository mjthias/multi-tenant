import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const frontpage = defineType({
  name: "frontpage",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      initialValue: "Home",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "site",
      type: "reference",
      to: [{ type: "site" }],
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
  ],
});
