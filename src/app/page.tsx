import HomePage from '@/features/home/components/HomePage';
import { TypesProvider } from '@/context/TypesContext';
import { MonthSummaryProvider } from '@/context/MonthSummaryContext';
import { HomeDateRangeProvider } from '@/context/HomeDateRangeContext';

export default function Page() {
  return (
    <HomeDateRangeProvider>
      <MonthSummaryProvider>
        <TypesProvider>
          <HomePage />
        </TypesProvider>
      </MonthSummaryProvider>
    </HomeDateRangeProvider>
  );
}
