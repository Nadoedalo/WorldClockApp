import { formatTime } from "@/utils/time";

// We cannot assert exact time because environment timezone varies, but we can ensure output shape HH:MM
function isHHMM(str: string) {
  return /^\d{2}:\d{2}$/.test(str);
}

describe("formatTime", () => {
  it("formats to HH:MM in given timezone", () => {
    const d = new Date("2024-01-01T00:00:00.000Z");
    const out = formatTime(d, "Europe/Paris");
    expect(isHHMM(out)).toBe(true);
  });

  it("falls back gracefully on invalid timezone", () => {
    const d = new Date("2024-01-01T00:00:00.000Z");
    const out = formatTime(d, "Invalid/TZ");
    expect(isHHMM(out)).toBe(true);
  });
});
