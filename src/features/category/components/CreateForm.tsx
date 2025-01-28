"use client";

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldValues, useForm } from "react-hook-form";
import { createCategory } from "../api/create-category";
import { Category } from "../types/category";
import { toast } from "sonner";

export default function CreateForm({ onCategoryCreated }: { onCategoryCreated: () => void }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const form = useForm({
        defaultValues: {
            category: "",
            description: "",
        },
    });

    function onSubmit(data: FieldValues) {
        const categoryData = data as Category;
        createCategory(categoryData);

        form.reset();

        toast("Categoria criada com sucesso.")

        onCategoryCreated();

        setIsSheetOpen(false);
    }

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className="bg-neutral-950 p-2 rounded-md text-white font-bold hover:bg-neutral-800">Cadastrar</SheetTrigger>
            <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
                <SheetHeader>
                    <SheetTitle>Cadasto de Categoria</SheetTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Despesa</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Este é o nome da sua categoria.
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
                                            Este é a descrição da sua categoria.
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