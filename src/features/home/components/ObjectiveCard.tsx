import Loader from '@/components/common/loading';
import { getObjectives } from '@/features/objective/api/get-objectives';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import ObjectiveEditForm from '@/features/objective/components/ObjectiveEditForm';

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
    <div className="grid grid-cols-12 gap-4">
      {data?.map((objective) => (
        <Card key={objective.id} className="col-span-2">
          <CardHeader className="p-6 pb-4">
            <div className="grid grid-cols-[1fr_auto] items-start gap-2">
              <div>
                <CardTitle className="leading-tight">
                  {objective.objective}
                </CardTitle>
                <CardDescription className="mt-0.5">
                  {objective.description}
                </CardDescription>
              </div>
              <div className="justify-self-end self-start">
                <ObjectiveEditForm
                  objective={objective}
                  objectiveId={objective.id}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={objective.progress} />
            <p className="text-muted-foreground text-right w-full">
              R$ {objective.saved_amount}/R$ {objective.target_value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
