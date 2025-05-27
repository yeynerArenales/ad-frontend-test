import { Cart } from "@/components/organisms/cart";

  export default async function CartPage() {

  return (  
    <div className="py-8">
      <h1 className="font-bold text-xxl text-secondary md:text-xxxl">
        Your Cart
      </h1>
      <Cart />
    </div>
  );
}
