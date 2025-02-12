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
import { Card } from "../types/card";
import { useToast } from "@/hooks/use-toast";
import { deleteCard } from "../api/delete-card";
import { Trash } from "lucide-react";

export default function DeleteDialog({ card, cardId, reloadCards }: { card: Card; cardId: string; reloadCards?: () => void; }) {
    const { toast } = useToast();

    function removeType() {
        deleteCard(cardId);

        reloadCards?.();

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Cartão removido com sucesso!",
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 rounded-full p-2"><p className="flex text-white font-medium"><Trash color="#ffffff" height={15}/> Excluir</p></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso irá deletar permanentemente esse cartão.<br /><br />
                        Cartão: {card.card}<br />
                        Descrição: {card.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={removeType}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}