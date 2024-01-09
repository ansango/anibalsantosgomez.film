"use client";

import type { FC, PropsWithChildren } from "react";

import { ThemeProvider } from "next-themes";

export const Theme: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
};
