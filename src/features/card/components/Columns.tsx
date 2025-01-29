"use client";

import React from "react";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import { Card } from "../types/card";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditForm from "./EditForm";
import DeleteDialog from "./DeleteDialog";

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
    reloadCards?: () => void;
}

export const columns: ColumnDef<Card, unknown>[] = [
    {
        accessorKey: "card",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Cartão
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
        cell: ({ row, reloadCards }: CustomCellContext<Card>) => {
            const card = row.original as Card;

            return (
                <div>
                    <EditForm card={card} cardId={card.id} reloadCards={reloadCards} />
                    <DeleteDialog card={card} cardId={card.id} reloadCards={reloadCards} />
                </div>
            )
        }
    },
];