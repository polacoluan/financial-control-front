// src/app/layout.tsx
'use client';

import '@/styles/globals.css';
import { MainLayout } from '@/layouts/MainLayout';
import { usePathname } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import { DataProvider } from '@/context/DataContext';
import { ThemeProvider } from '@/components/common/theme-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const excludedRoutes = ['/auth/signin', '/auth/signup'];

  const isExcluded = excludedRoutes.includes(pathname);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
