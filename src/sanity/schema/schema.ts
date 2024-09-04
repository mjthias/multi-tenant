import { type SchemaTypeDefinition } from "sanity";

import { domain } from "./documents/domain/domain.schema";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [domain],
};
