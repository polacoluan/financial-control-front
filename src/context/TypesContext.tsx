'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getTypes } from '@/features/type/api/get-types';
import { Type } from '@/features/type/types/type';

interface TypesContextValue {
  types: Type[];
}

const TypesContext = createContext<TypesContextValue | null>(null);

export const TypesProvider = ({ children }: { children: React.ReactNode }) => {
  const [types, setTypes] = useState<Type[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await getTypes();
        setTypes(data);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTypes();
  }, []);

  return (
    <TypesContext.Provider value={{ types }}>{children}</TypesContext.Provider>
  );
};

export const useTypes = () => {
  const context = useContext(TypesContext);

  if (!context) {
    throw new Error('useTypes must be used within a TypesProvider');
  }

  return context;
};
