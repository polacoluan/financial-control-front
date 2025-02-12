import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Expense } from "../types/expense";
import { formatCurrency } from "@/utils/mask-real";
import { useToast } from "@/hooks/use-toast";
import { deleteExpense } from "../api/delete-expense";
import { Trash } from "lucide-react";

export default function DeleteDialog({ expense, expenseId, reloadExpenses }: { expense: Expense; expenseId: string; reloadExpenses?: () => void; }) {
    const { toast } = useToast();

    function removeExpense() {
        deleteExpense(expenseId);

        reloadExpenses?.();

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Despesa removida com sucesso!",
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 rounded-full p-2"><p className="flex text-white font-medium"><Trash color="#ffffff" height={15}/> Excluir</p></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso irá deletar permanentemente essa despesa.<br /><br />
                        Despesa: {expense.expense}<br />
                        Valor: {formatCurrency(expense.amount)}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={removeExpense}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}