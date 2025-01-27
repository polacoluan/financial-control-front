// src/app/layout.tsx
"use client";

import '@/styles/globals.css';
import { MainLayout } from '@/layouts/MainLayout';
import { usePathname } from 'next/navigation';
import { Toaster } from "@/components/ui/toaster";
import { DataProvider } from "@/context/DataContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const excludedRoutes = ['/auth/signin', '/auth/signup'];

  const isExcluded = excludedRoutes.includes(pathname);

  return (
    <html lang="en">
      <body>
        {isExcluded ? (
          children
        ) : (
          <div>
            <DataProvider>
              <MainLayout>{children}</MainLayout>
            </DataProvider>
            <Toaster />
          </div>
        )}
      </body>
    </html>
  );
}
