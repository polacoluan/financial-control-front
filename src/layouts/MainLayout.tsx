// src/layouts/MainLayout.tsx
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/layouts/Sidebar";
import { Header } from "./Header";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={"w-full"}>
        <Header />
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};
