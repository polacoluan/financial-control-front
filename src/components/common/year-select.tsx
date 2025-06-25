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

const years = [
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
  '2028',
  '2029',
  '2030',
];

export function YearSelect({
  year,
  setYear,
}: {
  year: number;
  setYear: (value: number) => void;
}) {
  return (
    <Select
      onValueChange={(value) => setYear(parseInt(value))}
      value={year.toString()}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecione um ano" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Anos</SelectLabel>
          {years.map((year) => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
