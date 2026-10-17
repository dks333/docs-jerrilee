import { useState } from "react";
import {
  Bar,
  Brush,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartTick, chartTooltipStyle, formatCompact, trafficData } from "./recharts-data.ts";
import { ChartDataTable } from "./recharts-data-table.tsx";
import "./recharts-example.css";

export function RechartsComposed() {
  const [range, setRange] = useState({ startIndex: 0, endIndex: trafficData.length - 1 });
  const start = trafficData[range.startIndex]?.day;
  const end = trafficData[range.endIndex]?.day;

  return (
    <div className="recharts-example">
      <div className="recharts-example-heading">
        <div>
          <div className="recharts-example-label">Traffic and response time</div>
          <p className="recharts-example-subtitle">
            Requests on the left · latency in ms on the right
          </p>
        </div>
        <output className="recharts-range-status" aria-live="polite">
          {start}–{end}
        </output>
      </div>
      <div className="recharts-example-chart recharts-example-chart-tall">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <ComposedChart
            data={trafficData}
            margin={{ top: 12, right: 0, left: 0, bottom: 4 }}
            accessibilityLayer
            title="Traffic and latency"
            desc="Bars show request volume and a line shows response time. Adjust the date range with the brush below."
          >
            <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={chartTick}
              tickMargin={10}
              minTickGap={22}
            />
            <YAxis
              yAxisId="requests"
              axisLine={false}
              tickLine={false}
              tick={chartTick}
              tickFormatter={formatCompact}
              width={42}
            />
            <YAxis
              yAxisId="latency"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={chartTick}
              tickFormatter={(value: number) => `${value} ms`}
              width={52}
              domain={[0, 240]}
            />
            <Tooltip contentStyle={chartTooltipStyle} cursor={false} isAnimationActive={false} />
            <Legend
              iconType="plainline"
              iconSize={14}
              wrapperStyle={{ fontSize: 13, paddingTop: 8 }}
            />
            <Bar
              yAxisId="requests"
              dataKey="requests"
              name="Requests"
              fill="var(--chart-forest)"
              radius={[3, 3, 0, 0]}
              maxBarSize={34}
              isAnimationActive={false}
            />
            <Line
              yAxisId="latency"
              type="monotone"
              dataKey="latency"
              name="Latency (ms)"
              stroke="var(--chart-clay)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
            />
            <Brush
              dataKey="day"
              height={30}
              stroke="var(--chart-muted)"
              fill="var(--chart-background)"
              travellerWidth={10}
              startIndex={range.startIndex}
              endIndex={range.endIndex}
              onChange={setRange}
              ariaLabel="Visible date range"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <ChartDataTable
        caption="Sample traffic and latency by day"
        columns={["Day", "Requests", "Latency (ms)"]}
        rows={trafficData.map((day) => [day.day, day.requests, day.latency])}
      />
    </div>
  );
}
