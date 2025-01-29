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
import { createCard } from "../api/create-card";
import { Card } from "../types/card";
import { toast } from "sonner";

export default function CreateForm({ onCardCreated }: { onCardCreated: () => void }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const form = useForm({
        defaultValues: {
            card: "",
            description: "",
        },
    });

    function onSubmit(data: FieldValues) {
        const cardData = data as Card;
        createCard(cardData);

        form.reset();

        toast("Cartão criado com sucesso.")

        onCardCreated();

        setIsSheetOpen(false);
    }

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className="bg-neutral-950 p-2 rounded-md text-white font-bold hover:bg-neutral-800">Cadastrar</SheetTrigger>
            <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
                <SheetHeader>
                    <SheetTitle>Cadasto de Cartão</SheetTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="card"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cartão</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Este é o nome do seu cartão.
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
                                            Este é a descrição do seu cartão.
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