'use client';

import React from 'react';
import { ColumnDef, CellContext } from '@tanstack/react-table';
import { Expense } from '../types/expense';
import EditForm from './ExpenseEditForm';
import DeleteDialog from './ExpenseDeleteDialog';
import { DataTableColumnHeader } from '@/components/common/data-table-column-header';

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
  reloadExpenses?: () => void;
}

export const columns: ColumnDef<Expense, unknown>[] = [
  {
    accessorKey: 'expense',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Despesa" />;
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Valor" />;
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          R$ {row.getValue('amount')}
        </div>
      );
    },
  },
  {
    accessorKey: 'readable_date',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Data" />;
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Categoria" />;
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Tipo" />;
    },
  },
  {
    accessorKey: 'card',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Cartão" />;
    },
  },
  {
    accessorKey: 'installments',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Parcelas" />;
    },
  },
  {
    id: 'actions',
    cell: ({ row, reloadExpenses }: CustomCellContext<Expense>) => {
      const expense = row.original as Expense;

      return (
        <div className="flex gap-2 justify-end items-center">
          <EditForm
            expense={expense}
            expenseId={expense.id}
            reloadExpenses={reloadExpenses}
          />
          <DeleteDialog
            expense={expense}
            expenseId={expense.id}
            reloadExpenses={reloadExpenses}
          />
        </div>
      );
    },
  },
];
