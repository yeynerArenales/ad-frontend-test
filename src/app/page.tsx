import { Products } from "@/components/organisms/products";

export default async function Home({
  searchParams,
}: {
  searchParams: { genre: string };
}) {
  return (
    <div className="py-8">
      <h1 className="font-bold text-xxl text-primary uppercase md:normal-case md:text-xxxl">
        Top Sellers
      </h1>
      <Products initialGenre={searchParams.genre} />
    </div>
  );
}
