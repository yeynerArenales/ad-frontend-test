"use client";

import { IconButton } from "@/components/atoms/iconButton";
import { Game } from "@/types/game";
import Image from "next/image";

interface CartItemProps {
  game: Game;
}

export const CartItem = ({ game }: CartItemProps) => {
  return (
    <article className="grid grid-cols-[1fr_auto] gap-4 border-b border-tertiary p-4 md:grid-cols-[1fr_2fr_auto]">
      <Image
        className="h-[136px] w-full object-cover md:h-[156px]"
        src={game.image}
        alt={game.name}
        width={256}
        height={136}
      />
      <IconButton
        icon="/icons/close.svg"
        onClick={() => {}}
        className="md:hidden"
      />
      <section className="col-span-2 flex flex-col gap-3 md:col-span-1">
        <span className="text-base font-bold uppercase text-text-light">
          {game.genre}
        </span>
        <h2 className="text-xl font-bold text-secondary">{game.name}</h2>
        <p className="text-base text-text-light">{game.description}</p>
        <p className="text-end text-xl font-bold text-secondary">
          ${game.price}
        </p>
      </section>
      <IconButton
        icon="/icons/close.svg"
        onClick={() => {}}
        className="hidden md:block"
      />
    </article>
  );
};
