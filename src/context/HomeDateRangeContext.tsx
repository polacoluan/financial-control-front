'use client';

import React, { createContext, useContext, useState } from 'react';
import { type DateRange } from 'react-day-picker';

interface HomeDateRangeContextValue {
  dateRange: DateRange | undefined;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
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
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    defaultRange,
  );

  return (
    <HomeDateRangeContext.Provider value={{ dateRange, setDateRange }}>
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
