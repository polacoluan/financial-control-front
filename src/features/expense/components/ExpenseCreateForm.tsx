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
import { createExpense } from "../api/create-expense";
import { Expense } from "../types/expense";
import { toast } from "sonner";
import MoneyInput from "@/components/common/money-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus } from "lucide-react";
import CreateButton from "@/components/common/create-button";

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

export default function CreateForm({
  onExpenseCreated,
}: {
  onExpenseCreated: () => void;
}) {
  const [installmentsEnabled, setInstallmentsEnabled] = useState(false);
  const [defaultTypeId, setDefaultTypeId] = useState("");
  const [defaultCardId, setDefaultCardId] = useState("");
  const { categories } = useData();
  const { types } = useData();
  const { cards } = useData();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expense: "",
      description: "",
      amount: 0,
      date: "",
      category_id: "",
      type_id: "",
      card_id: "",
      installments: 1,
    },
  });

  useEffect(() => {
    const defaultType = types.find((type) => type.is_default);
    const defaultCard = cards.find((card) => card.is_default);

    if (defaultType) {
      setDefaultTypeId(defaultType.id);
      form.setValue("type_id", defaultType.id);
    }

    if (defaultCard) {
      setDefaultCardId(defaultCard.id);
      form.setValue("card_id", defaultCard.id);
    }
  }, [types, cards]);

  const handleTypeChange = (selectedTypeId: string) => {
    const selectedType = types.find((type) => type.id === selectedTypeId);
    setInstallmentsEnabled(selectedType?.installments === true);
    form.setValue("type_id", selectedTypeId);
  };

  function onSubmit(data: FieldValues) {
    const expenseData = data as Expense;
    createExpense(expenseData);

    form.reset();
    form.setValue("category_id", "");
    form.setValue("type_id", "");
    form.setValue("card_id", "");

    toast("Despesa criada com sucesso.");

    onExpenseCreated();

    setIsSheetOpen(false);
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <CreateButton />
      </SheetTrigger>
      <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
        <SheetHeader>
          <SheetTitle>Cadastro de Despesa</SheetTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="expense"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Despesa</FormLabel>
                    <FormControl>
                      <Input required {...field} />
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
                      <Input required {...field} />
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
                      <Input required type="date" {...field} />
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
                      required
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
                      required
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleTypeChange(value);
                      }}
                      defaultValue={defaultTypeId || field.value}
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
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={defaultCardId || field.value}
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
