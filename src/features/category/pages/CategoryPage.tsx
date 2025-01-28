"use client";

import React, { useEffect, useState } from "react";
import { getCategories } from "@/features/category/api/get-categories";
import { columns } from "../components/Columns";
import { DataTable } from "../components/DataTable";
import CreateForm from "../components/CreateForm";
import Loader from "@/components/loading";

const CategoryPage = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const reloadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error reloading categories:", error);
    }
  };
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Categorias</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-right">
            <CreateForm onCategoryCreated={reloadCategories} />
          </div>
          <DataTable columns={columns} data={categories} reloadCategories={reloadCategories} />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;