'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TopCards from './TopCards';
import ObjectiveList from '@/features/objective/components/ObjectiveList';
import ExpensePerType from './ExpensePerType';
import CalendarRange from '@/components/common/calendar-range';
import { useHomeDateRange } from '@/context/HomeDateRangeContext';

export default function HomePage() {
  const { expenseRange, incomeRange, setExpenseRange, setIncomeRange } =
    useHomeDateRange();

  return (
    <div>
      <div className="justify-between flex items-center mb-2">
        <div className="font-bold text-2xl">Página Inicial</div>
        <div className="grid grid-cols-2 gap-2">
          <div>Período de gastos</div>
          <CalendarRange range={expenseRange} onChange={setExpenseRange} />
          <div>Período de ganhos</div>
          <CalendarRange range={incomeRange} onChange={setIncomeRange} />
        </div>
      </div>
      <Tabs defaultValue="home">
        <TabsList className="w-full">
          <TabsTrigger className="flex-1" value="home">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="types">
            Despesa por tipos
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="targets">
            Metas
          </TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <TopCards />
        </TabsContent>
        <TabsContent value="types">
          <ExpensePerType />
        </TabsContent>
        <TabsContent value="targets">
          <ObjectiveList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
