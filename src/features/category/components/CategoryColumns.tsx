"use client";

import React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Category } from "../types/category";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditForm from "./CategoryEditForm";
import DeleteDialog from "./CategoryDeleteDialog";

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
    reloadCategories?: () => void;
}

export const columns: ColumnDef<Category, unknown>[] = [
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Categoria
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
        header: () => {
            return (
                <div>
                    Ações
                </div>
            )
        },
        cell: ({ row, reloadCategories }: CustomCellContext<Category>) => {
            const category = row.original as Category;

            return (
                <div>
                    <EditForm category={category} categoryId={category.id} reloadCategories={reloadCategories} />
                    <DeleteDialog category={category} categoryId={category.id} reloadCategories={reloadCategories} />
                </div>
            )
        }
    },
];