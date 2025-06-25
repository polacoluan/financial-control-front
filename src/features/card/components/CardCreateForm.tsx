'use client';

import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
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
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { createCard } from '../api/create-card';
import { Card } from '../types/card';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CirclePlus } from 'lucide-react';
import CreateButton from '@/components/common/create-button';

const formSchema = z.object({
  card: z.string().min(2, {
    message: 'Cartão precisa ter ao menos 2 caracteres.',
  }),
  description: z.string().min(2, {
    message: 'Descrição precisa ter ao menos 2 caracteres.',
  }),
  is_default: z.boolean(),
});

export default function CreateForm({
  onCardCreated,
}: {
  onCardCreated: () => void;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      card: '',
      description: '',
      is_default: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const cardData = values as Card;
    createCard(cardData);

    form.reset();

    toast('Cartão criado com sucesso.');

    onCardCreated();

    setIsSheetOpen(false);
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <CreateButton />
      </SheetTrigger>
      <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
        <SheetHeader>
          <SheetTitle>Cadastro de Cartão</SheetTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="card"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cartão</FormLabel>
                    <FormControl>
                      <Input required {...field} />
                    </FormControl>
                    <FormDescription>
                      Este é o nome do seu cartão.
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
                      Este é a descrição do seu cartão.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="is_default"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Opção Padrão
                      <br />
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Isso define se a opção virá pré selecionada.
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
