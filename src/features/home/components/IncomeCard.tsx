import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BanknoteArrowDown } from 'lucide-react';

export default function IncomeCard() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            Gastos <BanknoteArrowDown className="w-4 h-4" />
          </CardTitle>
          <CardDescription>Gastos totais no mês</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">R$ 100,00</p>
        </CardContent>
      </Card>
    </div>
  );
}
