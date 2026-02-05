"use client";

import OrderConfirmed from "../../components/order-status/order-confirmed";
import OrderSubmitted from "../../components/order-status/order-submitted";
import OrderRejected from "../../components/order-status/oder-rejected";
import { useState } from "react";

const OrderStatus =  () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  return (
        <main className="bg-gray-100 min-h-[80vh]">
      <div className="max-w-5xl mx-auto pt-40 pb-20">
        <h1 className="text-5xl font-bold text-center mb-11">
          Order Status
        </h1>
        </div>
        {isConfirmed ? <OrderConfirmed /> : <OrderSubmitted /> }
    </main>
  );
};

export default OrderStatus;