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
import { CreditCardIcon } from 'lucide-react';
import { listTopCards } from '../api/list-top-cards';
import { useHomeDateRange } from '@/context/HomeDateRangeContext';
import { TopCategory } from '../types/home';

export default function CardsCard() {
  const [cards, setCards] = useState<TopCategory[]>([]);
  const { dateRange } = useHomeDateRange();

  const fetchCards = useCallback(async () => {
    if (!dateRange?.from || !dateRange?.to) return;
    const start = dateRange.from.toISOString().slice(0, 10);
    const end = dateRange.to.toISOString().slice(0, 10);
    const data = await listTopCards(start, end);
    setCards(data);
  }, [dateRange]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);
  return (
    <div>
      <Card className="h-[400px]">
        <CardHeader>
          <CardTitle className="flex justify-between">
            Cartões <CreditCardIcon className="w-4 h-4" />
          </CardTitle>
          <CardDescription>Cartões mais usados</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {cards.map((card, index) => (
            <div className="space-y-2" key={index}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {card.description}
                </span>
                <span className="text-sm">R$ {card.total_expenses}</span>
              </div>
              <Progress value={card.percentage} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
