import { Button } from "@/components/atoms/button";
import { ProductItem } from "@/components/molecules/productItem";
import { getGames } from "@/services/games";

export const Products = async () => {
  const {games} = await getGames();
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {games.length > 0 && games.map((game) => <ProductItem key={game.id} game={game} />)}
    </div>
    <Button className="mt-4 md:w-[137px]" variant="secondary"> See more</Button>
    </>
  );
};