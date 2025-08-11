'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { HandCoins } from 'lucide-react';
import { listExpensesPerType } from '../api/list-expenses-per-type';
import { TypeSelect } from '@/components/common/type-select';
import { Expense } from '@/features/expense/types/expense';
import { useHomeDateRange } from '@/context/HomeDateRangeContext';

export default function ExpensePerType() {
  const [types, setTypes] = useState<Expense[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<string>('');
  const { dateRange } = useHomeDateRange();

  const fetchTypes = useCallback(async () => {
    if (!dateRange?.from || !dateRange?.to || !selectedTypeId) return;
    const start = dateRange.from.toISOString().slice(0, 10);
    const end = dateRange.to.toISOString().slice(0, 10);
    const data = await listExpensesPerType(start, end, selectedTypeId);
    setTypes(data);
  }, [dateRange, selectedTypeId]);

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
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            Tipos <HandCoins className="w-4 h-4" />
          </CardTitle>
          <CardDescription>Despesas por tipo</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Listagem das despesas por tipo.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Despesa</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead className="text-center">Data</TableHead>
                <TableHead className="text-center">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {types.map((type, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{type.expense}</TableCell>
                  <TableCell className="font-medium">{type.category}</TableCell>
                  <TableCell className="text-center">
                    {type.readable_date}
                  </TableCell>
                  <TableCell className="text-center">
                    R$ {type.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
