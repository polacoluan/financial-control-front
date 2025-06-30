import HomePage from '@/features/home/components/HomePage';
import { TypesProvider } from '@/context/TypesContext';
import { MonthSummaryProvider } from '@/context/MonthSummaryContext';

export default function Page() {
  return (
    <MonthSummaryProvider>
      <TypesProvider>
        <HomePage />
      </TypesProvider>
    </MonthSummaryProvider>
  );
}
