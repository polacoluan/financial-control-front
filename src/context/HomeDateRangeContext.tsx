'use client';

import React, { createContext, useContext, useState } from 'react';
import { type DateRange } from 'react-day-picker';

interface HomeDateRangeContextValue {
  expenseRange: DateRange | undefined;
  incomeRange: DateRange | undefined;
  setExpenseRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  setIncomeRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

const HomeDateRangeContext = createContext<HomeDateRangeContextValue | null>(
  null,
);

export const HomeDateRangeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const defaultRange: DateRange = { from: firstDay, to: today };
  const [expenseRange, setExpenseRange] = useState<DateRange | undefined>(defaultRange);
  const [incomeRange, setIncomeRange] = useState<DateRange | undefined>(defaultRange);

  return (
    <HomeDateRangeContext.Provider
      value={{ expenseRange, incomeRange, setExpenseRange, setIncomeRange }}
    >
      {children}
    </HomeDateRangeContext.Provider>
  );
};

export const useHomeDateRange = () => {
  const context = useContext(HomeDateRangeContext);
  if (!context) {
    throw new Error(
      'useHomeDateRange must be used within a HomeDateRangeProvider',
    );
  }
  return context;
};
