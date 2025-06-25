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
import { HandCoins } from "lucide-react";
import { listTopCategories } from "../api/list-top-categories";
import { TopCategory } from "../types/home";

export default function BalanceCard() {
  const [categories, setCategories] = useState<TopCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await listTopCategories();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);
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
          {categories.map((category, index) => (
            <div className="space-y-2" key={index}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {category.description}
                </span>
                <span className="text-sm">R$ {category.total_expenses}</span>
              </div>
              <Progress value={category.percentage} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
