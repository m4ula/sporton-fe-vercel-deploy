"use client";

import { useState } from "react";
import TransactionModal from "../../transactions/transaction-modal";
import TransactionTable from "../../transactions/transaction-table";


const TransactionsManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => setIsOpen(false);
  const handleViewDetails = () => setIsOpen(true);

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Transactions Management</h1>
        <p className="opacity-50">Verify incoming payments and manage orders.</p>
      </div>

      <TransactionTable onViewDetails={handleViewDetails} />

      {/* Render modal */}
      <TransactionModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default TransactionsManagement;