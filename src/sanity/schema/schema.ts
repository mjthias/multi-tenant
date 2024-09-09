import { type SchemaTypeDefinition, type SchemaPluginOptions } from "sanity";

// Types
// Documents
import { site } from "./documents/site/site.schema";
import { page } from "./documents/page/page.schema";
import { frontpage } from "./documents/frontpage/frontpage.schema";
import { settings } from "./documents/settings/settings.schema";

// Templates

export const schema: { types: SchemaTypeDefinition[]; templates: SchemaPluginOptions["templates"] } = {
  types: [site, page, frontpage, settings],
  templates: (templates) => [
    {
      id: "frontpage-template",
      title: "Frontpage template",
      schemaType: "frontpage",
      parameters: [{ name: "siteId", type: "string" }],
      value: (params: { siteId: string }) => {
        return { site: { _type: "reference", _ref: params.siteId } };
      },
    },
    {
      id: "settings-template",
      title: "Settings template",
      schemaType: "settings",
      parameters: [{ name: "siteId", type: "string" }],
      value: (params: { siteId: string }) => {
        return { site: { _type: "reference", _ref: params.siteId } };
      },
    },
    {
      id: "page-template",
      title: "Page template",
      schemaType: "page",
      parameters: [
        { name: "siteId", type: "string" },
        { name: "parentId", type: "string" },
      ],
      value: (params: { siteId: string; parentId: string | null }) => {
        return {
          site: { _type: "reference", _ref: params.siteId },
          parent: params.parentId ? { _type: "reference", _ref: params.parentId } : undefined,
        };
      },
    },
    ...templates,
  ],
};
