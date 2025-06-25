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
} from '@/components/ui/alert-dialog';
import { Type } from '../types/type';
import { useToast } from '@/hooks/use-toast';
import { deleteType } from '../api/delete-type';
import { Trash } from 'lucide-react';
import DeleteButton from '@/components/common/delete-button';

export default function DeleteDialog({
  type,
  typeId,
  reloadTypes,
}: {
  type: Type;
  typeId: string;
  reloadTypes?: () => void;
}) {
  const { toast } = useToast();

  function removeType() {
    deleteType(typeId);

    reloadTypes?.();

    toast({
      variant: 'default',
      title: 'Sucesso!',
      description: 'Tipo removido com sucesso!',
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DeleteButton />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso irá deletar permanentemente
            esse tipo.
            <br />
            <br />
            Tipo: {type.type}
            <br />
            Descrição: {type.description}
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
