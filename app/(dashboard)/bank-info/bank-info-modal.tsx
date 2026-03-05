"use client";

import { useState } from "react";
import Button from "@/app/(landing)/components/ui/button";
import Modal from "../components/ui/modal";

type BankInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const BankInfoModal = ({ isOpen, onClose }: BankInfoModalProps) => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const handleSave = () => {
    console.log({ bankName, accountNumber, accountName });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Bank Account">
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-semibold">Bank Name</label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            placeholder="e.g. Mandiri, BCA, BRI"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-sm placeholder-gray-400"
          />
        </div>

        <div>
          <label className="text-xs font-semibold">Account Number</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="123124344234234"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-sm placeholder-gray-400"
          />
        </div>

        <div>
          <label className="text-xs font-semibold">Account Holder</label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Holder Name as registered on the account"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-sm placeholder-gray-400"
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button className="!bg-primary !text-white rounded-md" size="small" onClick={handleSave}>
            Add Bank Account
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default BankInfoModal;