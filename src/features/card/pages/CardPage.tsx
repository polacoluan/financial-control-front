'use client';

import React, { useEffect, useState } from 'react';
import { getCards } from '@/features/card/api/get-cards';
import { Card as CardType } from '../types/card';
import { columns } from '../components/CardColumns';
import { DataTable } from '../components/CardDataTable';
import CreateForm from '../components/CardCreateForm';
import Loader from '@/components/common/loading';

const CardPage = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const PAGE_SIZE = 15;

  const fetchAllCards = async () => {
    try {
      setIsLoading(true);
      const allCards: CardType[] = [];
      let page = 1;
      let data: CardType[] = [];
      do {
        data = await getCards(page);
        allCards.push(...data);
        page += 1;
      } while (data.length === PAGE_SIZE);
      setCards(allCards);
    } catch (error) {
      console.error('Erro ao carregar os dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCards();
  }, []);

  const reloadCards = async () => {
    await fetchAllCards();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestão de Cartões</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="text-right">
            <CreateForm onCardCreated={reloadCards} />
          </div>
          <DataTable columns={columns} data={cards} reloadCards={reloadCards} />
        </div>
      )}
    </div>
  );
};

export default CardPage;
