import React, { createContext, useContext, useEffect, useState } from 'react';
import { MonthSummary } from '@/types/month-summary';
import { getMonthSummary } from '@/features/home/api/get-month-summary';

interface MonthSummaryContextValue {
  monthSummary: MonthSummary | undefined;
}

const MonthSummaryContext = createContext<MonthSummaryContextValue | null>(
  null,
);

export const MonthSummaryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [monthSummary, setMonthSummary] = useState<MonthSummary>();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  useEffect(() => {
    const fetchMonthSummary = async () => {
      try {
        const data = await getMonthSummary(year, month);
        setMonthSummary(data);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchMonthSummary();
  }, [year, month]);

  return (
    <MonthSummaryContext.Provider value={{ monthSummary }}>
      {children}
    </MonthSummaryContext.Provider>
  );
};

export const useMonthSummary = () => {
  const context = useContext(MonthSummaryContext);

  if (!context) {
    throw new Error(
      'useMonthSummary must be used within a MonthSummaryProvider',
    );
  }

  return context;
};
