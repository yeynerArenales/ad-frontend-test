import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="bg-surface px-20 py-2.5 flex items-center justify-between">
      <Link href="/" className="font-bold text-2xl text-text-gray">
        GamerShop
      </Link>
      <Link href="/cart">
        <Image src="/icons/cart.svg" alt="cart" width={24} height={24} />
      </Link>
    </header>
  );
};
