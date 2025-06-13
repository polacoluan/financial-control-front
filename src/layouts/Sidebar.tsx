import {
  Home,
  HandCoins,
  ChartBarStacked,
  Type,
  CreditCard,
  Wallet,
  Crosshair,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "/",
    icon: Home,
  },
  {
    title: "Despesas",
    url: "expense",
    icon: HandCoins,
  },
  {
    title: "Entradas",
    url: "income",
    icon: Wallet,
  },
  {
    title: "Categorias",
    url: "category",
    icon: ChartBarStacked,
  },
  {
    title: "Tipos",
    url: "type",
    icon: Type,
  },
  {
    title: "Cartões",
    url: "card",
    icon: CreditCard,
  },
  {
    title: "Objetivos",
    url: "objectives",
    icon: Crosshair,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="text-lg font-bold">
        Controle Financeiro
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Aplicação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
