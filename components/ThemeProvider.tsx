"use client";
import React, { useEffect, useMemo } from "react";
import { useClockStore } from "@/store/clockStore";
import { createTheme, CssBaseline, ThemeProvider as MUIThemeProvider } from "@mui/material";
import ThemeToggle from "@/components/ThemeToggle";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useClockStore((s) => s.theme);
  const setTheme = useClockStore((s) => s.setTheme);

  // On first load, initialize theme from system preference if not stored yet.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("world-clock-store");
      const stored = raw ? JSON.parse(raw) : null;
      const hasStoredTheme = Boolean(stored?.state?.theme);
      if (!hasStoredTheme) {
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
      }
    } catch {
      // Fallback to light if parsing fails
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.dataset.theme = theme;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [theme]);

  // Material UI theme synced with our store theme
  const muiTheme = useMemo(() => createTheme({
    palette: {
      mode: theme === "dark" ? "dark" : "light",
    },
  }), [theme]);

  return (
    <MUIThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
      <ThemeToggle />
    </MUIThemeProvider>
  );
};

export default ThemeProvider;
