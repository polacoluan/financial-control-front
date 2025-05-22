"use client";

import { MonthSelect } from "@/components/month-select";
import { SpentMoney } from "../components/SpentMoney";
import { SpentPerCardChart } from "../components/SpentPerCardChart";
import { SpentPerCategoryChart } from "../components/SpentPerCategoryChart";
import { SpentPerDateChart } from "../components/SpentPerDateChart";
import { SpentPerTypeChart } from "../components/SpentPerTypeChart";
import { YearSelect } from "@/components/year-select";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { getExpensesPerMonth } from "../api/get-expenses-per-month";
import Loader from "@/components/loading";
import { useState, useEffect } from "react";

interface chartData {
  cards: any;
  types: any;
  categories: any;
  dates: any;
}

const DashboardPage = () => {
  const [chartData, setChartData] = useState<chartData>();
  const [isLoading, setIsLoading] = useState(true);
  const [totalSpent, setTotalSpent] = useState(0);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());

  const fetchChartData = async () => {
    try {
      setIsLoading(true);
      const data = await getExpensesPerMonth(year, month);
      setChartData(data);
      setTotalSpent(data.total_expenses);
    } catch (error) {
      console.error("Erro ao carregar os dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 m-2 w-fit">
        <MonthSelect month={month} setMonth={setMonth} />
        <YearSelect year={year} setYear={setYear} />
        <Button variant={"outline"} onClick={() => fetchChartData()}>
          <SearchIcon /> Buscar
        </Button>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-3 gap-4 m-2">
          <div>
            <SpentPerCategoryChart
              chartData={chartData?.categories}
              totalSpent={totalSpent}
            />
          </div>
          <div>
            <SpentPerTypeChart
              chartData={chartData?.types}
              totalSpent={totalSpent}
            />
          </div>
          <div>
            <SpentPerCardChart
              chartData={chartData?.cards}
              totalSpent={totalSpent}
            />
          </div>
          <div>
            <SpentPerDateChart
              chartData={chartData?.dates}
              totalSpent={totalSpent}
            />
          </div>
          <div className="grid gap-4">
            <SpentMoney chartData={chartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
