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

  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        setIsLoading(true);
        const data = await getObjectives();
        setObjectives(data);
      } catch (error) {
        console.error('Erro ao carregar os dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchObjectives();
  }, []);

  const reloadObjectives = async () => {
    try {
      const data = await getObjectives();
      setObjectives(data);
    } catch (error) {
      console.error('Error reloading objectives:', error);
    }
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
