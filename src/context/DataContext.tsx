import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCategories } from '@/features/category/api/get-categories';
import { getTypes } from '@/features/type/api/get-types';
import { getCards } from '@/features/card/api/get-cards';
import { Category } from '@/features/category/types/category';
import { Type } from '@/features/type/types/type';
import { Card } from '@/features/card/types/card';
interface DataContextValue {
  categories: Category[];
  types: Type[];
  cards: Card[];
}

const DataContext = createContext<DataContextValue | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, typesData, cardsData] = await Promise.all([
          getCategories(),
          getTypes(),
          getCards(),
        ]);

        setCategories(categoriesData);
        setTypes(typesData);
        setCards(cardsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ categories, types, cards }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }

  return context;
};
