'use client';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Auth } from '../types/auth';
import { signin } from '../api/signin';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string({ required_error: 'Campo de e-mail obrigatório.' }).email(),
  password: z.string({ required_error: 'Campo de senha obrigatório.' }),
});

const SigninForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (values: Auth) => signin(values),
    onSuccess: () => {
      toast.success('Login realizado com sucesso!');
      router.replace('/');
    },
    onError: (error: Error) => {
      toast.error(error?.message ?? 'Erro ao logar');
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((vals) => mutation.mutate(vals))}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Realize o login na sua conta</CardTitle>
            <CardDescription>
              Insira o seu e-mail abaixo para acessar a sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este é o seu e-mail de login.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="exemplo@email.com"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormDescription>Esta é a sua senha.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Logar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default SigninForm;
