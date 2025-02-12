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
import { Category } from "../types/category";
import { useToast } from "@/hooks/use-toast";
import { deleteCategory } from "../api/delete-category";
import { Trash } from "lucide-react";

export default function DeleteDialog({ category, categoryId, reloadCategories }: { category: Category; categoryId: string; reloadCategories?: () => void; }) {
    const { toast } = useToast();

    function removeCategory() {
        deleteCategory(categoryId);

        reloadCategories?.();

        toast({
            variant: "default",
            title: "Sucesso!",
            description: "Categoria removida com sucesso!",
        });
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="bg-red-500 rounded-full p-2"><p className="flex text-white font-medium"><Trash color="#ffffff" height={15}/> Excluir</p></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Essa ação não pode ser desfeita. Isso irá deletar permanentemente essa categoria.<br /><br />
                        Categoria: {category.category}<br />
                        Descrição: {category.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={removeCategory}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}