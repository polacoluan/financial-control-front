'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldValues, useForm } from 'react-hook-form';
import { Income } from '../types/income';
import { editIncome } from '../api/edit-income';
import { useToast } from '@/hooks/use-toast';
import MoneyInput from '@/components/common/money-input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import EditButton from '@/components/common/edit-button';

const formSchema = z.object({
  income: z.string().min(2, {
    message: 'Entrada precisa ter ao menos 2 caracteres.',
  }),
  description: z.string().min(2, {
    message: 'Descrição precisa ter ao menos 2 caracteres.',
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      variant: 'default',
      title: 'Sucesso!',
      description: 'Entrada editada com sucesso!',
    });

    reloadIncomes?.();

    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <EditButton />
      </DialogTrigger>
      <DialogContent className="max-w-[1200px] max-h-screen overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>Editar Entrada</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <DialogFooter className="flex justify-end items-center">
              <DialogClose asChild>
                <Button variant={"outline"}>Cancelar</Button>
              </DialogClose>
              <Button type="submit">Editar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
