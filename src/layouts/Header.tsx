// src/layouts/Header.tsx
"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/theme-toggle";

export const Header = () => {
  return (
    <header className="border-b px-4 py-2 flex items-center justify-between shadow-sm bg-secondary">
      <div className="text-lg font-bold">Controle Financeiro</div>

      <div className="flex justify-end items-center space-x-4">
        <Avatar>
          <AvatarImage
            src="https://via.placeholder.com/150"
            alt="User Profile"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <ModeToggle />
      </div>
    </header>
  );
};
