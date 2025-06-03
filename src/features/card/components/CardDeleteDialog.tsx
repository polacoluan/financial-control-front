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
import DeleteButton from "@/components/common/delete-button";

export default function DeleteDialog({
  card,
  cardId,
  reloadCards,
}: {
  card: Card;
  cardId: string;
  reloadCards?: () => void;
}) {
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
      <AlertDialogTrigger>
        <DeleteButton />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso irá deletar permanentemente
            esse cartão.
            <br />
            <br />
            Cartão: {card.card}
            <br />
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
