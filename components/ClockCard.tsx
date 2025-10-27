"use client";
import React, { useEffect, useState } from "react";
import { type ClockItem } from '@/store/clockStore';
import { formatTime, getUtcOffsetHours } from "@/utils/time";
import FlagIcon from "@/components/FlagIcon";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from "@mui/material";
import ClockPopup from "@/components/ClockPopup";

type Props = {
  clockItem: ClockItem;
};

export const ClockCard: React.FC<Props> = ({ clockItem }) => {
  const [now, setNow] = useState<Date>(new Date());
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  
  // If the clockItem was removed, render nothing
  if (!clockItem) return null;
  
  const timeText = formatTime(now, clockItem.timezone);
  const offsetText = getUtcOffsetHours(now, clockItem.timezone);

  return (
    <div className="flex items-center gap-4 rounded border border-zinc-200 dark:border-zinc-800 p-3 bg-white dark:bg-zinc-900">
      <div className="flex items-center gap-3 flex-grow-1">
        <FlagIcon code={clockItem.countryCode} alt={clockItem.countryName} />
        <div>
          {clockItem.label ? (
            <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-0.5">{clockItem.label}</div>
          ) : null}
          <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{clockItem.countryName}</div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{clockItem.timezone}, {offsetText}</div>
        </div>
      </div>

      <div className="font-mono text-2xl tabular-nums text-zinc-900 dark:text-zinc-100">{timeText}</div>

      <div className="flex items-center gap-2">
        <IconButton
          aria-label="Edit clock"
          onClick={() => setPopupOpen(true)}
          size="small"
          
       >
          <EditIcon fontSize="small" className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white" />
        </IconButton>
      </div>

      <ClockPopup open={popupOpen} onCloseAction={() => setPopupOpen(false)} clockItem={clockItem} />
    </div>
  );
};

export default ClockCard;
