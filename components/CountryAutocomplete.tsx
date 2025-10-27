"use client";
import React, { useEffect, useMemo, useState } from "react";
import * as ctz from "countries-and-timezones";
import { useClockStore } from "@/store/clockStore";
/*import FlagIcon from "@/components/FlagIcon";*/
import { Autocomplete, TextField } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import ClockPopup from "@/components/ClockPopup";
import AddCircleIcon from '@mui/icons-material/AddCircle';
export type CountryOption = {
  name: string;
  code: string; // ISO 2
  timezones: string[];
};


import styles from "./CountryAutocomplete.module.scss";

export const CountryAutocomplete: React.FC = () => {
  const addClock = useClockStore((s) => s.addClock);
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);

  const countries: CountryOption[] = useMemo(() => {
    const all = ctz.getAllCountries();
    return Object.values(all)
      .map((c) => ({ name: c.name, code: c.id, timezones: c.timezones }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);


  // When a country is selected, if it has only one tz, add immediately
  useEffect(() => {
    if (selectedCountry && selectedCountry.timezones.length === 1) {
      addClock({ countryCode: selectedCountry.code, countryName: selectedCountry.name, timezone: selectedCountry.timezones[0] });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCountry(null);
      setQuery("");
    }
  }, [selectedCountry, addClock]);

  return (
    <div className={`w-full max-w-xl relative ${styles.countryAutocomplete}`}>
      <div className="absolute left-0 top-0 mt-2 ml-2">
        <AddCircleIcon />
      </div>
      <Autocomplete<CountryOption>
        size="small"
        options={countries}
        value={selectedCountry}
        inputValue={query}
        onInputChange={(_, val) => {
          setQuery(val);
        }}
        onChange={(_, val) => {
          if (val) {
            setSelectedCountry(val);
            setQuery("");
          }
        }}
        isOptionEqualToValue={(o, v) => o.code === v.code}
        getOptionLabel={(o) => o?.name ?? ""}
        filterOptions={createFilterOptions<CountryOption>({
          stringify: (o) => `${o.name} ${o.code}`
        })}
        /* // could have been this BUT it's slow
        renderOption={(props, option) => (
          <li {...props} key={option.code}>
            <div className="flex items-center gap-2 text-sm">
              <FlagIcon code={option.code} alt={option.name} width={24} height={16} />
              <span>
                {option.name} <span className="text-xs text-zinc-500 dark:text-zinc-400">({option.code})</span>
              </span>
            </div>
          </li>
        )}*/
        renderInput={(params) => (
          <TextField
            className="pl-6"
            {...params}
            label="Add New Country"
          />
        )}
      />

      {/* Open popup to select timezone and optionally label when multiple timezones available */}
      {selectedCountry && selectedCountry.timezones.length > 1 && (
        <ClockPopup
          open={true}
          country={{ code: selectedCountry.code, name: selectedCountry.name, timezones: selectedCountry.timezones }}
          onCloseAction={() => {
            setSelectedCountry(null);
            setQuery("");
          }}
        />
      )}
    </div>
  );
};

export default CountryAutocomplete;
