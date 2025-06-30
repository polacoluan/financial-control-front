import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCategories } from '@/features/category/api/get-categories';
import { Category } from '@/features/category/types/category';

interface CategoriesContextValue {
  categories: Category[];
}

const CategoriesContext = createContext<CategoriesContextValue | null>(null);

export const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }

  return context;
};
