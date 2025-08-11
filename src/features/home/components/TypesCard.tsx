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
import { BookTypeIcon } from 'lucide-react';
import { listTopTypes } from '../api/list-top-types';
import { useHomeDateRange } from '@/context/HomeDateRangeContext';
import { TopCategory } from '../types/home';

export default function TypesCard() {
  const [types, setTypes] = useState<TopCategory[]>([]);
  const { dateRange } = useHomeDateRange();

  const fetchTypes = useCallback(async () => {
    if (!dateRange?.from || !dateRange?.to) return;
    const start = dateRange.from.toISOString().slice(0, 10);
    const end = dateRange.to.toISOString().slice(0, 10);
    const data = await listTopTypes(start, end);
    setTypes(data);
  }, [dateRange]);

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);
  return (
    <div>
      <Card className="h-[400px]">
        <CardHeader>
          <CardTitle className="flex justify-between">
            Tipos <BookTypeIcon className="w-4 h-4" />
          </CardTitle>
          <CardDescription>Tipos de pagamento mais usados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {types.map((type, index) => (
            <div className="space-y-2" key={index}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {type.description}
                </span>
                <span className="text-sm">R$ {type.total_expenses}</span>
              </div>
              <Progress value={type.percentage} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
