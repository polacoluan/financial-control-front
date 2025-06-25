"use client";

import React, { useEffect, useState } from "react";
import { getObjectives } from "@/features/objective/api/get-objectives";
import { columns } from "./ObjectiveColumns";
import { DataTable } from "./ObjectiveDataTable";
import Loader from "@/components/common/loading";

export default function ObjectiveList() {
  const [objectives, setObjectives] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        setIsLoading(true);
        const data = await getObjectives();
        setObjectives(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
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
      console.error("Error reloading objectives:", error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <DataTable
          columns={columns}
          data={objectives}
          reloadObjectives={reloadObjectives}
        />
      )}
    </div>
  );
}
