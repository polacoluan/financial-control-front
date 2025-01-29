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
import { Card } from "../types/card";
import { editCard } from "../api/edit-card";
import { useToast } from "@/hooks/use-toast";

export default function EditForm({ card, cardId, reloadCards }: { card: Card; cardId: string; reloadCards?: () => void; }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const { toast } = useToast();
    const form = useForm({
        defaultValues: {
            card: card.card,
            description: card.description,
        },
    });

    function onSubmit(data: FieldValues) {
        const cardData = data as Card;
        cardData.id = cardId;
        editCard(cardData);

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Cartão editado com sucesso!",
        });

        reloadCards?.();

        setIsSheetOpen(false);
    }

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className="bg-neutral-950 p-2 rounded-md text-white font-bold hover:bg-neutral-800">Editar</SheetTrigger>
            <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
                <SheetHeader>
                    <SheetTitle>Editar Cartão</SheetTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="card"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tipo</FormLabel>
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
                            <Button type="submit">Editar</Button>
                        </form>
                    </Form>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}