'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { HandCoins, SearchIcon } from 'lucide-react';
import { listTopCategories } from '../api/list-top-categories';
import { TopCategory } from '../types/home';
import { MonthSelect } from '@/components/common/month-select';
import { YearSelect } from '@/components/common/year-select';
import { Button } from '@/components/ui/button';

export default function BalanceCard() {
  const [categories, setCategories] = useState<TopCategory[]>([]);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [limit] = useState<number>(6);
  const fetchCategories = async () => {
    try {
      const data = await listTopCategories(limit, month, year);
      setCategories(data);
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  });
  return (
    <div>
      <div className="flex justify-end gap-2 mb-2">
        <MonthSelect month={month} setMonth={setMonth} />
        <YearSelect year={year} setYear={setYear} />
        <Button variant="outline" onClick={fetchCategories}>
          <SearchIcon className="w-4 h-4" /> Buscar
        </Button>
      </div>
      <Card>
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
