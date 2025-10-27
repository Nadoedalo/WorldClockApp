import type { Meta, StoryObj } from "@storybook/react";
import React, { useEffect } from "react";
import ClockCard from "./ClockCard";
import { useClockStore, ClockItem } from "@/store/clockStore";

const meta: Meta<typeof ClockCard> = {
  title: "Components/ClockCard",
  component: ClockCard,
};
export default meta;

const base: ClockItem = {
  countryCode: "ES",
  countryName: "Spain",
  timezone: "Europe/Madrid",
  label: "Ihor",
};

export const Default: StoryObj<typeof ClockCard> = {
  render: () => {
    const StoryComp: React.FC = () => {
      const clockItem = useClockStore((s) => s.clocks[0]);
      // Seed store once if empty
      useEffect(() => {
        if (!clockItem) {
          useClockStore.setState({ clocks: [base] });
        }
      }, [clockItem]);
      return clockItem ? <ClockCard clockItem={clockItem} /> : null;
    };
    return <StoryComp />;
  },
};
