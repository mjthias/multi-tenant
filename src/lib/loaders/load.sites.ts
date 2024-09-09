import { sanityLoad } from "../sanity.load";
import { sitesQuery, type SitesQueryRes } from "@/sanity/schema/documents/site/site.queries";

export async function loadSites() {
  return await sanityLoad<SitesQueryRes>({ query: sitesQuery });
}
