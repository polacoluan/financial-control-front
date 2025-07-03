'use client';

import React, { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldValues, useForm } from 'react-hook-form';
import { useCategories } from '@/context/CategoriesContext';
import { useTypes } from '@/context/TypesContext';
import { useCards } from '@/context/CardsContext';
import { createExpense } from '../api/create-expense';
import { Expense } from '../types/expense';
import { toast } from 'sonner';
import MoneyInput from '@/components/common/money-input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  expense: z.string().min(2, {
    message: 'Tipo precisa ter ao menos 2 caracteres.',
  }),
  description: z.string(),
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
  const [defaultTypeId, setDefaultTypeId] = useState('');
  const [defaultCardId, setDefaultCardId] = useState('');
  const { categories } = useCategories();
  const { types } = useTypes();
  const { cards } = useCards();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expense: '',
      description: '',
      amount: 0,
      date: '',
      category_id: '',
      type_id: '',
      card_id: '',
      installments: 1,
    },
  });

  useEffect(() => {
    const defaultType = types.find((type) => type.is_default);
    const defaultCard = cards.find((card) => card.is_default);

    if (defaultType) {
      setDefaultTypeId(defaultType.id);
      form.setValue('type_id', defaultType.id);
      setInstallmentsEnabled(defaultType.installments === true);
    }

    if (defaultCard) {
      setDefaultCardId(defaultCard.id);
      form.setValue('card_id', defaultCard.id);
    }
  }, [types, cards, form]);

  const handleTypeChange = (selectedTypeId: string) => {
    const selectedType = types.find((type) => type.id === selectedTypeId);
    setInstallmentsEnabled(selectedType?.installments === true);
    form.setValue('type_id', selectedTypeId);
  };

  function onSubmit(data: FieldValues) {
    const expenseData = data as Expense;
    createExpense(expenseData);

    form.reset();
    form.setValue('category_id', '');
    form.setValue('type_id', '');
    form.setValue('card_id', '');

    toast('Despesa criada com sucesso.');

    onExpenseCreated();

    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>Cadastrar Despesa</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[1200px] max-h-screen overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>Cadastro de Despesa</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <DialogFooter className="flex justify-end items-center">
              <DialogClose asChild>
                <Button variant={'outline'}>Cancelar</Button>
              </DialogClose>
              <Button type="submit">Cadastrar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
