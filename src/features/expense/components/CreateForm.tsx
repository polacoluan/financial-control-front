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
import { getCategories } from "../api/get-categories";
import { getTypes } from "../api/get-types";
import { getCards } from "../api/get-cards";
import { createExpense } from "../api/create-expense";
import { Expense } from "../types/expense";
import { toast } from "sonner";

export default function CreateForm({ onExpenseCreated }: { onExpenseCreated: () => void }) {
    const [categories, setCategories] = useState<any[]>([]);
    const [types, setTypes] = useState<any[]>([]);
    const [cards, setCards] = useState<any[]>([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const form = useForm({
        defaultValues: {
            expense: "",
            description: "",
            amount: "",
            date: "",
            category_id: "",
            type_id: "",
            card_id: "",
        },
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchTypes = async () => {
            try {
                const data = await getTypes();
                setTypes(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchCards = async () => {
            try {
                const data = await getCards();
                setCards(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
        fetchTypes();
        fetchCards();
    }, []);


    function onSubmit(data: FieldValues) {
        const expenseData = data as Expense;
        createExpense(expenseData);

        form.reset();
        form.setValue("category_id", "");
        form.setValue("type_id", "");
        form.setValue("card_id", "");

        toast("Despesa criada com sucesso.")

        onExpenseCreated();

        setIsSheetOpen(false);
    }

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className="bg-sky-700 hover:bg-sky-900">Cadastrar</SheetTrigger>
            <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
                <SheetHeader>
                    <SheetTitle>Cadasto de Despesa</SheetTitle>
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
                                            <Input {...field} />
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                            <Button type="submit">Cadastrar</Button>
                        </form>
                    </Form>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}