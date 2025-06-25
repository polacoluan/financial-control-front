import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopCards from "./TopCards";

export default function HomePage() {
  return (
    <div>
      <Tabs defaultValue="home">
        <TabsList>
          <TabsTrigger value="home">Visão Geral</TabsTrigger>
          <TabsTrigger value="password">types</TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <TopCards />
        </TabsContent>
        <TabsContent value="types">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
