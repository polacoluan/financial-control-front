'use client';

import React from 'react';
import { columns } from '../components/ExpenseColumns';
import { DataTable } from '../components/ExpenseDataTable';
import Loader from '@/components/common/loading';
import { useQuery } from '@tanstack/react-query';
import { getExpenses } from '../api/get-expenses';

const ExpensePage = () => {
  const { isPending, data } = useQuery({
    queryKey: ['getExpenses'],
    queryFn: () => getExpenses(),
  });

  if (isPending) {
    return <Loader />;
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Despesas</h1>
      <div>
        <div className="text-right"></div>
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </div>
  );
};

export default ExpensePage;
