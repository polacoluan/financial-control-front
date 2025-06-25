"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, HandCoins } from "lucide-react";
import { listRecentTransactions } from "../api/list-recent-transactions";
import { useEffect, useState } from "react";

export default function TransactionsCard() {
  const [recentTransactions, setRecentTransaction] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const data = await listRecentTransactions();
        setRecentTransaction(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            Transações <HandCoins className="w-4 h-4" />
          </CardTitle>
          <CardDescription>Transações mais recentes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {recentTransactions.map((recentTransaction, index) => (
            <div className="text-sm" key={index}>
              <div className="flex items-center justify-between font-bold">
                <span>{recentTransaction.name}</span>
                <div
                  className={`flex items-center gap-2 flex-nowrap  ${
                    recentTransaction.transaction_type == "income"
                      ? "text-green-600"
                      : "text-red-600"
                  } `}
                >
                  <span>R$ {recentTransaction.amount}</span>
                  {recentTransaction.transaction_type == "income" ? (
                    <ArrowDownLeft className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 flex-nowrap">
                <span>{recentTransaction.date}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
