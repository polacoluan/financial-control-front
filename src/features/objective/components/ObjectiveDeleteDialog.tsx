"use client";

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
import { Objective } from "../types/objective";
import { deleteObjective } from "../api/delete-objective";
import { useToast } from "@/hooks/use-toast";
import DeleteButton from "@/components/delete-button";

export default function DeleteDialog({
  objective,
  objectiveId,
  reloadObjectives,
}: {
  objective: Objective;
  objectiveId: string;
  reloadObjectives?: () => void;
}) {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteObjective(objectiveId);
      toast({
        variant: "default",
        title: "Sucesso!",
        description: "Objetivo deletado com sucesso!",
      });
      reloadObjectives?.();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: "Erro ao deletar objetivo.",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DeleteButton />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente o
            objetivo {objective.objective}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
