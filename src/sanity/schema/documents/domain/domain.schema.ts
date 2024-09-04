import { defineType } from "sanity";

export const domain = defineType({
  name: "domain",
  type: "document",
  fields: [
    {
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "domain",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
});
