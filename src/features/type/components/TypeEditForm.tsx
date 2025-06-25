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
import { useForm } from 'react-hook-form';
import { Type } from '../types/type';
import { editType } from '../api/edit-type';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import EditButton from '@/components/common/edit-button';

const formSchema = z.object({
  type: z.string().min(2, {
    message: 'Tipo precisa ter ao menos 2 caracteres.',
  }),
  description: z.string().min(2, {
    message: 'Descrição precisa ter ao menos 2 caracteres.',
  }),
  installments: z.boolean(),
  is_default: z.boolean(),
});

export default function EditForm({
  type,
  typeId,
  reloadTypes,
}: {
  type: Type;
  typeId: string;
  reloadTypes?: () => void;
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: type.type,
      description: type.description,
      installments: type.installments,
      is_default: type.is_default,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const typeData = values as Type;
    typeData.id = typeId;
    editType(typeData);

    toast({
      variant: 'default',
      title: 'Sucesso!',
      description: 'Tipo editado com sucesso!',
    });

    reloadTypes?.();

    setIsSheetOpen(false);
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <EditButton />
      </SheetTrigger>
      <SheetContent className="w-[500px] max-h-screen overflow-y-auto p-4">
        <SheetHeader>
          <SheetTitle>Editar Tipo</SheetTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <FormControl>
                      <Input {...field} required />
                    </FormControl>
                    <FormDescription>
                      Este é o nome do seu tipo.
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
                      <Input {...field} required />
                    </FormControl>
                    <FormDescription>
                      Este é a descrição do seu tipo.
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
                    <FormLabel>
                      Possui Parcelas
                      <br />
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Isso define se a opção terá parcelas.
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
