import { useId } from "react";
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartTick, chartTooltipStyle, formatCompact, trafficData } from "./recharts-data.ts";
import { ChartDataTable } from "./recharts-data-table.tsx";
import "./recharts-example.css";

export function RechartsSynchronized() {
  const syncId = useId();

  return (
    <div className="recharts-example">
      <div className="recharts-example-heading">
        <div>
          <div className="recharts-example-label">One timeline, two views</div>
          <p className="recharts-example-subtitle">
            Move across either chart. Both tooltips follow the same date.
          </p>
        </div>
      </div>
      <div className="recharts-synchronized-stack">
        <div>
          <div className="recharts-chart-caption">Requests</div>
          <div className="recharts-example-chart recharts-example-chart-small">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart
                data={trafficData}
                syncId={syncId}
                margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
                accessibilityLayer
                title="Synchronized request volume"
                desc="The date and visible range are shared with the latency chart below."
              >
                <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={chartTick}
                  tickMargin={8}
                  minTickGap={22}
                />
                <YAxis
                  tickFormatter={formatCompact}
                  axisLine={false}
                  tickLine={false}
                  tick={chartTick}
                  width={50}
                />
                <Tooltip contentStyle={chartTooltipStyle} isAnimationActive={false} />
                <Area
                  type="monotone"
                  dataKey="requests"
                  name="Requests"
                  stroke="var(--chart-forest)"
                  strokeWidth={2}
                  fill="var(--chart-forest-fill)"
                  fillOpacity={1}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <div className="recharts-chart-caption">Response time</div>
          <div className="recharts-example-chart recharts-example-chart-medium">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <LineChart
                data={trafficData}
                syncId={syncId}
                margin={{ top: 10, right: 12, left: 0, bottom: 4 }}
                accessibilityLayer
                title="Synchronized response time"
                desc="Drag the brush handles to change the visible range in both charts."
              >
                <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={chartTick}
                  tickMargin={8}
                  minTickGap={22}
                />
                <YAxis
                  tickFormatter={(value: number) => `${value} ms`}
                  axisLine={false}
                  tickLine={false}
                  tick={chartTick}
                  width={50}
                  domain={[0, 240]}
                />
                <Tooltip
                  contentStyle={chartTooltipStyle}
                  formatter={(value) => `${value} ms`}
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="latency"
                  name="Latency"
                  stroke="var(--chart-clay)"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  isAnimationActive={false}
                />
                <Brush
                  dataKey="day"
                  height={28}
                  stroke="var(--chart-muted)"
                  fill="var(--chart-background)"
                  travellerWidth={10}
                  ariaLabel="Shared visible date range"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <ChartDataTable
        caption="Sample data shared by both charts"
        columns={["Day", "Requests", "Latency (ms)"]}
        rows={trafficData.map((day) => [day.day, day.requests, day.latency])}
      />
    </div>
  );
}
