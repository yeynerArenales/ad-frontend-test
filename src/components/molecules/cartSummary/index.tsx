import { Game } from "@/types/game";

interface CartSummaryProps {
  products: Game[];
}

export const CartSummary = ({ products }: CartSummaryProps) => {
  const total = products
    .reduce((acc, product) => acc + product.price, 0)
    .toFixed(2);

  return (
    <article className="py-8 px-4 rounded-lg border-[0.5px] border-tertiary w-full min-h-[342px] md:min-h-[366px] flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <h2 className="text-xxl font-bold text-secondary">Order Summary</h2>
        <p className="text-lg text-secondary">
          {products.length} {products.length === 1 ? "Item" : "Items"}
        </p>
      </div>

      <ul className="flex flex-col gap-4 mt-12 mb-8">
        {products.map((product) => (
          <li className="flex justify-between items-center" key={product.id}>
            <p className="text-lg text-secondary w-[80%]">{product.name}</p>
            <p className="text-lg text-secondary">$ {product.price}</p>
          </li>
        ))}
      </ul>

      <div className="flex justify-between border-t border-tertiary pt-6">
        <p className="text-xl text-secondary font-bold">Order Total</p>
        <p className="text-xl text-secondary font-bold">$ {total}</p>
      </div>
    </article>
  );
};
