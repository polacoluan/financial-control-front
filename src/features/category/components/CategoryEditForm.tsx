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
import { useForm } from "react-hook-form";
import { Category } from "../types/category";
import { editCategory } from "../api/edit-category";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";

const formSchema = z.object({
    category: z.string().min(2, {
        message: "Categoria precisa ter ao menos 2 caracteres.",
    }),
    description: z.string().min(2, {
        message: "Descrição precisa ter ao menos 2 caracteres.",
    }),
});

export default function EditForm({ category, categoryId, reloadCategories }: { category: Category; categoryId: string; reloadCategories?: () => void; }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category: category.category,
            description: category.description,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const categoryData = values as Category;
        categoryData.id = categoryId;
        editCategory(categoryData);

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Despesa editada com sucesso!",
        });

        reloadCategories?.();

        setIsSheetOpen(false);
    }

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className="bg-blue-600 rounded-full p-2 mr-2"><p className="flex text-white font-medium"><Pencil color="#ffffff" height={15} /> Editar</p></SheetTrigger>
            <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
                <SheetHeader>
                    <SheetTitle>Editar Categoria</SheetTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Categoria</FormLabel>
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
                            <Button type="submit" className="bg-blue-600 rounded-full p-2 mr-2"><p className="flex text-white font-medium"><Pencil color="#ffffff" height={15} /> Editar</p></Button>
                        </form>
                    </Form>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}