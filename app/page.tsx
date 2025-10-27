"use client";
import React from "react";
import CountryAutocomplete from "@/components/CountryAutocomplete";
import ClockList from "@/components/ClockList";

export default function Home() {
  return (
    <div className="flex items-start justify-center font-sans w-xl mx-auto">
      <main className="flex w-full max-w-4xl flex-col gap-6 p-6 m-6 bg-zinc-100 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-800">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold pt-0 mt-0">World Clock</h1>
        </header>
        <CountryAutocomplete />
        <ClockList />
      </main>
    </div>
  );
}
