"use client";

import React, { useEffect, useState } from "react";
import { getCards } from "@/features/card/api/get-cards";
import { columns } from "../components/Columns";
import { DataTable } from "../components/DataTable";
import CreateForm from "../components/CreateForm";
import Loader from "@/components/loading";

const CardPage = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getCards();
        setCards(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const reloadCards = async () => {
    try {
      const data = await getCards();
      setCards(data);
    } catch (error) {
      console.error("Error reloading cards:", error);
    }
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