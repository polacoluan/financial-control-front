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
import { editObjective } from '../api/edit-objective';
import { Objective } from '../types/objective';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import EditButton from '@/components/common/edit-button';
import MoneyInput from '@/components/common/money-input';

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

export default function EditForm({
  objective,
  objectiveId,
  reloadObjectives,
}: {
  objective: Objective;
  objectiveId: string;
  reloadObjectives?: () => void;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      variant: 'default',
      title: 'Sucesso!',
      description: 'Objetivo editado com sucesso!',
    });

    reloadObjectives?.();

    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <EditButton />
      </DialogTrigger>
      <DialogContent className="max-w-[1200px] max-h-screen overflow-y-auto p-4">
        <DialogHeader>
          <DialogTitle>Editar Objetivo</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="objective"
              render={() => (
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
              render={() => (
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
            </div>
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
