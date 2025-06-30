// src/app/expense/page.tsx
import ExpensePage from '@/features/expense/pages/ExpensePage';
import { CategoriesProvider } from '@/context/CategoriesContext';
import { TypesProvider } from '@/context/TypesContext';
import { CardsProvider } from '@/context/CardsContext';

export default function Page() {
  return (
    <CategoriesProvider>
      <TypesProvider>
        <CardsProvider>
          <ExpensePage />
        </CardsProvider>
      </TypesProvider>
    </CategoriesProvider>
  );
}
