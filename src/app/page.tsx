import HomePage from '@/features/home/components/HomePage';
import { TypesProvider } from '@/context/TypesContext';

export default function Page() {
  return (
    <TypesProvider>
      <HomePage />
    </TypesProvider>
  );
}
