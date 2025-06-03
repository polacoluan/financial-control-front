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
import { createIncome } from "../api/create-income";
import { Income } from "../types/income";
import { toast } from "sonner";
import MoneyInput from "@/components/common/money-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import CreateButton from "@/components/common/create-button";

const formSchema = z.object({
  income: z.string().min(2, {
    message: "Tipo precisa ter ao menos 2 caracteres.",
  }),
  description: z.string().min(2, {
    message: "Descrição precisa ter ao menos 2 caracteres.",
  }),
  amount: z.number(),
  date: z.string(),
});

export default function CreateForm({
  onIncomeCreated,
}: {
  onIncomeCreated: () => void;
}) {
  const { cards } = useData();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: "",
      description: "",
      amount: 0,
      date: "",
    },
  });

  function onSubmit(data: FieldValues) {
    const incomeData = data as Income;
    createIncome(incomeData);

    form.reset();

    toast("Entrada criada com sucesso.");

    onIncomeCreated();

    setIsSheetOpen(false);
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <CreateButton />
      </SheetTrigger>
      <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
        <SheetHeader>
          <SheetTitle>Cadasto de Entrada</SheetTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entrada</FormLabel>
                    <FormControl>
                      <Input required {...field} />
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
                      <Input required {...field} />
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
                      <Input required type="date" {...field} />
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
                className="bg-green-600 rounded-full p-2 mr-2"
              >
                <p className="flex text-white font-medium">
                  <CirclePlus color="#ffffff" height={20} /> Cadastrar
                </p>
              </Button>
            </form>
          </Form>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
