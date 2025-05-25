"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const Breadcrumb = () => {
  const pathname = usePathname();

  // Skip breadcrumb for home page
  if (pathname === "/") return null;

  return (
    <div
      className="py-2 px-4 md:px-20"
      role="navigation"
      aria-label="Back to catalog"
    >
      <Link
        href="/"
        className="flex items-center gap-2 text-base text-medium text-secondary hover:text-primary"
      >
        <Image
          src="/icons/arrowLeft.svg"
          alt="Back to Catalog"
          width={24}
          height={24}
        />
        <span>Back to Catalog</span>
      </Link>
    </div>
  );
};
