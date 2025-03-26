"use client";

import React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Income } from "../types/income";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditForm from "./IncomeEditForm";
import DeleteDialog from "./IncomeDeleteDialog";

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
    reloadIncomes?: () => void;
}

export const columns: ColumnDef<Income, unknown>[] = [
    {
        accessorKey: "income",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Entrada
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
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
            )
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Valor
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"));
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(amount);

            return <div className="text-center font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Data
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row, reloadIncomes }: CustomCellContext<Income>) => {
            const income = row.original as Income;

            return (
                <div>
                    <EditForm income={income} incomeId={income.id} reloadIncomes={reloadIncomes} />
                    <DeleteDialog income={income} incomeId={income.id} reloadIncomes={reloadIncomes} />
                </div>
            )
        }
    },
];