'use client';

import React from 'react';
import { getObjectives } from '@/features/objective/api/get-objectives';
import { useQuery } from '@tanstack/react-query';
import { columns } from './ObjectiveColumns';
import { DataTable } from './ObjectiveDataTable';
import Loader from '@/components/common/loading';

export default function ObjectivePage() {
  const { isLoading, data } = useQuery({
    queryKey: ['getObjectives'],
    queryFn: () => getObjectives(),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Objetivos</h1>
      <div>
        <div className="text-right"></div>
        <DataTable columns={columns} data={data ?? []} />
      </div>
    </div>
  );
}
