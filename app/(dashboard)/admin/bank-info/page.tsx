"use client";

import { useState } from "react";
import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import BankInfoList from "../../bank-info/bank-info-list";
import BankInfoModal from "../../bank-info/bank-info-modal";


const BankInfoManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => setIsOpen(false);

  return (
    <div>
      <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Bank Information</h1>
          <p className="opacity-50">
            Manage destination accounts for customer transfers.
          </p>
        </div>

        <Button
          className="flex items-center gap-2 rounded-lg"
          onClick={() => setIsOpen(true)}
        >
          <FiPlus size={20} />
          Add Bank Account
        </Button>
      </div>

      <BankInfoList />
      <BankInfoModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default BankInfoManagement;