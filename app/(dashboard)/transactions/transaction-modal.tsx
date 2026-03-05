"use client";

import Image from "next/image";
import priceFormatter from "@/app/utils/price-formatter";
import Button from "@/app/(landing)/components/ui/button";
import { FiCheck, FiX } from "react-icons/fi";
import Modal from "../components/ui/modal";

type TTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const TransactionModal = ({ isOpen, onClose }: TTransactionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verify Transactions">
      <div className="flex gap-6">
        {/* Payment Proof */}
        <div>
          <h4 className="font-semibold text-xs mb-2">Payment Proof</h4>
          <Image
            src="/images/payment-proof-dummy.png"
            alt="payment proof"
            width={200}
            height={401}
          />
        </div>

        {/* Right side */}
        <div className="flex flex-col justify-between flex-1">
          <div>
            {/* Order Details */}
            <h4 className="font-semibold text-xs mb-2">Order Details</h4>
            <div className="bg-gray-100 rounded-md flex flex-col gap-2.5 p-4 text-xs mb-5">
              <div className="flex justify-between font-medium">
                <div className="opacity-50">Date</div>
                <div className="text-right">23/02/2026 19:32</div>
              </div>
              <div className="flex justify-between font-medium">
                <div className="opacity-50">Customer</div>
                <div className="text-right">John Doe</div>
              </div>
              <div className="flex justify-between font-medium">
                <div className="opacity-50">Contact</div>
                <div className="text-right">+628948956565</div>
              </div>
              <div className="flex justify-between font-medium">
                <div className="opacity-50 whitespace-nowrap">Shipping Address</div>
                <div className="text-right max-w-[200px] break-words">
                  Merdeka Street, Jakarta, Indonesia, 332122
                </div>
              </div>
            </div>

            {/* Items Purchased */}
            <h4 className="font-semibold text-xs mb-2">Items Purchased</h4>
            <div className="flex flex-col gap-2 mb-5">
              <div className="flex items-center gap-2 border border-gray-300 rounded p-2 bg-white">
                <div className="bg-gray-100 rounded aspect-square w-8 h-8 flex items-center justify-center">
                  <Image
                    src="/images/products/product-1.png"
                    width={30}
                    height={30}
                    alt="product image"
                  />
                </div>
                <div className="font-medium text-xs">SportsOn Hyperfast Shoes</div>
                <div className="font-medium ml-auto text-xs">3 units</div>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center font-semibold text-xs mb-5">
              <div>Total</div>
              <div className="text-primary">{priceFormatter(4500000)}</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-5 mt-6">
            <Button className="!text-primary !bg-primary-light rounded-md" size="small">
              <FiX size={20} /> Reject
            </Button>
            <Button className="!text-white !bg-[#50C252] rounded-md" size="small">
              <FiCheck size={20} /> Approve
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;