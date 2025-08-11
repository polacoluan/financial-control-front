export interface ICreateObjective {
  objective: string;
  description?: string;
  target_value?: number;
  saved_amount?: number;
}

export type IEditObjective = ICreateObjective;

export interface Objective extends ICreateObjective {
  id: number;
}

export type ObjectiveResponse = Objective[];
