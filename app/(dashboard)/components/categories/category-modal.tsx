"use client";

import { useState, useEffect } from "react";
import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/file-upload-preview";


type TCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CategoryModal = ({ isOpen, onClose }: TCategoryModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
 <Modal isOpen={isOpen} onClose={onClose} title="Add New Category">
  <div className="grid grid-cols-[220px_1fr] gap-7 items-start">

    {/* LEFT */}
    <div className="h-[260px]">
      <ImageUploadPreview
        className="h-full"
        value={imagePreview}
        onChange={(file) => {
          setImageFile(file);
          setImagePreview(URL.createObjectURL(file));
        }}
      />
    </div>

    {/* RIGHT */}
    <div className="flex flex-col gap-4">
      <div className="input-group-admin">
        <label htmlFor="categoryName">Category Name</label>
        <input
          id="categoryName"
          type="text"
          placeholder="e.g. Running"
        />
      </div>

      <div className="input-group-admin">
        <label htmlFor="description">Description</label>
        <textarea
          rows={6}
          placeholder="Category details..."
        />
      </div>
    </div>

  </div>

  <div className="mt-6 flex justify-end">
    <Button className="rounded-lg">
      Create Category
    </Button>
  </div>
</Modal>
  );
};

export default CategoryModal;