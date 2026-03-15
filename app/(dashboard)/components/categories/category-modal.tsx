"use client";

import { useState, useEffect } from "react";
import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/file-upload-preview";
import { Category } from "@/app/types";
import { getImageUrl } from "@/app/lib/api";
import { createCategory, updateCategory } from "@/app/services/category.service";
import { toast } from "react-toastify";

type TCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category?: Category | null;
};

type CategoryFormData = {
  name: string;
  description: string;
};

const CategoryModal = ({ isOpen, onClose, onSuccess, category }: TCategoryModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!category;

  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (isEditMode && isOpen && category) {
      setFormData({
        name: category.name,
        description: category.description,
      });
      setImagePreview(category.imageUrl ? getImageUrl(category.imageUrl) : null);
    } else if (isOpen) {
      setFormData({ name: "", description: "" });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [category, isOpen, isEditMode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      if (imageFile) data.append("image", imageFile);

      if (isEditMode && category) {
        await updateCategory(category._id, data);
        toast.success("Category updated successfully");
      } else {
        await createCategory(data);
        toast.success("Category created successfully");
      }

      setFormData({ name: "", description: "" });
      setImageFile(null);
      setImagePreview(null);

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(isEditMode ? "Failed to update category" : "Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Category" : "Add New Category"}>
      <form onSubmit={handleSubmit} className="grid grid-cols-[220px_1fr] gap-7 items-start">

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
            <label htmlFor="name">Category Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Running"
            />
          </div>

          <div className="input-group-admin">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              placeholder="Category details..."
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end col-span-2">
          <Button className="rounded-lg" type="submit" disabled={isSubmitting}>
            {isEditMode ? "Update Category" : "Create Category"}
          </Button>
        </div>

      </form>
    </Modal>
  );
};

export default CategoryModal;