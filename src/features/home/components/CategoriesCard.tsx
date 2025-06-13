"use client";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HandCoins } from "lucide-react";

export default function BalanceCard() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            Categorias <HandCoins className="w-4 h-4" />
          </CardTitle>
          <CardDescription>Categorias mais gastas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Alimentação</span>
              <span className="text-sm">R$ 100,00</span>
            </div>
            <Progress value={60} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Carro</span>
              <span className="text-sm">R$ 100,00</span>
            </div>
            <Progress value={20} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Roupa</span>
              <span className="text-sm">R$ 100,00</span>
            </div>
            <Progress value={10} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Academia</span>
              <span className="text-sm">R$ 100,00</span>
            </div>
            <Progress value={5} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Assinatura</span>
              <span className="text-sm">R$ 100,00</span>
            </div>
            <Progress value={5} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
