"use client";

import { useEffect, useState } from "react";
import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { deleteBank, getAllBanks } from "@/app/services/bank.service";
import BankInfoList from "../../bank-info/bank-info-list";
import BankInfoModal from "../../bank-info/bank-info-modal";
import { Bank } from "@/app/types";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/delete-modal";


const BankInfoManagement = () => {
  const [isOpen, setIsModalOpen] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bankToDeleteId, setBankDeleteId] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBank(null);
  };

  const fetchBanks = async () => {
    try {
      const data = await getAllBanks();
      setBanks(data);
    } catch (error) {
      console.error("Failed to fetch bank data", error);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const handleEdit = (bank: Bank) => {
    setSelectedBank(bank);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setBankDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!bankToDeleteId) return;

    try {
      await deleteBank(bankToDeleteId);
      toast.success("Bank info deleted successfully");

      setBankDeleteId("");
      setIsDeleteModalOpen(false);

      fetchBanks();
    } catch (error) {
      console.error("Failed to delete bank info", error);
      toast.error("Failed to delete bank info");
    }
  };

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
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus size={20} />
          Add Bank Account
        </Button>
      </div>

      <BankInfoList
        banks={banks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <BankInfoModal
        isOpen={isOpen}
        onSuccess={fetchBanks}
        onClose={handleCloseModal}
        bank={selectedBank}
      />
      <DeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteConfirm} />
    </div>
  );
};

export default BankInfoManagement;