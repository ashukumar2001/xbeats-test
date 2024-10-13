"use client";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider } from "next-themes";
import React from "react";
import { TooltipProvider } from "./ui/tooltip";
import { Toaster } from "./ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type GlobalProviderProps = {
  theme?: ThemeProviderProps;
  children: React.ReactNode;
};

const queryClient = new QueryClient();
const GlobalProvider = ({ children, theme }: GlobalProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        {...theme}
      >
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default GlobalProvider;
