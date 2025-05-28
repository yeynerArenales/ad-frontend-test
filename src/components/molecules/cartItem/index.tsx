import Image from "next/image";
import { IconButton } from "@/components/atoms/iconButton";
import { cn } from "@/utils/cn";
import { CartItemProps } from "./types";

export const CartItem = ({ game, handleRemove, className }: CartItemProps) => {
  return (
    <article
      className={cn(
        "grid grid-cols-[1fr_auto] items-start gap-4 border-b-[0.5px] border-tertiary p-4 md:grid-cols-[1fr_2fr_auto]",
        className
      )}
    >
      <Image
        className="h-[136px] w-full object-cover md:h-[156px]"
        src={game.image}
        alt={game.name}
        width={256}
        height={136}
      />
      <IconButton
        icon="/icons/close.svg"
        onClick={() => handleRemove(game)}
        className="md:hidden"
      />
      <section className="col-span-2 flex flex-col gap-2 md:col-span-1 md:max-h-[156px] overflow-hidden">
        <span className="text-base font-bold uppercase text-text-light">
          {game.genre}
        </span>
        <h2 className="text-xl font-bold text-secondary truncate">
          {game.name}
        </h2>
        <p className="text-base text-text-light md:line-clamp-2">
          {game.description}
        </p>
        <p className="text-end text-xl font-bold text-secondary">
          ${game.price}
        </p>
      </section>
      <IconButton
        icon="/icons/close.svg"
        onClick={() => handleRemove(game)}
        className="hidden md:block"
      />
    </article>
  );
};
