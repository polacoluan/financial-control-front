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
import { useForm } from 'react-hook-form';
import { editObjective } from '../api/edit-objective';
import { IEditObjective } from '../types/objective';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import MoneyInput from '@/components/common/money-input';
import { useQueryClient, useMutation } from '@tanstack/react-query';

const formSchema = z.object({
  objective: z.string().min(2, {
    message: 'Objetivo precisa ter ao menos 2 caracteres.',
  }),
  description: z
    .string()
    .min(2, {
      message: 'Descrição precisa ter ao menos 2 caracteres.',
    })
    .optional(),
  target_value: z.number().min(0).optional(),
  saved_amount: z.number().min(0).optional(),
});

export default function ObjectiveEditForm({
  objective,
  objectiveId,
}: {
  objective: IEditObjective;
  objectiveId: number;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      objective: objective.objective,
      description: objective.description,
      target_value: objective.target_value,
      saved_amount: objective.saved_amount,
    },
  });

  const mutation = useMutation({
    mutationFn: (values: IEditObjective) => editObjective(objectiveId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getObjectives'] });
      form.reset();
      form.clearErrors();
      setIsDialogOpen(false);
      toast.success('Objetivo atualizado com sucesso!');
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Erro ao atualizar objetivo');
    },
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'}>Editar</Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>Editar Objetivo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((vals) => mutation.mutate(vals))}
            className="space-y-8"
          >
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
              render={() => (
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
              render={() => (
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
            <DialogFooter className="flex justify-end items-center">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Editar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
