"use client";

import priceFormatter from "@/app/utils/price-formatter";
import CardWithHeader from "../ui/card-with-header";
import FileUpload from "../ui/file-upload";
import Button from "../ui/button";
import { FiCheckCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { projectGetSourceForAsset } from "next/dist/build/swc/generated-native";
import { transactionCheckout } from "@/app/services/transaction.service";

const PaymentSteps = () => {
    const {push} = useRouter();
    const {customerInfo, items, reset} = useCartStore();
    const [file, setFile] = useState<File | null>();    

    const uploadAndconfirm = () => {
      push("/order-status/12343")
    };

      const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

    const handleConfirmPayment = async () => {
    if (!file) {
      alert("Please upload your payment receipt!");
      return;
    }
  if (!customerInfo) {
      alert("Customer information is missing, please return to checkout");
      push("/checkout");
      return;
    }
  try{
    const formData = new FormData();
     formData.append("customerName", customerInfo.customerName);
      formData.append("customerContact", customerInfo.customerContact!.toString());
      formData.append("customerAddress", customerInfo.customerAddress);
      formData.append("image", file);
      
      formData.append("purchasedItems",
         JSON.stringify(items.map((item) => ({productId: item._id, qty: item.qty}))));
         formData.append(
        "purchaseItems",
        JSON.stringify(
          items.map((item) => ({
            productId: item._id,
            qty: item.qty,}))
        )
      );


      formData.append("totalPayment", totalPrice!.toString());
  
      const res = await transactionCheckout(formData);

      alert("Transaction created successfully!");
      reset();
      push(`/order-status/${res._id}`);
    }catch(error){
    console.log(error)
  }}

  return (
    <CardWithHeader title="Payment Steps">
      <div className="p-5">
        <ol className="list-decimal text-xs pl-2 flex flex-col gap-4 mb-5">
          <li>Transfer the total amount to your preferred bank account.</li>
          <li>After completing the transfer, keep the payment receipt.</li>
          <li>Upload the receipt below to validate your transaction.</li>
        </ol>
      <FileUpload onFileSelect={setFile}/>
      </div>


      <div className="border-t border-gray-200 p-4 space-y-4">
        <div className="flex justify-between font-semibold">
          <span className="text-sm">Total</span>
          <span className="text-primary text-sm">
            {priceFormatter(totalPrice)}
          </span>
        </div>

        <Button
          variant="dark"
          className="w-full flex items-center justify-center gap-2"
          onClick={handleConfirmPayment}
        >
          <FiCheckCircle />
          Upload Receipt & Confirm
        </Button>
      </div>
    </CardWithHeader>
  );
};

export default PaymentSteps;