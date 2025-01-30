"use client"

import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getExpensesPerMonth } from "../api/get-expenses-per-month";
import Loader from "@/components/loading";
import { formatCurrency } from "@/utils/mask-real";


export function SpentMoney() {
    const [data, setData] = useState<string>("R$ 0,00");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setIsLoading(true);
                const data = await getExpensesPerMonth();
                setData(data.total_amount);
            } catch (error) {
                console.error("Erro ao carregar os dados:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchChartData();
    }, []);

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Valor Gasto</CardTitle>
                        <CardDescription>Janeiro - 2025</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Total Ganho: R$ 0,00</p>
                        <p>Total Gasto: { formatCurrency(data) }</p>
                    </CardContent>
                    <CardFooter>
                        <p>Diferença: R$ 0,00</p> 
                    </CardFooter>
                </Card>
            )}
        </div>
    )
}