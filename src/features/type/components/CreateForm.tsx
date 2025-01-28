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
import { createType } from "../api/create-type";
import { Type } from "../types/type";
import { toast } from "sonner";

export default function CreateForm({ onTypeCreated }: { onTypeCreated: () => void }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const form = useForm({
        defaultValues: {
            type: "",
            description: "",
        },
    });

    function onSubmit(data: FieldValues) {
        const typeData = data as Type;
        createType(typeData);

        form.reset();

        toast("Tipo criado com sucesso.")

        onTypeCreated();

        setIsSheetOpen(false);
    }

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className="bg-neutral-950 p-2 rounded-md text-white font-bold hover:bg-neutral-800">Cadastrar</SheetTrigger>
            <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
                <SheetHeader>
                    <SheetTitle>Cadasto de Tipo</SheetTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Este é o nome do seu tipo.
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
                                            Este é a descrição do seu tipo.
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