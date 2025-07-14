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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { HandCoins } from 'lucide-react';
import { listExpensesWithInstallments } from '../api/list-expenses-with-installments';
import { useHomeDateRange } from '@/context/HomeDateRangeContext';
import { Expense } from '@/features/expense/types/expense';

export default function InstallmentsCard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const { expenseRange } = useHomeDateRange();
  const fetchExpenses = useCallback(async () => {
    if (!expenseRange?.from || !expenseRange?.to) return;
    const start = expenseRange.from.toISOString().slice(0, 10);
    const end = expenseRange.to.toISOString().slice(0, 10);
    const data = await listExpensesWithInstallments(start, end);
    setExpenses(data);
  }, [expenseRange]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            Compras Parceladas <HandCoins className="w-4 h-4" />
          </CardTitle>
          <CardDescription>
            Detalhamento das despesas com parcelas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Despesa</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-center">Data</TableHead>
                <TableHead className="text-center">Parcela Atual</TableHead>
                <TableHead className="text-center">Total de Parcelas</TableHead>
                <TableHead className="text-center">Valor da Parcela</TableHead>
                <TableHead className="text-center">Valor Pago</TableHead>
                <TableHead className="text-center">Valor Total</TableHead>
                <TableHead className="text-center">Restante</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {expense.expense}
                  </TableCell>
                  <TableCell className="font-medium">
                    {expense.category}
                  </TableCell>
                  <TableCell className="font-medium">{expense.type}</TableCell>
                  <TableCell className="text-center">{expense.date}</TableCell>
                  <TableCell className="text-center">
                    {expense.installments}
                  </TableCell>
                  <TableCell className="text-center">
                    {expense.installments_quantity}
                  </TableCell>
                  <TableCell className="text-center">
                    R$ {expense.amount}
                  </TableCell>
                  <TableCell className="text-center">
                    R$ {expense.paid}
                  </TableCell>
                  <TableCell className="text-center">
                    R$ {expense.total}
                  </TableCell>
                  <TableCell className="text-center">
                    R$ {expense.to_pay}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
