"use client";

import priceFormatter from "@/app/utils/price-formatter";
import CardWithHeader from "../ui/card-with-header";
import FileUpload from "../ui/file-upload";
import Button from "../ui/button";
import { FiCheckCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";

const PaymentSteps = () => {
    const {push} = useRouter();

    const uploadAndconfirm = () => {
      push("/order-status/12343")
    };

  return (
    <CardWithHeader title="Payment Steps">
      <div className="p-5">
        <ol className="list-decimal text-xs pl-2 flex flex-col gap-4 mb-5">
          <li>Transfer the total amount to your preferred bank account.</li>
          <li>After completing the transfer, keep the payment receipt.</li>
          <li>Upload the receipt below to validate your transaction.</li>
        </ol>
      <FileUpload />
      </div>


      <div className="border-t border-gray-200 p-4 space-y-4">
        <div className="flex justify-between font-semibold">
          <span className="text-sm">Total</span>
          <span className="text-primary text-sm">
          </span>
        </div>

        <Button
          variant="dark"
          className="w-full flex items-center justify-center gap-2"
          onClick={uploadAndconfirm}
        >
          <FiCheckCircle />
          Upload Receipt & Confirm
        </Button>
      </div>
    </CardWithHeader>
  );
};

export default PaymentSteps;