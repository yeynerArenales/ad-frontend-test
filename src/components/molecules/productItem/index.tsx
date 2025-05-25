import { Button } from "@/components/atoms/button";
import Image from "next/image";

export const ProductItem = () => {
  return (
    <div className="border border-tertiary rounded-lg h-[430px] w-full md:w-[380px] p-4">
      <div className="relative">
        <span className="absolute top-2 left-2 z-10 bg-quaternary text-secondary px-2 py-1 rounded text-base">
          New
        </span>
        <Image
          src="/game-images/assassinscreedvalhalla.jpeg"
          alt="product-item"
          width={100}
          height={100}
          className="w-full h-[240px] rounded-t-lg"
        />
      </div>
      <p className="text-text-light text-base font-bold uppercase mt-3">
        Genre
      </p>
      <div className="flex justify-between items-center mt-3">
        <h3 className="text-secondary text-lg font-bold">Product Name</h3>
        <p className="text-secondary text-xl font-bold">$110</p>
      </div>
      <Button variant="primary" className="mt-4">
        Add to Cart
      </Button>
    </div>
  );
};
