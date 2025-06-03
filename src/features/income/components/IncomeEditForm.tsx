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
import { useData } from "@/context/DataContext";
import { Income } from "../types/income";
import { editIncome } from "../api/edit-income";
import { useToast } from "@/hooks/use-toast";
import { Pencil } from "lucide-react";
import MoneyInput from "@/components/common/money-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import EditButton from "@/components/common/edit-button";

const formSchema = z.object({
  income: z.string().min(2, {
    message: "Entrada precisa ter ao menos 2 caracteres.",
  }),
  description: z.string().min(2, {
    message: "Descrição precisa ter ao menos 2 caracteres.",
  }),
  amount: z.number(),
  date: z.string(),
});

export default function EditForm({
  income,
  incomeId,
  reloadIncomes,
}: {
  income: Income;
  incomeId: string;
  reloadIncomes?: () => void;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: income.income,
      description: income.description,
      amount: income.amount,
      date: income.date,
    },
  });

  function onSubmit(data: FieldValues) {
    const incomeData = data as Income;
    incomeData.id = incomeId;
    editIncome(incomeData);

    toast({
      variant: "default",
      title: "Sucesso!",
      description: "Entrada editada com sucesso!",
    });

    reloadIncomes?.();

    setIsSheetOpen(false);
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <EditButton />
      </SheetTrigger>
      <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
        <SheetHeader>
          <SheetTitle>Editar Entrada</SheetTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entrada</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Este é o nome da sua entrada.
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
                      Este é a descrição da sua entrada.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <MoneyInput
                form={form}
                label="Valor"
                name="amount"
                placeholder=""
                description="Este é o valor da sua entrada."
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>
                      Esta é a data da sua entrada.
                    </FormDescription>
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
