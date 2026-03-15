"use client";

import { useEffect, useState } from "react";
import Button from "@/app/(landing)/components/ui/button";
import { createBank, updateBank } from "@/app/services/bank.service";
import { toast } from "react-toastify";
import { Bank } from "@/app/types";
import Modal from "../components/ui/modal";

type BankInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  bank: Bank | null;
  onSuccess: () => void;
};

const BankInfoModal = ({
  isOpen,
  onClose,
  bank,
  onSuccess,
}: BankInfoModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Partial<Bank>>({
    accountName: "",
    accountNumber: "",
    bankName: "",
  });

  const isEditMode = !!bank;

  // ===== handle change =====
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // ===== submit =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      if (isEditMode && bank) {
        await updateBank(bank._id, formData);
      } else {
        await createBank(formData as Bank);
      }

      toast.success(
        isEditMode
          ? "Bank info updated successfully"
          : "Bank info created successfully"
      );

      setFormData({
        accountName: "",
        accountNumber: "",
        bankName: "",
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(
        isEditMode
          ? "Failed to update bank info"
          : "Failed to create bank info"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===== fill form when edit =====
  useEffect(() => {
    if (isEditMode && bank && isOpen) {
      setFormData({
        accountName: bank.accountName,
        accountNumber: bank.accountNumber,
        bankName: bank.bankName,
      });
    } else if (isOpen) {
      setFormData({
        accountName: "",
        accountNumber: "",
        bankName: "",
      });
    }
  }, [bank, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Bank Account" : "Add Bank Account"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-semibold">Bank Name</label>
          <input
            id="bankName"
            type="text"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="e.g. Mandiri, BCA, BRI"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-semibold">
            Account Number
          </label>
          <input
            id="accountNumber"
            type="text"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="1234567890"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-semibold">
            Account Holder
          </label>
          <input
            id="accountName"
            type="text"
            value={formData.accountName}
            onChange={handleChange}
            placeholder="Holder name"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 text-sm"
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button
            className="!bg-primary !text-white rounded-md"
            size="small"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : isEditMode
              ? "Update Bank Info"
              : "Create Bank Info"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BankInfoModal;