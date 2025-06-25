import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopCards from "./TopCards";
import ObjectiveList from "@/features/objective/components/ObjectiveList";

export default function HomePage() {
  return (
    <div>
      <Tabs defaultValue="home">
        <TabsList className="w-full">
          <TabsTrigger className="flex-1" value="home">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="targets">
            Metas
          </TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <TopCards />
        </TabsContent>
        <TabsContent value="targets">
          <ObjectiveList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
