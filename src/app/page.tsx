import HomePage from '@/features/home/components/HomePage';
import { TypesProvider } from '@/context/TypesContext';
import { MonthSummaryProvider } from '@/context/MonthSummaryContext';
import { HomeDateRangeProvider } from '@/context/HomeDateRangeContext';
import { CategoriesProvider } from '@/context/CategoriesContext';
import { CardsProvider } from '@/context/CardsContext';

export default function Page() {
  return (
    <HomeDateRangeProvider>
      <MonthSummaryProvider>
        <CategoriesProvider>
          <TypesProvider>
            <CardsProvider>
              <HomePage />
            </CardsProvider>
          </TypesProvider>
        </CategoriesProvider>
      </MonthSummaryProvider>
    </HomeDateRangeProvider>
  );
}
