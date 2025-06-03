"use client";

import React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Objective } from "../types/objective";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditForm from "./ObjectiveEditForm";
import DeleteDialog from "./ObjectiveDeleteDialog";

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
  reloadObjectives?: () => void;
}

export const columns: ColumnDef<Objective, unknown>[] = [
  {
    accessorKey: "objective",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Objetivo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "target_value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor Alvo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("target_value");
      return value ? `R$ ${Number(value).toFixed(2)}` : "-";
    },
  },
  {
    accessorKey: "saved_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor Economizado
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("saved_amount");
      return value ? `R$ ${Number(value).toFixed(2)}` : "R$ 0,00";
    },
  },
  {
    id: "actions",
    cell: ({ row, reloadObjectives }: CustomCellContext<Objective>) => {
      const objective = row.original as Objective;

      return (
        <div className="flex gap-2">
          <EditForm
            objective={objective}
            objectiveId={objective.id}
            reloadObjectives={reloadObjectives}
          />
          <DeleteDialog
            objective={objective}
            objectiveId={objective.id}
            reloadObjectives={reloadObjectives}
          />
        </div>
      );
    },
  },
];
