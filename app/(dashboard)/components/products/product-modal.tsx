"use client";

import { useState, useEffect } from "react";
import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/file-upload-preview";

type TProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ProductModal = ({ isOpen, onClose }: TProductModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
      <div className="flex flex-col gap-6">
        {/* TOP */}
        <div className="grid grid-cols-[240px_1fr] gap-7 items-start">
          
          {/* IMAGE */}
          <div className="w-[240px]">
            <ImageUploadPreview
            className="aspect-square w-full rounded-lg overflow-hidden"
            value={imagePreview}
            onChange={(file) => {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
            }}
            />
            </div>

          {/* FORM */}
          <div className="flex flex-col gap-4">
            <div className="input-group-admin">
              <label htmlFor="productName">Product Name</label>
              <input
                id="productName"
                type="text"
                placeholder="e.g. Running Shoes"
              />
            </div>
            <div className="flex gap-4">

              <div className="input-group-admin">
                <label htmlFor="price">Price (IDR)</label>
                <input id="price" type="number" placeholder="0" />
              </div>

              <div className="input-group-admin">
                <label htmlFor="stock">Stock</label>
                <input id="stock" type="number" placeholder="0" />
              </div>
            </div>

            <div className="input-group-admin">
              <label htmlFor="category">Category</label>
              <select id="category" defaultValue="">
                <option value="" disabled>
                  Select Category
                </option>
                <option value="Running">Running</option>
                <option value="Football">Football</option>
              </select>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="input-group-admin">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={6}
            placeholder="Product Details..."
          />
        </div>

        {/* ACTION */}
        <Button className="ml-auto mt-2 rounded-lg">
          Create Product
        </Button>
      </div>
    </Modal>
  );
};

export default ProductModal;