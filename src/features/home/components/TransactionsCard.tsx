"use client";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, HandCoins, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import IncomeCreateModal from "@/features/income/components/IncomeCreateModal";

export default function TransactionsCard() {
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
          <div className="text-sm">
            <div className="flex items-center justify-between font-bold">
              <span>Alimentação</span>
              <div className="flex items-center gap-2 flex-nowrap text-red-600">
                <span>R$ 100,00</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 flex-nowrap">
              <span>09/06/2025</span>
            </div>
          </div>
          <div className="text-sm">
            <div className="flex items-center justify-between font-bold">
              <span>Alimentação</span>
              <div className="flex items-center gap-2 flex-nowrap text-green-600">
                <span>R$ 100,00</span>
                <ArrowDownLeft className="w-4 h-4" />
              </div>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 flex-nowrap">
              <span>09/06/2025</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <IncomeCreateModal />
          <Button className="w-32">
            <Plus />
            Despesa
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
