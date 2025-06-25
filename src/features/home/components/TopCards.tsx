import BalanceCard from './BalanceCard';
import CategoriesCard from './CategoriesCard';
import ExpenseCard from './ExpenseCard';
import IncomeCard from './IncomeCard';
import TransactionsCard from './TransactionsCard';

export default function TopCards() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <ExpenseCard />
        <IncomeCard />
        <BalanceCard />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <CategoriesCard />
        <TransactionsCard />
      </div>
    </div>
  );
}
