'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { MonthSummary } from '@/types/month-summary';
import { getMonthSummary } from '@/features/home/api/get-month-summary';
import { useHomeDateRange } from './HomeDateRangeContext';

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
  const { expenseRange, incomeRange } = useHomeDateRange();
  useEffect(() => {
    const fetchMonthSummary = async () => {
      try {
        if (
          !expenseRange?.from ||
          !expenseRange?.to ||
          !incomeRange?.from ||
          !incomeRange?.to
        ) {
          return;
        }
        const data = await getMonthSummary(
          expenseRange.from.toISOString().slice(0, 10),
          expenseRange.to.toISOString().slice(0, 10),
          incomeRange.from.toISOString().slice(0, 10),
          incomeRange.to.toISOString().slice(0, 10),
        );
        setMonthSummary(data);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchMonthSummary();
  }, [expenseRange, incomeRange]);

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
