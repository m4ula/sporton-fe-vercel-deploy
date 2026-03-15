"use client";

import Image from "next/image";
import Modal from "../ui/modal";
import priceFormatter from "@/app/utils/price-formatter";
import Button from "@/app/(landing)/components/ui/button";
import { FiCheck, FiX } from "react-icons/fi";
import { Transaction } from "@/app/types";
import { useState } from "react";
import { getImageUrl } from "@/app/lib/api";

type TTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
  onStatusChange: (
    id: string,
    status: "paid" | "rejected"
  ) => Promise<void>;
};

const TransactionModal = ({
  isOpen,
  onClose,
  transaction,
  onStatusChange,
}: TTransactionModalProps) => {
  const [updatingStatus, setUpdatingStatus] =
    useState<"paid" | "rejected" | null>(null);

  // prevent crash when data not ready
  if (!transaction) return null;

  const handleStatusUpdate = async (status: "paid" | "rejected") => {
    setUpdatingStatus(status);

    try {
      await onStatusChange(transaction._id, status);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verify Transactions">
      <div className="flex gap-6">
        {/* Payment Proof */}
        <div>
          <h4 className="font-semibold text-xs mb-2">Payment Proof</h4>

          {transaction.paymentProof ? (
            <Image
              src={getImageUrl(transaction.paymentProof)}
              alt="payment proof"
              width={200}
              height={400}
            />
          ) : (
            <div className="text-center p-4">
              <p className="text-sm">No Payment Proof Uploaded</p>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex flex-col justify-between flex-1">
          <div>
            {/* Order Details */}
            <h4 className="font-semibold text-xs mb-2">
              Order Details
            </h4>

            <div className="bg-gray-100 rounded-md flex flex-col gap-2.5 p-4 text-xs mb-5">
              <div className="flex justify-between font-medium">
                <div className="opacity-50">Date</div>
                <div className="text-right">
                  {new Date(transaction.createdAt).toLocaleString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </div>
              </div>

              <div className="flex justify-between font-medium">
                <div className="opacity-50">Customer</div>
                <div className="text-right">
                  {transaction.customerName}
                </div>
              </div>

              <div className="flex justify-between font-medium">
                <div className="opacity-50">Contact</div>
                <div className="text-right">
                  {transaction.customerContact}
                </div>
              </div>

              <div className="flex justify-between font-medium">
                <div className="opacity-50 whitespace-nowrap">
                  Shipping Address
                </div>
                <div className="text-right max-w-[200px] break-words">
                  {transaction.customerAddress}
                </div>
              </div>
            </div>

            {/* Items Purchased */}
            <h4 className="font-semibold text-xs mb-2">
              Items Purchased
            </h4>

            <div className="space-y-3">
              {transaction.purchasedItems.map((item, index) => (
                <div key={index} className="flex flex-col gap-2 mb-5">
                  <div className="flex items-center gap-2 border border-gray-300 rounded p-2 bg-white">
                    <div className="bg-gray-100 rounded aspect-square w-8 h-8 flex items-center justify-center">
                      <Image
                        src={getImageUrl(item.productId.imageUrl)}
                        width={30}
                        height={30}
                        alt="product"
                      />
                    </div>

                    <div className="font-medium text-xs">
                      {item.productId.name}
                    </div>

                    <div className="font-medium ml-auto text-xs">
                      {item.qty} units
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center font-semibold text-xs mb-5">
              <div>Total</div>
              <div className="text-primary">
                {priceFormatter(Number(transaction.totalPayment))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-5 mt-6">
            <Button
              className="!text-primary !bg-primary-light rounded-md"
              size="small"
              disabled={updatingStatus !== null}
              onClick={() => handleStatusUpdate("rejected")}
            >
              <FiX size={20} />
              {updatingStatus === "rejected"
                ? "Updating..."
                : "Reject"}
            </Button>

            <Button
              className="!text-white !bg-[#50C252] rounded-md"
              size="small"
              disabled={updatingStatus !== null}
              onClick={() => handleStatusUpdate("paid")}
            >
              <FiCheck size={20} />
              {updatingStatus === "paid"
                ? "Updating..."
                : "Approve"}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;