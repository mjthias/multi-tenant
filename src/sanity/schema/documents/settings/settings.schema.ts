import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export const settings = defineType({
  name: "settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      initialValue: "Settings",
      readOnly: true,
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
