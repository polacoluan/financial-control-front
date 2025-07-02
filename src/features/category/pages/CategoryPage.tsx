'use client';

import React, { useEffect, useState } from 'react';
import { getCategories } from '@/features/category/api/get-categories';
import { Category } from '../types/category';
import { columns } from '../components/CategoryColumns';
import { DataTable } from '../components/CategoryDataTable';
import CreateForm from '../components/CategoryCreateForm';
import Loader from '@/components/common/loading';

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const PAGE_SIZE = 15;

  const fetchAllCategories = async () => {
    try {
      setIsLoading(true);
      const allCategories: Category[] = [];
      let page = 1;
      let data: Category[] = [];
      do {
        data = await getCategories(page);
        allCategories.push(...data);
        page += 1;
      } while (data.length === PAGE_SIZE);
      setCategories(allCategories);
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const reloadCategories = async () => {
    await fetchAllCategories();
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
          <DataTable
            columns={columns}
            data={categories}
            reloadCategories={reloadCategories}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
