'use client';

import React, { useEffect, useState } from 'react';
import { getObjectives } from '@/features/objective/api/get-objectives';
import { Objective } from '../types/objective';
import { columns } from '../components/ObjectiveColumns';
import { DataTable } from '../components/ObjectiveDataTable';
import CreateForm from '../components/ObjectiveCreateForm';
import Loader from '@/components/common/loading';

const ObjectivePage = () => {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const PAGE_SIZE = 15;

  const fetchAllObjectives = async () => {
    try {
      setIsLoading(true);
      const allObjectives: Objective[] = [];
      let page = 1;
      let data: Objective[] = [];
      do {
        data = await getObjectives(page);
        allObjectives.push(...data);
        page += 1;
      } while (data.length === PAGE_SIZE);
      setObjectives(allObjectives);
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllObjectives();
  }, []);

  const reloadObjectives = async () => {
    await fetchAllObjectives();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Objetivos</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-right">
            <CreateForm onObjectiveCreated={reloadObjectives} />
          </div>
          <DataTable
            columns={columns}
            data={objectives}
            reloadObjectives={reloadObjectives}
          />
        </div>
      )}
    </div>
  );
};

export default ObjectivePage;
