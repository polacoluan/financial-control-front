'use client';

import React, { useEffect, useState } from 'react';
import { getIncomes } from '@/features/income/api/get-incomes';
import { Income } from '../types/income';
import { columns } from '../components/IncomeColumns';
import { DataTable } from '../components/IncomeDataTable';
import CreateForm from '../components/IncomeCreateForm';
import Loader from '@/components/common/loading';

const IncomePage = () => {
  const [encomes, setIncomes] = useState<Income[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const PAGE_SIZE = 15;

  const fetchAllIncomes = async () => {
    try {
      setIsLoading(true);
      const allIncomes: Income[] = [];
      let page = 1;
      let data: Income[] = [];
      do {
        data = await getIncomes(page);
        allIncomes.push(...data);
        page += 1;
      } while (data.length === PAGE_SIZE);
      setIncomes(allIncomes);
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllIncomes();
  }, []);

  const reloadIncomes = async () => {
    await fetchAllIncomes();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Entradas</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-right">
            <CreateForm />
          </div>
          <DataTable
            columns={columns}
            data={encomes}
            reloadIncomes={reloadIncomes}
          />
        </div>
      )}
    </div>
  );
};

export default IncomePage;
