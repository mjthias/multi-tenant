import type { StructureResolver } from "sanity/structure";
import { apiVersion } from "@/lib/sanity.env";

import { CogIcon, EarthGlobeIcon, HomeIcon } from "@sanity/icons";
import { sitesQuery, SitesQueryRes } from "../../schema/documents/site/site.queries";
import pageReferenceTree from "./pageReferenceTree";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = async (S, context) => {
  const client = context.getClient({ apiVersion });
  const sites = await client.fetch<SitesQueryRes>(sitesQuery);

  return S.list()
    .title("Base")
    .items([
      // Create listItem per published site
      ...sites?.map((site) => {
        return S.listItem()
          .title(site.title || "Unnamed Site")
          .icon(EarthGlobeIcon)
          .child(
            S.list()
              .title(site.title || "Unnamed Site")
              .items([
                // Site Frontpage
                S.listItem()
                  .title("Frontpage")
                  .icon(HomeIcon)
                  .child(
                    S.documentWithInitialValueTemplate("frontpage-template", { siteId: site._id })
                      .schemaType("frontpage")
                      .id(`frontpage-${site._id}`)
                  ),
                pageReferenceTree(S, context.documentStore, site._id),
                S.listItem().title("Pages (unstructured)").child(S.documentTypeList("page")),
                S.divider(),

                // Site Settings
                S.listItem()
                  .title("Settings")
                  .icon(CogIcon)
                  .child(
                    S.documentWithInitialValueTemplate("settings-template", { siteId: site._id })
                      .schemaType("settings")
                      .id(`settings-${site._id}`)
                  ),
              ])
          );
      }),
      S.divider(),
      S.listItem().title("Sites").child(S.documentTypeList("site")).icon(EarthGlobeIcon),
    ]);
};
