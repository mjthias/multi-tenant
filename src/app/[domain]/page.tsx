type HomeProps = {
  params: {
    domain: string;
  };
};

export default function Home({ params }: HomeProps) {
  return (
    <main>
      <h1>{params.domain}</h1>
    </main>
  );
}
