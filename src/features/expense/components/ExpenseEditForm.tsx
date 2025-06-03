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
import { Expense } from "../types/expense";
import { editExpense } from "../api/edit-expense";
import { useToast } from "@/hooks/use-toast";
import { Pencil } from "lucide-react";
import MoneyInput from "@/components/common/money-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import EditButton from "@/components/common/edit-button";

const formSchema = z.object({
  expense: z.string().min(2, {
    message: "Tipo precisa ter ao menos 2 caracteres.",
  }),
  description: z.string().min(2, {
    message: "Descrição precisa ter ao menos 2 caracteres.",
  }),
  amount: z.number(),
  date: z.string(),
  category_id: z.string(),
  type_id: z.string(),
  card_id: z.string(),
  installments: z.number(),
});

export default function EditForm({
  expense,
  expenseId,
  reloadExpenses,
}: {
  expense: Expense;
  expenseId: string;
  reloadExpenses?: () => void;
}) {
  const [installmentsEnabled, setInstallmentsEnabled] = useState(false);
  const { categories } = useData();
  const { types } = useData();
  const { cards } = useData();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expense: expense.expense,
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
      category_id: expense.category_id,
      type_id: expense.type_id,
      card_id: expense.card_id,
      installments: expense.installments,
    },
  });

  function onSubmit(data: FieldValues) {
    const expenseData = data as Expense;
    expenseData.id = expenseId;
    editExpense(expenseData);

    toast({
      variant: "default",
      title: "Sucesso!",
      description: "Despesa editada com sucesso!",
    });

    reloadExpenses?.();

    setIsSheetOpen(false);
  }

  const handleTypeChange = (selectedTypeId: string) => {
    const selectedType = types.find((type) => type.id === selectedTypeId);
    setInstallmentsEnabled(selectedType?.installments === true);
    form.setValue("type_id", selectedTypeId);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <EditButton />
      </SheetTrigger>
      <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
        <SheetHeader>
          <SheetTitle>Editar Despesa</SheetTitle>
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
              <MoneyInput
                form={form}
                label="Valor"
                name="amount"
                placeholder=""
                description="Este é o valor da sua despesa."
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                    >
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
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleTypeChange(value);
                      }}
                      defaultValue={field.value || ""}
                    >
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                    >
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
              <FormField
                control={form.control}
                name="installments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parcelas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        disabled={!installmentsEnabled}
                      />
                    </FormControl>
                    <FormDescription>
                      Este é quantidade de parcelas da sua despesa.
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
