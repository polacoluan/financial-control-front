'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Objective } from '../types/objective';
import EditForm from './ObjectiveEditForm';
import DeleteDialog from './ObjectiveDeleteDialog';
import { DataTableColumnHeader } from '@/components/common/data-table-column-header';

export const columns: ColumnDef<Objective, unknown>[] = [
  {
    accessorKey: 'objective',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Objetivo" />;
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Descrição" />;
    },
  },
  {
    accessorKey: 'target_value',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Valor Alvo" />;
    },
    cell: ({ row }) => {
      return `R$ ${row.getValue('target_value')}`;
    },
  },
  {
    accessorKey: 'saved_amount',
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Valor Economizado" />
      );
    },
    cell: ({ row }) => {
      return `R$ ${row.getValue('saved_amount')}`;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 justify-end items-center">
          <EditForm objective={row.original} objectiveId={row.original.id} />
          <DeleteDialog
            objective={row.original}
            objectiveId={row.original.id}
          />
        </div>
      );
    },
  },
];
