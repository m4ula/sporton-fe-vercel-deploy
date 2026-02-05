"use client";

import Image from "next/image";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";
import Button from "../ui/button";

const OrderRejected = () => {
  return (
    <div className="bg-white w-160 p-16 flex flex-col justify-center items-center mx-auto">
        <div className="w-20 h-20 bg-primary-light rounded-full mx auto p-3 flex justify-center items-center text-primary mb-5">
            <FiAlertCircle size={52}/>
        </div>
      <h2 className="text-2xl font-semibold mb-2">Order Rejected!!</h2>
      <p className="text-sm text-gray-600 max-w-md text-center mb-8">
I'm sorry your order is rejected because your payment proof is not valid
      </p>
    </div>
  );
};

export default OrderRejected;   