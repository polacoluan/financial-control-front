"use client";

import React, { useEffect, useState } from "react";
import { getExpenses } from "@/features/expense/action/get-expenses";
import { columns } from "../components/Columns";
import { DataTable } from "@/components/ui/data-table";
import CreateForm from "../components/CreateForm";

const ExpensePage = () => {
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getExpenses();
      setExpenses(data);
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
      <div className="text-right">
        <CreateForm onExpenseCreated={reloadExpenses}/>
      </div>
      <DataTable columns={columns} data={expenses} />
    </div>
  );
};

export default ExpensePage;