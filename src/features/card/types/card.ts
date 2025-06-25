export type Card = {
  id: string;
  card: string;
  description: string;
  is_default: boolean;
};

export type CardResponse = Card[];
