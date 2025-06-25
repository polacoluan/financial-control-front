'use client';

import React from 'react';
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
import { createIncome } from '../api/create-income';
import { Income } from '../types/income';
import { toast } from 'sonner';
import MoneyInput from '@/components/common/money-input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogFooter, DialogHeader } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

const formSchema = z.object({
  income: z.string().min(2, {
    message: 'Tipo precisa ter ao menos 2 caracteres.',
  }),
  description: z.string().min(2, {
    message: 'Descrição precisa ter ao menos 2 caracteres.',
  }),
  amount: z.number(),
  date: z.string(),
});

export default function CreateForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: '',
      description: '',
      amount: 0,
      date: '',
    },
  });

  function onSubmit(data: FieldValues) {
    const incomeData = data as Income;
    createIncome(incomeData);

    form.reset();

    toast('Entrada criada com sucesso.');
  }

  return (
    <Dialog>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogTrigger asChild>
            <Button className="w-32">
              <Plus />
              Entrada
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Cadastrar uma entrada</DialogTitle>
              <DialogDescription>Cadastre uma nova entrada.</DialogDescription>
            </DialogHeader>

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
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={onSubmit}>
                Salvar
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
