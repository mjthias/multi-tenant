import { defineField, defineType } from "sanity";

export const domain = defineType({
  name: "domain",
  type: "document",
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
