"use client";

import { useState, useEffect } from "react";
import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/file-upload-preview";
import { Category, Product } from "@/app/types";
import { getAllCategories } from "@/app/services/category.service";
import { createProduct, updateProduct } from "@/app/services/product.service";
import { toast } from "react-toastify";
import { getImageUrl } from "@/app/lib/api";

type TProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  product: Product | null;
};

type ProductFormData = {
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  description: string;
};

const ProductModal = ({ isOpen, onClose, onSuccess, product }: TProductModalProps) => {
  const isEditMode = Boolean(product);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    stock: 0,
    categoryId: "",
    description: "",
  });

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // ================= EDIT / RESET STATE =================
  useEffect(() => {
    if (!isOpen) return;

    if (isEditMode && product) {
      setFormData({
        name: product.name,
        price: product.price,
        stock: product.stock,
        categoryId: product.category._id,
        description: product.description,
      });
      setImagePreview(product.imageUrl ? getImageUrl(product.imageUrl) : null);
    } else {
      setFormData({
        name: "",
        price: 0,
        stock: 0,
        categoryId: "",
        description: "",
      });
      setImageFile(null);
      setImagePreview(null);
    }
  }, [isOpen, isEditMode, product]);

  // ================= HANDLE CHANGE =================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "price" || id === "stock" ? Number(value) : value,
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value.toString()));
      if (imageFile) data.append("image", imageFile);

      if (isEditMode && product) {
        await updateProduct(product._id, data);
        toast.success("Product updated successfully!");
      } else {
        await createProduct(data);
        toast.success("Product created successfully!");
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(isEditMode ? "Failed to update product" : "Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? "Edit Product" : "Add New Product"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* TOP ROW: Image + Form */}
        <div className="flex gap-7">
          {/* IMAGE PREVIEW */}
          <div className="w-[240px] flex-shrink-0 flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700"></label>
            <ImageUploadPreview
              value={imagePreview}
              onChange={(file) => {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
              className="w-full h-[240px] rounded-lg overflow-hidden"
            />
          </div>

          {/* FORM INPUTS */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="input-group-admin">
              <label htmlFor="name">Product Name</label>
              <input
                id="name"
                type="text"
                placeholder="e.g. Running Shoes"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="input-group-admin w-full">
                <label htmlFor="price">Price (IDR)</label>
                <input
                  id="price"
                  type="number"
                  placeholder="0"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group-admin w-full">
                <label htmlFor="stock">Stock</label>
                <input
                  id="stock"
                  type="number"
                  placeholder="0"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group-admin">
              <label htmlFor="categoryId">Category</label>
              <select
                id="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option value={category._id} key={category._id}>
                    {category.name}
                  </option>
                ))}
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
            placeholder="Product details..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <Button type="submit" className="ml-auto rounded-lg" disabled={isSubmitting}>
          {isEditMode ? "Update Product" : "Create Product"}
        </Button>
      </form>
    </Modal>
  );
};

export default ProductModal;