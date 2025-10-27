"use client";
import React, { useState } from "react";
import Image from "next/image";

type Props = {
  code: string; // ISO 3166-1 A2
  alt: string;
  className?: string;
  // pixel sizes for width/height of flag; placeholder renders as a circle with diameter matching height
  width?: number;
  height?: number;
};

export const FlagIcon: React.FC<Props> = ({ code, alt, className = "", width = 48, height = 48 }) => {
  const [error, setError] = useState(false);
  const lower = code.toLowerCase();

  if (error) {
    const diameter = height; // make placeholder a circle based on height
    return (
      <div
        aria-label={`${alt} code placeholder`}
        className={`flex items-center justify-center rounded-full bg-zinc-300 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200 font-medium select-none`}
        style={{ width: diameter, height: diameter, lineHeight: `${diameter}px` }}
      >
        <span className="text-[10px] leading-none">{code.toUpperCase()}</span>
      </div>
    );
  }

  return (
    <Image
      src={`/flags/${lower}.png`}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover rounded border border-zinc-200 dark:border-zinc-700 ${className}`}
      onError={() => setError(true)}
    />
  );
};

export default FlagIcon;
