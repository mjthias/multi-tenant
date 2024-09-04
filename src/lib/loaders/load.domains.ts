import { sanityLoad } from "../sanity.load";
import { domainQuery, type DomainQueryRes } from "@/sanity/schema/documents/domain/domain.queries";

export async function loadDomains() {
  return await sanityLoad<DomainQueryRes>({ query: domainQuery });
}
