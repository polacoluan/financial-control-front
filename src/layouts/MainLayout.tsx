// src/layouts/MainLayout.tsx
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/layouts/Sidebar';
import { Header } from './Header';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={'w-full'}>
        <Header />
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
};
