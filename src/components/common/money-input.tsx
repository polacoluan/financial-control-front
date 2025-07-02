'use client';

import React, { useEffect, useReducer } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '../ui/form';
import { Input } from '../ui/input';
import {
  UseFormReturn,
  FieldValues,
  Path,
  FieldPathValue,
} from 'react-hook-form';
import { parseCurrency } from '@/utils/parse-real';

const moneyFormatter = Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
  style: 'currency',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

type MoneyInputProps<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder?: string;
  description?: string;
};

export default function MoneyInput<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder = '',
  description = '',
}: MoneyInputProps<TFieldValues>) {
  const rawValue = form.getValues()[name] as unknown;
  const initialValue =
    typeof rawValue === 'number'
      ? moneyFormatter.format(rawValue)
      : typeof rawValue === 'string'
        ? moneyFormatter.format(parseCurrency(rawValue))
        : '';

  useEffect(() => {
    if (typeof rawValue === 'string') {
      form.setValue(
        name,
        parseCurrency(rawValue) as FieldPathValue<TFieldValues, Path<TFieldValues>>,
      );
    }
  }, [rawValue, form, name]);

  const [value, setValue] = useReducer((_: string, next: string) => {
    const digits = next.replace(/\D/g, '');
    return moneyFormatter.format(Number(digits) / 100);
  }, initialValue);

  function handleChange(
    realChangeFn: (value: number) => void,
    formattedValue: string,
  ) {
    const digits = formattedValue.replace(/\D/g, '');
    const realValue = Number(digits) / 100;
    realChangeFn(realValue);
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const _change = field.onChange as (value: number) => void;

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                type="text"
                {...field}
                onChange={(ev) => {
                  setValue(ev.target.value);
                  handleChange(_change, ev.target.value);
                }}
                value={value}
              />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
