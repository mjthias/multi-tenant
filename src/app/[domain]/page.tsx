import { loadSites } from "@/lib/loaders/load.sites";
import { loadFrontPage } from "@/lib/loaders/load.frontpage";
import { notFound } from "next/navigation";

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
  if (!data) return notFound();
  const { title } = data;

  return (
    <main>
      <h1>{title}</h1>
    </main>
  );
}
