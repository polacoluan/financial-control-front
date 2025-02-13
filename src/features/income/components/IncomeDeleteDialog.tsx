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
import { Income } from "../types/income";
import { formatCurrency } from "@/utils/mask-real";
import { useToast } from "@/hooks/use-toast";
import { deleteIncome } from "../api/delete-income";
import { Trash } from "lucide-react";

export default function DeleteDialog({ income, incomeId, reloadIncomes }: { income: Income; incomeId: string; reloadIncomes?: () => void; }) {
    const { toast } = useToast();

    function removeIncome() {
        deleteIncome(incomeId);

        reloadIncomes?.();

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Entrada removida com sucesso!",
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 rounded-full p-2"><p className="flex text-white font-medium"><Trash color="#ffffff" height={15}/> Excluir</p></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso irá deletar permanentemente essa entrada.<br /><br />
                        Entrada: {income.income}<br />
                        Valor: {formatCurrency(income.amount)}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={removeIncome}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}