import Loader from '@/components/common/loading';
import { getObjectives } from '@/features/objective/api/get-objectives';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ObjectiveCard() {
  const { isPending, data } = useQuery({
    queryKey: ['getObjectives'],
    queryFn: () => getObjectives(),
  });

  if (isPending) {
    return <Loader />;
  }

  if (!data || data.length === 0) {
    return <div className="text-center">Nenhuma meta encontrada.</div>;
  }

  return (
    <div className="m-4 grid grid-cols-12 gap-4">
      {data?.map((objective) => (
        <Card key={objective.id} className="col-span-4">
          <CardHeader>
            <CardTitle>{objective.objective}</CardTitle>
            <CardDescription>{objective.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Progresso: {objective.saved_amount}%</p>
          </CardContent>
          <CardFooter>
            <p>Valor objetivo: {objective.target_value}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
