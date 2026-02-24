"use client";
import Button from "../ui/button";
import { FiArrowRight, FiChevronDown, FiChevronUp, FiShoppingBag } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/app/types";
import { useCartStore } from "@/app/hooks/use-cart-store";


type TProductActionsProps = {
  product: Product;
  stock: number;
};

const ProductActions = ({ product, stock }: TProductActionsProps) => {
  const { addItem } = useCartStore();
  const {push} = useRouter();
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    addItem(product, qty);
  };

  const handleCheckout = () => {
    push("/checkout");
  };
  

  return (
    <div className="flex gap-5 items-center">
      <div className="border border-gray-500 inline-flex w-fit in-w-[82px]">
        <div className="aspect-square text-xl font-medium border-r border-gray-300 flex justify-center items-center">
          <span>{qty}</span>
        </div>
        <div className="flex flex-col w-10">
          <button
            className="h-7 border-b border-gray-500 flex items-center justify-center"
            onClick={() => setQty(qty < stock ? qty + 1 : qty)}
          >
            <FiChevronUp />
          </button>
          <button
            className="h-7 flex items-center justify-center"
            onClick={() => setQty(qty > 1 ? qty - 1 : qty)}
          >
            <FiChevronDown />
          </button>
        </div>
      </div>
      <Button className="h-14 flex items-center gap-3 " onClick={handleAddToCart}>
        <FiShoppingBag />
        Add to Cart
      </Button>
      <Button  variant="dark" className="h-14" onClick={() => push("/checkout")}>
        Checkout Now <FiArrowRight />
      </Button>
    </div>
  );
};

export default ProductActions;