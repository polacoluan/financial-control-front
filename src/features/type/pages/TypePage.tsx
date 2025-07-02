'use client';

import React, { useEffect, useState } from 'react';
import { getTypes } from '@/features/type/api/get-types';
import { Type } from '../types/type';
import { columns } from '../components/TypeColumns';
import { DataTable } from '../components/TypeDataTable';
import CreateForm from '../components/TypeCreateForm';
import Loader from '@/components/common/loading';

const TypePage = () => {
  const [types, setTypes] = useState<Type[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const PAGE_SIZE = 15;

  const fetchAllTypes = async () => {
    try {
      setIsLoading(true);
      const allTypes: Type[] = [];
      let page = 1;
      let data: Type[] = [];
      do {
        data = await getTypes(page);
        allTypes.push(...data);
        page += 1;
      } while (data.length === PAGE_SIZE);
      setTypes(allTypes);
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTypes();
  }, []);

  const reloadTypes = async () => {
    await fetchAllTypes();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Tipos</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-right">
            <CreateForm onTypeCreated={reloadTypes} />
          </div>
          <DataTable columns={columns} data={types} reloadTypes={reloadTypes} />
        </div>
      )}
    </div>
  );
};

export default TypePage;
