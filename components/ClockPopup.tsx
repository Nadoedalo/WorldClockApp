"use client";
import React, { useMemo, useState } from "react";
import { Modal, Box, Typography, TextField, Button, IconButton, Autocomplete } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import * as ctz from "countries-and-timezones";
import FlagIcon from "@/components/FlagIcon";
import { ClockItem, useClockStore } from "@/store/clockStore";

export type ClockPopupProps = {
  open: boolean;
  onCloseAction: () => void;
  // If `country` is provided, the popup operates in "add" mode
  country?: { code: string; name: string; timezones: string[] } | null;
  // If `clockItem` is provided, the popup operates in "edit" mode
  clockItem?: ClockItem | null;
};

const modalStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(92vw, 560px)",
  background: "var(--color-background)",
  borderRadius: 8,
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

export const ClockPopup: React.FC<ClockPopupProps> = ({ open, onCloseAction, country, clockItem }) => {
  const addClock = useClockStore((s) => s.addClock);
  const updateClock = useClockStore((s) => s.updateClock);
  const removeClock = useClockStore((s) => s.removeClock);

  const mode: "add" | "edit" = country ? "add" : "edit";

  const countryInfo = useMemo(() => {
    if (mode === "add" && country) return country;
    if (mode === "edit" && clockItem) {
      const all = ctz.getAllCountries() as Record<string, { timezones?: string[]; name?: string }>;
      const c = all[clockItem.countryCode] || { timezones: [clockItem.timezone], name: clockItem.countryName };
      return { code: clockItem.countryCode, name: clockItem.countryName, timezones: (c.timezones || [clockItem.timezone]) as string[] };
    }
    return null;
  }, [mode, country, clockItem]);

  const [label, setLabel] = useState<string>(clockItem?.label ?? "");
  const [timezone, setTimezone] = useState<string>(clockItem?.timezone ?? (countryInfo?.timezones?.[0] ?? ""));

  if (!countryInfo) return null;

  const handleSave = () => {
    if (mode === "add") {
      if (!timezone) return; // require tz selection
      // Create and then apply label patch if present
      addClock({ countryCode: countryInfo.code, countryName: countryInfo.name, timezone });
      if (label && label.trim()) {
        const tempClock: ClockItem = { countryCode: countryInfo.code, countryName: countryInfo.name, timezone };
        updateClock(tempClock, { label: label.trim() });
      }
      onCloseAction();
      return;
    }
    if (!clockItem) return;
    const patch: Partial<Omit<ClockItem, "countryCode" | "countryName">> = { label: label };
    if (timezone) patch.timezone = timezone;
    updateClock(clockItem, patch);
    onCloseAction();
  };

  const handleDelete = () => {
    if (clockItem) {
      removeClock(clockItem);
      onCloseAction();
    }
  };

  const canConfirm = mode === "edit" ? true : Boolean(timezone);

  return (
    <Modal open={open} onClose={onCloseAction} aria-labelledby="clock-popup-title">
      <Box sx={{ ...modalStyle, bgcolor: "background.paper" }}>
        <div className="flex items-center justify-between p-6 border-b-1">
          <div className="flex items-center gap-2">
            <FlagIcon code={countryInfo.code} alt={countryInfo.name} />
            <Typography id="clock-popup-title" variant="subtitle1">
              {countryInfo.name}
            </Typography>
          </div>
          <IconButton aria-label="Close" onClick={onCloseAction} size="small">
            <CloseIcon />
          </IconButton>
        </div>

        <div className="p-6 flex gap-6 flex-col">
          {countryInfo.timezones.length > 1 ? (
            <Autocomplete
              size="small"
              options={countryInfo.timezones}
              value={timezone}
              onChange={(_, val) => setTimezone(val || "")}
              renderInput={(params) => <TextField {...params} label="Timezone" />}
            />
          ) : (
            <TextField size="small" label="Timezone" value={timezone} disabled />
          )}

          <TextField
            size="small"
            label="Label (optional)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>

        <div className="p-6 flex items-center justify-between border-t-1 gap-6">
          {mode === "edit" ? (
            <Button color="error" startIcon={<DeleteOutlineIcon />} onClick={handleDelete}>
              Delete clock
            </Button>
          ) : (
            <span />
          )}

          <div>
            <Button variant="contained" onClick={handleSave} disabled={!canConfirm}>
              {mode === "add" ? "Add clock" : "Save"}
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ClockPopup;
