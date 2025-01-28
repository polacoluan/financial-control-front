"use client";

import React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Type } from "../types/type";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditForm from "./EditForm";
import DeleteDialog from "./DeleteDialog";

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
    reloadTypes?: () => void;
}

export const columns: ColumnDef<Type, unknown>[] = [
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tipo
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
        id: "actions",
        cell: ({ row, reloadTypes }: CustomCellContext<Type>) => {
            const type = row.original as Type;

            return (
                <div>
                    <EditForm type={type} typeId={type.id} reloadTypes={reloadTypes} />
                    <DeleteDialog type={type} typeId={type.id} reloadTypes={reloadTypes} />
                </div>
            )
        }
    },
];