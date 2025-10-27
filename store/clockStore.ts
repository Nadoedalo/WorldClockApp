"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ClockItem = {
  countryCode: string; // ISO 3166-1 A2
  countryName: string;
  timezone: string; // IANA tz
  label?: string;
};

export type Theme = "light" | "dark";

type ClockState = {
  clocks: ClockItem[];
  theme: Theme;
  addClock: (input: { countryCode: string; countryName: string; timezone: string }) => void;
  removeClock: (clock: ClockItem) => void;
  updateClock: (clock: ClockItem, patch: Partial<Omit<ClockItem, "countryCode" | "countryName">>) => void;
  setTheme: (theme: Theme) => void;
};

export const useClockStore = create<ClockState>()(
  persist(
    (set) => ({
      clocks: [],
      theme: "light",
      addClock: ({ countryCode, countryName, timezone }) =>
        set((state) => ({
          clocks: [
            ...state.clocks,
            {
              countryCode,
              countryName,
              timezone,
            },
          ],
        })),
      removeClock: (clock) => {
        return set((state) => {
          return {
            clocks: state.clocks.filter(
              (clockItem) => clockItem.countryCode !== clock.countryCode && clockItem.timezone !== clock.timezone
            )
          }
        })
      },
      updateClock: (clock, patch) => {
        return set((state) => {
          return {
            clocks: state.clocks.map((clockItem) => {
              return clockItem.countryCode === clock.countryCode && clockItem.timezone === clock.timezone ?
                      { ...clockItem, ...patch }
                      : clockItem
            }),
          }
        })
      },
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "world-clock-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ clocks: state.clocks, theme: state.theme }),
    }
  )
);
