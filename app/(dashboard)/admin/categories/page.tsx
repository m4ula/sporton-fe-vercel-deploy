"use client";

import { useEffect, useState } from "react";
import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import CategoryTable from "../../components/categories/category-table";
import CategoryModal from "../../components/categories/category-modal";
import { Category } from "@/app/types";
import { toast } from "react-toastify";
import DeleteModal from "../../components/ui/delete-modal";
import { deleteCategory, getAllCategories } from "@/app/services/category.service";

const CategoryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCateogry] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const [isDeletedModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDeleteId, setCategoryToDeleteId] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();
      setCategories(data)
    } catch(error) {
      console.error("Failed to fetch categories", error)
    }
  }

  const handleEdit = (category: Category) => {
    setSelectedCateogry(category);
    setIsModalOpen(true);
  }

  const handleDelete = (id: string) => {
    setCategoryToDeleteId(id);
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!categoryToDeleteId) return;
    try { await deleteCategory(categoryToDeleteId);
    fetchCategories();
    toast.success("Category deleted successfully");
    setIsDeleteModalOpen(false);
    setCategoryToDeleteId("");
  } catch (error) {
    console.error("Failed to delete category", error);
    toast.error("Failed to delete category");
  }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCateogry(null);
  };

  useEffect (() => {
    fetchCategories()
  }, []);

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
          onClick={() => setIsModalOpen(true)}
        >
          <FiPlus size={20} />
          Add Category
        </Button>
      </div>

      <CategoryTable categories={categories} onDelete={handleDelete} onEdit={handleEdit}/>

      <CategoryModal category={selectedCategory} onSuccess={fetchCategories}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <DeleteModal isOpen={isDeletedModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteConfirm}/>
    </div>
  );
};

export default CategoryManagement;