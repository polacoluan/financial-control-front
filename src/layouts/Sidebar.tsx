"use client";

import React from "react";
import Link from "next/link";

export const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col p-4">
            <h2 className="text-lg font-bold mb-6">Menu</h2>
            <nav className="space-y-2">
                <Link href="/dashboard" className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700">
                    Dashboard
                </Link>
                <Link href="/settings" className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700">
                    Settings
                </Link>
            </nav>
        </div>
    );
};
