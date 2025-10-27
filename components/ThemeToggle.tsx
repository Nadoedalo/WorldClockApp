"use client";
import React from "react";
import { useClockStore } from "@/store/clockStore";
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import Button from "@mui/material/Button";

export const ThemeToggle: React.FC = () => {
  const theme = useClockStore((s) => s.theme);
  const setTheme = useClockStore((s) => s.setTheme);

  return (
    <div className="p-2 absolute bottom-0 right-0">
      <Button
        variant="outlined"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="rounded border border-zinc-300 dark:border-zinc-700 px-3 py-1 text-sm"
        aria-label="Toggle theme"
      >
        {theme === "light" ? <ModeNightIcon/> : <LightModeIcon/>}
      </Button>
    </div>
  );
};

export default ThemeToggle;
