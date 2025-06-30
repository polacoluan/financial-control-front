'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { HandCoins } from 'lucide-react';
import { listExpensesPerType } from '../api/list-expenses-per-type';
import { MonthSelect } from '@/components/common/month-select';
import { YearSelect } from '@/components/common/year-select';
import { TypeSelect } from '@/components/common/type-select';
import { Expense } from '@/features/expense/types/expense';

export default function ExpensePerType() {
  const [types, setTypes] = useState<Expense[]>([]);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [selectedTypeId, setSelectedTypeId] = useState<string>('');

  const fetchTypes = useCallback(async () => {
    const data = await listExpensesPerType(month, year, selectedTypeId);
    setTypes(data);
  }, [month, year, selectedTypeId]);

  const handleTypeChange = (value: string) => {
    setSelectedTypeId(value);
  };

  useEffect(() => {
    if (selectedTypeId) {
      fetchTypes();
    }
  }, [fetchTypes, selectedTypeId]);
  return (
    <div>
      <div className="flex justify-end gap-2 mb-2">
        <TypeSelect typeId={selectedTypeId} setTypeId={handleTypeChange} />
        <MonthSelect month={month} setMonth={setMonth} />
        <YearSelect year={year} setYear={setYear} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            Tipos <HandCoins className="w-4 h-4" />
          </CardTitle>
          <CardDescription>Despesas por tipo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {types.map((type, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm ">{type.description}</span>
              <span className="text-sm">R$ {type.amount}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
