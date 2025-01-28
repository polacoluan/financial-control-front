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
import { Type } from "../types/type";
import { editType } from "../api/edit-type";
import { useToast } from "@/hooks/use-toast";

export default function EditForm({ type, typeId, reloadTypes }: { type: Type; typeId: string; reloadTypes?: () => void; }) {
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const { toast } = useToast();
    const form = useForm({
        defaultValues: {
            type: type.type,
            description: type.description,
        },
    });

    function onSubmit(data: FieldValues) {
        const typeData = data as Type;
        typeData.id = typeId;
        editType(typeData);

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Tipo editado com sucesso!",
        });

        reloadTypes?.();

        setIsSheetOpen(false);
    }

    return (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger className="bg-neutral-950 p-2 rounded-md text-white font-bold hover:bg-neutral-800">Editar</SheetTrigger>
            <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
                <SheetHeader>
                    <SheetTitle>Editar Tipo</SheetTitle>
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
                            <Button type="submit">Editar</Button>
                        </form>
                    </Form>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}