"use client";

import React, { useEffect, useState } from "react";
import { getTypes } from "@/features/type/api/get-types";
import { columns } from "../components/TypeColumns";
import { DataTable } from "../components/TypeDataTable";
import CreateForm from "../components/TypeCreateForm";
import Loader from "@/components/loading";

const TypePage = () => {
  const [types, setTypes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getTypes();
        setTypes(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const reloadTypes = async () => {
    try {
      const data = await getTypes();
      setTypes(data);
    } catch (error) {
      console.error("Error reloading types:", error);
    }
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