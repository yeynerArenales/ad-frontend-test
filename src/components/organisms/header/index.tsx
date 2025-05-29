import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header>
      <nav className="bg-surface px-4 lg:px-20 py-2.5 flex items-center justify-between">
        <Link href="/" className="font-bold text-xxl text-text-gray">
          GamerShop
        </Link>
        <Link href="/cart">
          <Image src="/icons/cart.svg" alt="cart" width={24} height={24} />
        </Link>
      </nav>
    </header>
  );
};
