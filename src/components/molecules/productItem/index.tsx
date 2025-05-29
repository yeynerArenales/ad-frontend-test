import Image from "next/image";
import { Button } from "@/components/molecules/button";
import { ProductItemProps } from "./types";

export const ProductItem = ({
  game,
  handleOnClick,
  isInCart,
  isLoading,
}: ProductItemProps) => {
  return (
    <article className="border-[0.5px] border-tertiary rounded-lg h-[430px] w-full p-4 flex flex-col xl:w-[380px]">
      <div className="relative flex-grow">
        {game.isNew && (
          <span
            className="absolute top-2 left-2 z-10 bg-quaternary text-secondary px-2 py-1 rounded text-base"
            aria-label="New game"
          >
            New
          </span>
        )}
        <Image
          src={game.image}
          alt={game.name}
          width={380}
          height={240}
          className="w-full h-[240px] rounded-t-lg object-cover"
          priority={false}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col flex-grow justify-between">
        <p className="text-text-light text-base font-bold uppercase mt-3">
          {game.genre}
        </p>
        <div className="flex justify-between items-center mt-3">
          <h3
            className="text-secondary text-lg font-bold truncate max-w-[240px]"
            title={game.name}
          >
            {game.name}
          </h3>
          <p className="text-secondary text-xl font-bold">${game.price}</p>
        </div>
        <Button
          variant={isInCart ? "secondary" : "primary"}
          className="mt-4"
          onClick={handleOnClick}
          isLoading={isLoading}
          disabled={isLoading}
          aria-label={isInCart ? "Remove from cart" : "Add to cart"}
        >
          {isInCart ? "Remove from Cart" : "Add to Cart"}
        </Button>
      </div>
    </article>
  );
};
