'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { HandCoins } from 'lucide-react';
import { listTopCategories } from '../api/list-top-categories';
import { useHomeDateRange } from '@/context/HomeDateRangeContext';
import { TopCategory } from '../types/home';

export default function BalanceCard() {
  const [categories, setCategories] = useState<TopCategory[]>([]);
  const { expenseRange } = useHomeDateRange();

  const fetchCategories = useCallback(async () => {
    if (!expenseRange?.from || !expenseRange?.to) return;
    const start = expenseRange.from.toISOString().slice(0, 10);
    const end = expenseRange.to.toISOString().slice(0, 10);
    const data = await listTopCategories(start, end);
    setCategories(data);
  }, [expenseRange]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  return (
    <div>
      <Card className="h-[400px]">
        <CardHeader>
          <CardTitle className="flex justify-between">
            Categorias <HandCoins className="w-4 h-4" />
          </CardTitle>
          <CardDescription>Categorias mais gastas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {categories.map((category, index) => (
            <div className="space-y-2" key={index}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {category.description}
                </span>
                <span className="text-sm">R$ {category.total_expenses}</span>
              </div>
              <Progress value={category.percentage} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
