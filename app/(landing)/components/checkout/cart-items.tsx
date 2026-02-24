"use client";

import Image from "next/image";
import { FiTrash2, FiCreditCard } from "react-icons/fi";
import { useCartStore } from "@/app/hooks/use-cart-store";
import Button from "../ui/button";
import priceFormatter from "@/app/utils/price-formatter";
import CardWithHeader from "../ui/card-with-header";
import { getImageUrl } from "@/app/lib/api";

type CartItemsProps = {
  handlePayment: () => void;
};

const CartItems = ({ handlePayment }: CartItemsProps) => {
  const { items, removeItem } = useCartStore();

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <CardWithHeader title="Cart Items">
      <div className="flex flex-col justify-between h-[calc(100%-70px)]">
        <div className="overflow-auto max-h-[300px] divide-y divide-gray-200">
          {items.length === 0 && (
            <div className="p-4 text-sm text-gray-500 text-center">
              Cart masih kosong
            </div>
          )}

          {items.map((item) => (
            <div key={item._id} className="p-4 flex gap-4 items-center">
              <div className="bg-primary-light aspect-square w-16 flex justify-center items-center rounded">
                <Image
                  src={getImageUrl(item.imageUrl)}
                  width={63}
                  height={63}
                  alt={item.name}
                  className="object-contain"
                />
              </div>

              <div>
                <div className="text-sm font-medium">{item.name}</div>
                <div className="flex gap-3 text-xs font-medium">
                  <span>{item.qty}x</span>
                  <span className="text-primary">
                    {priceFormatter(item.price)}
                  </span>
                </div>
              </div>

              <Button
                size="small"
                variant="ghost"
                className="ml-auto w-7 h-7 !p-0"
                onClick={() => removeItem(item._id)}
              >
                <FiTrash2 />
              </Button>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 p-4 space-y-4">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-primary">
              {priceFormatter(totalPrice)}
            </span>
          </div>

          <Button
            variant="dark"
            className="w-full flex items-center justify-center gap-2"
            onClick={handlePayment}
          >
            <FiCreditCard />
            Proceed to Payment
          </Button>
        </div>
      </div>
    </CardWithHeader>
  );
};

export default CartItems;