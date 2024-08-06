/**
 * This file is used to wrap all the providers that are used in the app.
 */

"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { PaletteProvider } from "@/context/palette-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PaletteProvider>{children}</PaletteProvider>
    </ThemeProvider>
  );
}
