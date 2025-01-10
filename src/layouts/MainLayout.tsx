// src/layouts/MainLayout.tsx
import React from 'react';
import { Sidebar } from './Sidebar'; // Sidebar component
import { Header } from './Header';   // Header component

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-4 overflow-y-auto bg-gray-100">{children}</main>
            </div>
        </div>
    );
};
