import { DocumentStore } from "sanity";
import { StructureBuilder, ListItemBuilder, ListItem, Divider } from "sanity/structure";
import { groq } from "next-sanity";
import { map } from "rxjs";
import { apiVersion } from "@/lib/sanity.env";

import { DocumentIcon, SchemaIcon } from "@sanity/icons";

type TPageReferenceTree = Array<{
  _id: string;
  _type: string;
  title: string;
  children?: Array<{
    _id: string;
    _type: string;
    title: string;
    children?: Array<{
      _id: string;
      _type: string;
      title: string;
    }>;
  }>;
}>;

export default function pageReferenceTree(S: StructureBuilder, documentStore: DocumentStore, siteId: string) {
  const query = groq`
  *[_type == "page" && site->_id == site->_id == $siteId  && !defined(parent)] | order(lower(title) asc) [] {
    _id,
    _type,
    title,
    'children': *[_type == "page" && site->_id == $siteId && parent._ref == ^._id] | order(lower(title) asc) [] {
      _id,
      _type,
      title,
      'children': *[_type == "page" && site->_id == $siteId && parent._ref == ^._id] | order(lower(title) asc) [] {
        _id,
        _type,
        title,
      }
    }
  }`;

  return S.listItem()
    .title("Pages (tree)")
    .icon(SchemaIcon)
    .child(() =>
      documentStore.listenQuery(query, { siteId }, { apiVersion, perspective: "previewDrafts" }).pipe(
        map((parents: TPageReferenceTree) =>
          S.list()
            .title("Pages")
            .menuItems([
              S.menuItem()
                .title("Add")
                .intent({
                  type: "create",
                  params: [
                    { type: "page", template: `page-template` },
                    { siteId, parentId: null },
                  ],
                }),
            ])
            .items(buildTree(parents, S, siteId))
        )
      )
    );
}

function buildTree(
  parents: TPageReferenceTree,
  S: StructureBuilder,
  siteId: string
): (ListItemBuilder | ListItem | Divider)[] {
  return parents.sort().map((parent) => {
    const { _id, title, children, _type } = parent;

    if (!children || children.length === 0) {
      return S.documentListItem().title(title).icon(DocumentIcon).schemaType(_type).id(_id);
    }

    return S.listItem()
      .title(title)
      .child(
        S.list()
          .title(title)
          .menuItems([
            S.menuItem()
              .title("Add")
              .intent({
                type: "create",
                params: [
                  { type: _type, template: `${_type}-template` },
                  { siteId, parentId: _id },
                ],
              }),
          ])
          .items([
            S.documentListItem().schemaType(_type).title(title).id(_id),
            S.divider(),
            ...buildTree(children, S, siteId),
          ])
      );
  });
}
