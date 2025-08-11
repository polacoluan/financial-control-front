'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TopCards from './TopCards';
import ObjectiveList from '@/features/objective/components/ObjectivePage';
import ExpensePerType from './ExpensePerType';
import { CalendarRange } from '@/components/common/calendar-range';
import { useHomeDateRange } from '@/context/HomeDateRangeContext';
import InstallmentsCard from './InstallmentsCard';

export default function HomePage() {
  const { dateRange, setDateRange } = useHomeDateRange();

  return (
    <div>
      <div className="justify-between flex items-center mb-2">
        <div className="font-bold text-2xl">Página Inicial</div>
        <div>
          <CalendarRange range={dateRange} onChange={setDateRange} />
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
          <TabsTrigger className="flex-1" value="installments">
            Compras Parceladas
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
        <TabsContent value="installments">
          <InstallmentsCard />
        </TabsContent>
        <TabsContent value="targets">
          <ObjectiveList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
