import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-primary h-[170px] flex items-center justify-center">
      <Link href="/">
        <Image
          src="/applyDigitalLogo.svg"
          alt="Apply Digital Logo"
          width={170}
          height={44}
        />
      </Link>
    </footer>
  );
};
