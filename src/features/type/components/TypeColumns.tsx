'use client';

import React from 'react';
import { ColumnDef, CellContext } from '@tanstack/react-table';
import { Type } from '../types/type';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EditForm from './TypeEditForm';
import DeleteDialog from './TypeDeleteDialog';

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
  reloadTypes?: () => void;
}

export const columns: ColumnDef<Type, unknown>[] = [
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tipo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'installments',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Possui Parcelas
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: CustomCellContext<Type>) => {
      const type = row.original as Type;

      return <div>{type.installments ? 'Sim' : 'Não'}</div>;
    },
  },
  {
    accessorKey: 'is_default',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Opção Padrão
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: CustomCellContext<Type>) => {
      const type = row.original as Type;

      return <div>{type.is_default ? 'Sim' : 'Não'}</div>;
    },
  },
  {
    id: 'actions',
    header: () => {
      return <div>Ações</div>;
    },
    cell: ({ row, reloadTypes }: CustomCellContext<Type>) => {
      const type = row.original as Type;

      return (
        <div>
          <EditForm type={type} typeId={type.id} reloadTypes={reloadTypes} />
          <DeleteDialog
            type={type}
            typeId={type.id}
            reloadTypes={reloadTypes}
          />
        </div>
      );
    },
  },
];
