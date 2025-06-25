"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HandCoins, SearchIcon } from "lucide-react";
import { listExpensesPerType } from "../api/list-expenses-per-type";
import { listExpensesByType } from "../api/list-expenses-by-type";
import {
  ExpensesPerTypeItem,
  ExpensesByTypeItem,
} from "../types/home";
import Loader from "@/components/common/loading";
import { MonthSelect } from "@/components/common/month-select";
import { YearSelect } from "@/components/common/year-select";
import { TypeSelect } from "@/components/common/type-select";
import { Button } from "@/components/ui/button";

export default function ExpensePerType() {
  const [types, setTypes] = useState<ExpensesPerTypeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [selectedType, setSelectedType] = useState<ExpensesPerTypeItem | null>(null);
  const [typeExpenses, setTypeExpenses] = useState<ExpensesByTypeItem[]>([]);
  const [isTypeLoading, setIsTypeLoading] = useState(false);
  const [selectedTypeId, setSelectedTypeId] = useState<string>("");

  const fetchTypes = async () => {
    try {
      setIsLoading(true);
      const data = await listExpensesPerType(month, year);
      setTypes(data);
    } catch (error) {
      console.error("Erro ao carregar os dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTypeExpenses = async (type: any) => {
    try {
      setIsTypeLoading(true);
      setSelectedType(type);
      const data = await listExpensesByType(type.id, month, year);
      setTypeExpenses(data);
    } catch (error) {
      console.error("Erro ao carregar as despesas:", error);
    } finally {
      setIsTypeLoading(false);
    }
  };

  const handleTypeChange = (value: string) => {
    setSelectedTypeId(value);
    const type = types.find((t) => t.id === value);
    if (type) {
      fetchTypeExpenses(type);
    }
  };

  useEffect(() => {
    fetchTypes();
  }, []);
  return (
    <div>
      <div className="flex justify-end gap-2 mb-2">
        <TypeSelect typeId={selectedTypeId} setTypeId={handleTypeChange} />
        <MonthSelect month={month} setMonth={setMonth} />
        <YearSelect year={year} setYear={setYear} />
        <Button variant="outline" onClick={fetchTypes}>
          <SearchIcon className="w-4 h-4" /> Buscar
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            Tipos <HandCoins className="w-4 h-4" />
          </CardTitle>
          <CardDescription>Despesas por tipo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {types.map((type, index) => (
            <div
              className="space-y-2 cursor-pointer"
              key={index}
              onClick={() => fetchTypeExpenses(type)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {type.description}
                </span>
                <span className="text-sm">R$ {type.total_expenses}</span>
              </div>
              <Progress value={type.percentage} />
            </div>
          ))}

          {selectedType && (
            <div className="pt-4 space-y-2">
              <h4 className="font-medium">
                Total no mês: R$ {selectedType.total_expenses}
              </h4>
              {isTypeLoading ? (
                <Loader />
              ) : (
                <ul className="space-y-1">
                  {typeExpenses.map((expense, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between text-sm"
                    >
                      <span>{expense.expense}</span>
                      <span>R$ {expense.amount}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
