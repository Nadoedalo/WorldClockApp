export function formatTime(date: Date, timeZone: string): string {
  try {
    const formatter = new Intl.DateTimeFormat([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });
    return formatter.format(date);
  } catch {
    // Fallback to local time if timezone is invalid
    const formatter = new Intl.DateTimeFormat([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return formatter.format(date);
  }
}

// Returns the UTC offset for a given IANA time zone at the provided date as a string like "+03" or "-05".
export function getUtcOffsetHours(date: Date, timeZone: string): string {
  try {
    // Use Intl to get the wall-clock time in the target timeZone
    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const parts = dtf.formatToParts(date);
    const get = (type: string) => Number(parts.find(p => p.type === type)?.value || 0);

    const y = get("year");
    const m = get("month");
    const d = get("day");
    const h = get("hour");
    const min = get("minute");
    const s = get("second");

    // Construct the same wall-clock time as UTC to find the offset
    const asUTC = Date.UTC(y, (m || 1) - 1, d || 1, h || 0, min || 0, s || 0);
    const actual = date.getTime();

    // Offset minutes = (wall-clock in tz expressed as UTC) - actual UTC epoch
    const offsetMinutes = Math.round((asUTC - actual) / 60000);

    // Determine sign from minutes to avoid truncation issues for negative partial hours
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const absHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const hh = String(absHours).padStart(2, "0");
    return `${sign}${hh}`;
  } catch {
    // If anything goes wrong, assume local offset
    const localOffsetMin = -new Date().getTimezoneOffset();
    const localHours = Math.trunc(localOffsetMin / 60);
    const sign = localHours >= 0 ? "+" : "-";
    const hh = String(Math.abs(localHours)).padStart(2, "0");
    return `${sign}${hh}`;
  }
}
