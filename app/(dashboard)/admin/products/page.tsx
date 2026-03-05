"use client";

import { useState } from "react";
import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import ProductTable from "../../components/products/product-table";
import ProductModal from "../../components/products/product-modal";

const ProductManagement = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Product Management</h1>
          <p className="opacity-50">
            Manage your inventory, prices and stock.
          </p>
        </div>

        <Button
          className="flex items-center gap-2 rounded-lg"
          onClick={() => setIsOpen(true)}
        >
          <FiPlus size={20} />
          Add Product
        </Button>
      </div>

      <ProductTable />

      <ProductModal isOpen={isOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ProductManagement;