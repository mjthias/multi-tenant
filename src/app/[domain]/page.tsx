import { loadSites } from "@/lib/loaders/load.sites";
import { loadFrontPage } from "@/lib/loaders/load.frontpage";

type HomeProps = {
  params: {
    domain: string;
  };
};

export async function generateStaticParams() {
  const sites = await loadSites();
  return sites?.map((site) => ({ domain: site.domain }));
}

export default async function Home({ params }: HomeProps) {
  const data = await loadFrontPage(params);

  return (
    <main>
      <h1>{data?.title || "no title"}</h1>
    </main>
  );
}
