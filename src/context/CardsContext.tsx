import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCards } from '@/features/card/api/get-cards';
import { Card } from '@/features/card/types/card';

interface CardsContextValue {
  cards: Card[];
}

const CardsContext = createContext<CardsContextValue | null>(null);

export const CardsProvider = ({ children }: { children: React.ReactNode }) => {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCards();
        setCards(data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  return (
    <CardsContext.Provider value={{ cards }}>
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardsContext);

  if (!context) {
    throw new Error('useCards must be used within a CardsProvider');
  }

  return context;
};
