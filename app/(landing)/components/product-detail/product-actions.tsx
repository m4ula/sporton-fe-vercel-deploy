"use client";
import Button from "../ui/button";
import { FiArrowRight, FiChevronDown, FiChevronUp, FiShoppingBag } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ProductActions = () => {
  const {push} = useRouter();
  const [qty, setQty] = useState(1);


  const checkout = () => {
    
  }

  return (
    <div className="flex gap-5">
      <div className="border border-gray-300 inline-flex w-fit min-w-20.5">
        <div className="aspect-square text-xl font-medium border-r border-gray-300 flex justify-center items-center">
          <span>{qty}</span>
        </div>
        <div className="flex flex-col w-10">
          <button
            className="h-7 border-b border-gray-500 flex items-center justify-center"
            onClick={() => setQty(qty + 1)}
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
      <Button className="h-14 flex items-center gap-3">
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