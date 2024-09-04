import { groq } from "next-sanity";

export const domainQuery = groq`
*[_type == "domain"][] {
  title,
  domain,
}
`;

export type DomainQueryRes = [
  {
    title: string;
    domain: string;
  },
];
