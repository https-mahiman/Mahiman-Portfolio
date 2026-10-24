"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  // next-themes' bootstrap script runs in the server HTML to prevent a theme
  // flash. Mark the client-rendered copy inert to avoid React 19's dev warning
  // about scripts rendered from client components.
  const scriptProps =
    typeof window === "undefined" ? undefined : { type: "application/json" };

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      scriptProps={scriptProps}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
