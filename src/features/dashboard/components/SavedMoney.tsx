'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/mask-real';
import { PiggyBank } from 'lucide-react';

export function SavedMoney({ chartData }: { chartData: any }) {
  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Guardado</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 0,00</div>
          <p className="text-xs text-muted-foreground">Valor guardado no mês</p>
        </CardContent>
      </Card>
    </div>
  );
}
