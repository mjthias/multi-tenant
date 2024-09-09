import { groq } from "next-sanity";

export const frontpageQuery = groq`
*[_type == "frontpage" && domain->domain == $domain ][0] {
  title
}
`;

export type FrontpageQueryRes = {
  title?: string;
} | null;
