"use client";

import React, { useEffect, useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldValues, useForm } from "react-hook-form";
import { useData } from "@/context/DataContext";
import { Expense } from "../types/expense";
import { editExpense } from "../api/edit-expense";
import { useToast } from "@/hooks/use-toast"
import { formatCurrency } from "@/utils/mask-real";

export default function EditForm({ expense, expenseId }: { expense: Expense; expenseId: string }) {
    const { categories } = useData();
    const { types } = useData();
    const { cards } = useData();
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const { toast } = useToast();
    const form = useForm({
        defaultValues: {
            expense: expense.expense,
            description: expense.description,
            amount: formatCurrency(expense.amount),
            date: expense.date,
            category_id: expense.category_id,
            type_id: expense.type_id,
            card_id: expense.card_id,
        },
    });

    const handleAmountChange = (
        e: React.ChangeEvent<HTMLInputElement>, // Event type
        field: any // Field object
      ) => {
        const input = e.target;
        const { value } = input;
      
        // Detect cursor position before formatting
        const selectionStart = input.selectionStart;
        const isBackspace = e.nativeEvent.inputType === "deleteContentBackward";
      
        // Strip non-numeric characters except commas
        let rawValue = value.replace(/[^\d,]/g, "");
      
        if (isBackspace && selectionStart !== null && value[selectionStart - 1] === ",") {
          // Handle backspace directly after a comma
          rawValue = rawValue.slice(0, -1); // Remove the last character
        }
      
        // Replace commas for numeric parsing, then format
        const numericValue = parseFloat(rawValue.replace(",", ".")) || 0;
        const formattedValue = formatCurrency(numericValue);
      
        // Update the field value
        field.onChange(formattedValue);
      
        // Reapply the cursor position
        window.requestAnimationFrame(() => {
          if (selectionStart !== null) {
            input.setSelectionRange(selectionStart, selectionStart);
          }
        });
      };

    function onSubmit(data: FieldValues) {
        const expenseData = data as Expense;
        expenseData.id = expenseId;
        editExpense(expenseData);

        form.reset();
        form.setValue("category_id", "");
        form.setValue("type_id", "");
        form.setValue("card_id", "");

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Despesa editada com sucesso!",
        });

        setIsSheetOpen(false);
    }

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className="bg-neutral-950 p-2 rounded-md text-white font-bold hover:bg-neutral-800">Editar</SheetTrigger>
            <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
                <SheetHeader>
                    <SheetTitle>Editar Despesa</SheetTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="expense"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Despesa</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Este é o nome da sua despesa.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Este é a descrição da sua despesa.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valor</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value} // Ensure controlled input
                                                onChange={(e) => handleAmountChange(e, field)} // Format user input
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Este é o valor da sua despesa.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <Input type='date' {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Esta é a data da sua despesa.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Categorias</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione a categoria da despesa" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Esta é a categoria da sua despesa
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipos</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o tipo da despesa" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {types.map((type) => (
                                                    <SelectItem key={type.id} value={type.id}>
                                                        {type.type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Este é o tipo da sua despesa
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="card_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cartão</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value || ""}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o cartão da despesa" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {cards.map((card) => (
                                                    <SelectItem key={card.id} value={card.id}>
                                                        {card.card}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            Este é o cartão da sua despesa
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Editar</Button>
                        </form>
                    </Form>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}