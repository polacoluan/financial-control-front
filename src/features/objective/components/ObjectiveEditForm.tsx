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
import { editObjective } from "../api/edit-objective";
import { Objective } from "../types/objective";
import { useToast } from "@/hooks/use-toast";
import { Pencil } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import EditButton from "@/components/edit-button";
import MoneyInput from "@/components/money-input";

const formSchema = z.object({
  objective: z.string().min(2, {
    message: "Objetivo precisa ter ao menos 2 caracteres.",
  }),
  description: z
    .string()
    .min(2, {
      message: "Descrição precisa ter ao menos 2 caracteres.",
    })
    .optional(),
  target_value: z.number().min(0).optional(),
  saved_amount: z.number().min(0).optional(),
});

export default function EditForm({
  objective,
  objectiveId,
  reloadObjectives,
}: {
  objective: Objective;
  objectiveId: string;
  reloadObjectives?: () => void;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      objective: objective.objective,
      description: objective.description,
      target_value: objective.target_value,
      saved_amount: objective.saved_amount,
    },
  });

  function onSubmit(data: FieldValues) {
    const objectiveData = data as Objective;
    objectiveData.id = objectiveId;
    editObjective(objectiveData);

    toast({
      variant: "default",
      title: "Sucesso!",
      description: "Objetivo editado com sucesso!",
    });

    reloadObjectives?.();

    setIsSheetOpen(false);
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <EditButton />
      </SheetTrigger>
      <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
        <SheetHeader>
          <SheetTitle>Editar Objetivo</SheetTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="objective"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objetivo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Este é o nome do seu objetivo.
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
                      Esta é a descrição do seu objetivo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="target_value"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MoneyInput
                        form={form}
                        name="target_value"
                        label="Valor Alvo"
                        placeholder=""
                        description="Este é o valor que você deseja alcançar."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="saved_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MoneyInput
                        form={form}
                        name="saved_amount"
                        label="Valor Economizado"
                        placeholder=""
                        description="Este é o valor que você já economizou."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-blue-600 rounded-full p-2 mr-2"
              >
                <p className="flex text-white font-medium">
                  <Pencil color="#ffffff" height={15} /> Editar
                </p>
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
