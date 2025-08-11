// src/app/layout.tsx
'use client';

import '@/styles/globals.css';
import { MainLayout } from '@/layouts/MainLayout';
import { usePathname } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/common/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const excludedRoutes = ['/auth/signin', '/auth/signup'];

  const isExcluded = excludedRoutes.includes(pathname);

  const queryClient = new QueryClient();
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {isExcluded ? (
              children
            ) : (
              <>
                <MainLayout>{children}</MainLayout>
                <Toaster />
              </>
            )}
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
