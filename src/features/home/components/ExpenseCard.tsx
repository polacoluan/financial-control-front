import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BanknoteArrowUpIcon } from 'lucide-react';

export default function ExpenseCard() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            Ganhos <BanknoteArrowUpIcon className="w-4 h-4" />
          </CardTitle>
          <CardDescription>Ganhos totais no mês</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">R$ 100,00</p>
        </CardContent>
      </Card>
    </div>
  );
}
