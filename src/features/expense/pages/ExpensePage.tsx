"use client";

import React, { useEffect, useState } from "react";
import { getExpenses } from "@/features/expense/api/get-expenses";
import { Expense } from "../types/expense";
import { columns } from "../components/ExpenseColumns";
import { DataTable } from "../components/ExpenseDataTable";
import CreateForm from "../components/ExpenseCreateForm";
import Loader from "@/components/common/loading";

const ExpensePage = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getExpenses();
        setExpenses(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const reloadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Error reloading expenses:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Despesas</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-right">
            <CreateForm onExpenseCreated={reloadExpenses} />
          </div>
          <DataTable
            columns={columns}
            data={expenses}
            reloadExpenses={reloadExpenses}
          />
        </div>
      )}
    </div>
  );
};

export default ExpensePage;
