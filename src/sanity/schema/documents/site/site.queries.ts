import { groq } from "next-sanity";

export const sitesQuery = groq`
*[_type == "site"][] {
  _id,
  title,
  domain,
}
`;

export type SitesQueryRes = [
  {
    _id: string;
    title?: string;
    domain?: string;
  },
];
