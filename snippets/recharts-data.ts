export const requestData = [
  { day: "Oct 1", cached: 12400, uncached: 4200, latency: 142 },
  { day: "Oct 2", cached: 16800, uncached: 5100, latency: 154 },
  { day: "Oct 3", cached: 14200, uncached: 4600, latency: 148 },
  { day: "Oct 4", cached: 19600, uncached: 6200, latency: 182 },
  { day: "Oct 5", cached: 22400, uncached: 5800, latency: 176 },
  { day: "Oct 6", cached: 15800, uncached: 3900, latency: 136 },
  { day: "Oct 7", cached: 18200, uncached: 4700, latency: 151 },
  { day: "Oct 8", cached: 21300, uncached: 5300, latency: 164 },
  { day: "Oct 9", cached: 24600, uncached: 6100, latency: 189 },
  { day: "Oct 10", cached: 23700, uncached: 5400, latency: 172 },
  { day: "Oct 11", cached: 26800, uncached: 5900, latency: 183 },
  { day: "Oct 12", cached: 28900, uncached: 6300, latency: 196 },
  { day: "Oct 13", cached: 23100, uncached: 4800, latency: 162 },
  { day: "Oct 14", cached: 25300, uncached: 5100, latency: 168 },
];

export const trafficData = requestData.map((day) => ({
  ...day,
  requests: day.cached + day.uncached,
}));

export const sourceData = [
  { name: "Direct", value: 4200, color: "var(--chart-forest)" },
  { name: "Search", value: 3100, color: "var(--chart-clay)" },
  { name: "Referrals", value: 1800, color: "var(--chart-slate)" },
  { name: "Email", value: 900, color: "var(--chart-sand)" },
];

export const numberFormatter = new Intl.NumberFormat("en-US");

export function formatCompact(value: number) {
  if (Math.abs(value) >= 1000) {
    return `${value / 1000}k`;
  }

  return String(value);
}

export const chartTick = { fill: "var(--chart-muted)", fontSize: 11 };

export const chartTooltipStyle = {
  background: "var(--chart-background)",
  border: "1px solid var(--chart-grid)",
  borderRadius: 6,
  color: "var(--chart-text)",
  fontSize: 12,
  boxShadow: "0 4px 16px rgb(0 0 0 / 8%)",
};
