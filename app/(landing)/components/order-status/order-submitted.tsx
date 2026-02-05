"use client";

import Image from "next/image";
import { FiRefreshCw } from "react-icons/fi";
import Button from "../ui/button";

const OrderSubmitted = () => {
    const reloadOrderStatus = () => {
        window.location.reload()
    }
  return (
    <div className="bg-white w-160 p-16 flex flex-col justify-center items-center mx-auto">
      <Image
        src="/images/icon-order-submitted.svg"
        width={117}
        height={117}
        alt="order submitted"
        className="mb-4"
      />

      <h2 className="text-2xl font-semibold mb-2">Order Submitted!!</h2>

      <p className="text-sm text-gray-600 max-w-md text-center mb-8">
        Your order is recorded in our system. We are confirming the payment
        status. Please wait your order status will be updated in less than
        12 hours.
      </p>

      <Button variant="dark" className="w-full flex items-center justify-center gap-2" onClick={reloadOrderStatus}>
        <FiRefreshCw />
        Refresh Order Status
      </Button>
    </div>
  );
};

export default OrderSubmitted;