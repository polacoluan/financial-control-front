export type Type = {
    id: string;
    type: string;
    description: string;
    is_default: boolean;
    installments: boolean;
}
export type TypeResponse = Type[];
