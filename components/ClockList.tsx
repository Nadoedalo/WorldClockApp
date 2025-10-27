"use client";
import React from "react";
import { useClockStore } from "@/store/clockStore";
import ClockCard from "@/components/ClockCard";

export const ClockList: React.FC = () => {
  const clocks = useClockStore((s) => s.clocks);

  if (clocks.length === 0) {
    return <div className="text-sm text-zinc-500">No clocks yet. Add one above.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {clocks.map((clockItem) => (
        <ClockCard key={`${clockItem.countryCode}-${clockItem.timezone}`} clockItem={clockItem} />
      ))}
    </div>
  );
};

export default ClockList;
