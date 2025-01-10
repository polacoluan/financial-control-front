// src/app/layout.tsx
"use client";

import '@/styles/globals.css';
import { MainLayout } from '@/layouts/MainLayout';
import { usePathname } from 'next/navigation';

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
          <MainLayout>{children}</MainLayout>
        )}
      </body>
    </html>
  );
}
