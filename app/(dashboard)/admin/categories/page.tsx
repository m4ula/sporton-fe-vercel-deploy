"use client";

import { useState } from "react";
import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import CategoryTable from "../../components/categories/category-table";
import CategoryModal from "../../components/categories/category-modal";

const CategoryManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Category Management</h1>
          <p className="opacity-50">
            Organize your categories into groups.
          </p>
        </div>

        <Button
          className="flex items-center gap-2 rounded-lg"
          onClick={() => setIsOpen(true)}
        >
          <FiPlus size={20} />
          Add Category
        </Button>
      </div>

      <CategoryTable />

      <CategoryModal
        isOpen={isOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default CategoryManagement;