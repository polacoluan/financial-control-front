// src/layouts/MainLayout.tsx
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/layouts/Sidebar"

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className={'w-full'}>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
};
