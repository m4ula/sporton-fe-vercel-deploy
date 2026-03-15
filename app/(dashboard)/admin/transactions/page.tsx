"use client";

import { useEffect, useState } from "react";
import TransactionsTable from "../../components/transactions/transaction-table";
import TransactionModal from "../../components/transactions/transaction-modal";
import { Transaction } from "@/app/types";
import { getAllTransactions, updateTransaction } from "@/app/services/transaction.service";
import { toast } from "react-toastify";

const TransactionsManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (
    id: string,
    status: "paid" | "rejected"
  ) => {
    try {
      const formData = new FormData();
      formData.append("status", status);

      await updateTransaction(id, formData);
      toast.success("Transaction status updated");

      await fetchTransactions();
    } catch (error) {
      console.error("Failed to update transaction status", error);
      toast.error("Failed to update transaction status");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
  <div>
    <div className="mb-10">
      <h1 className="text-2xl font-bold">Transactions Management</h1>
      <p className="opacity-50">
        Verify incoming payments and manage orders.
      </p>
    </div>

    <TransactionsTable
      transactions={transactions}
      onViewDetails={handleViewDetails}
    />

    <TransactionModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      transaction={selectedTransaction}
      onStatusChange={handleStatusChange}
    />
  </div>
);
};

export default TransactionsManagement;