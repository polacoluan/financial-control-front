"use client";

import React, { useEffect, useState } from "react";
import { getIncomes } from "@/features/income/api/get-incomes";
import { columns } from "../components/IncomeColumns";
import { DataTable } from "../components/IncomeDataTable";
import CreateForm from "../components/IncomeCreateForm";
import Loader from "@/components/common/loading";

const IncomePage = () => {
  const [encomes, setIncomes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getIncomes();
        setIncomes(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const reloadIncomes = async () => {
    try {
      const data = await getIncomes();
      setIncomes(data);
    } catch (error) {
      console.error("Error reloading encomes:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Entradas</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-right">
            <CreateForm onIncomeCreated={reloadIncomes} />
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
