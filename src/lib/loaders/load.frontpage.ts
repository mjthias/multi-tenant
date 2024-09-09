import { sanityLoad } from "../sanity.load";
import { frontpageQuery, type FrontpageQueryRes } from "@/sanity/schema/documents/frontpage/frontpage.queries";

type LoadFrontpageProps = {
  domain: string;
};

export async function loadFrontPage({ domain }: LoadFrontpageProps) {
  return await sanityLoad<FrontpageQueryRes>({ query: frontpageQuery, params: { domain } });
}
