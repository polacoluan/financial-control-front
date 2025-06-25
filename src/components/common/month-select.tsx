import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const months = [
  { month: 'Janeiro', value: '1' },
  { month: 'Fevereiro', value: '2' },
  { month: 'Março', value: '3' },
  { month: 'Abril', value: '4' },
  { month: 'Maio', value: '5' },
  { month: 'Junho', value: '6' },
  { month: 'Julho', value: '7' },
  { month: 'Agosto', value: '8' },
  { month: 'Setembro', value: '9' },
  { month: 'Outubro', value: '10' },
  { month: 'Novembro', value: '11' },
  { month: 'Dezembro', value: '12' },
];

export function MonthSelect({
  month,
  setMonth,
}: {
  month: number;
  setMonth: (value: number) => void;
}) {
  return (
    <Select
      onValueChange={(value) => setMonth(parseInt(value))}
      value={month.toString()}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione um mês" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Meses</SelectLabel>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value}>
              {month.month}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
