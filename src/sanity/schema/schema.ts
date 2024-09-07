import { type SchemaTypeDefinition } from "sanity";

import { domain } from "./documents/domain/domain.schema";
import { page } from "./documents/page/page.schema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [domain, page],
};
