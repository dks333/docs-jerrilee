import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  chartTick,
  chartTooltipStyle,
  formatCompact,
  numberFormatter,
  requestData,
} from "./recharts-data.ts";
import { ChartDataTable } from "./recharts-data-table.tsx";
import "./recharts-example.css";

export function RechartsExample() {
  const [cached, setCached] = useState(true);
  const [uncached, setUncached] = useState(true);

  return (
    <div className="recharts-example">
      <div className="recharts-example-heading">
        <div>
          <div className="recharts-example-label">API requests</div>
          <p className="recharts-example-subtitle">October 1–14 · sample data</p>
        </div>
        <fieldset className="recharts-series-controls">
          <legend className="recharts-visually-hidden">Visible series</legend>
          <label>
            <input
              type="checkbox"
              checked={cached}
              disabled={!uncached}
              onChange={(event) => setCached(event.target.checked)}
            />
            <span className="recharts-series-swatch recharts-swatch-forest" />
            Cached
          </label>
          <label>
            <input
              type="checkbox"
              checked={uncached}
              disabled={!cached}
              onChange={(event) => setUncached(event.target.checked)}
            />
            <span className="recharts-series-swatch recharts-swatch-slate" />
            Uncached
          </label>
        </fieldset>
      </div>
      <div className="recharts-example-chart">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <AreaChart
            data={requestData}
            margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
            accessibilityLayer
            title="API requests over two weeks"
            desc="Toggle cached and uncached requests. The complete sample dataset is in the table below."
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
              axisLine={false}
              tickLine={false}
              tick={chartTick}
              tickFormatter={formatCompact}
              width={42}
            />
            <Tooltip
              formatter={(value) => {
                if (typeof value === "number") return `${numberFormatter.format(value)} requests`;
                return value;
              }}
              contentStyle={chartTooltipStyle}
              cursor={{ stroke: "var(--chart-muted)", strokeWidth: 1 }}
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="cached"
              name="Cached"
              stackId="requests"
              stroke="var(--chart-forest)"
              fill="var(--chart-forest-fill)"
              fillOpacity={1}
              strokeWidth={2}
              isAnimationActive={false}
              hide={!cached}
            />
            <Area
              type="monotone"
              dataKey="uncached"
              name="Uncached"
              stackId="requests"
              stroke="var(--chart-slate)"
              fill="var(--chart-slate-fill)"
              fillOpacity={1}
              strokeWidth={2}
              isAnimationActive={false}
              hide={!uncached}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <ChartDataTable
        caption="Sample request counts by day"
        columns={["Day", "Cached", "Uncached", "Total"]}
        rows={requestData.map((day) => [
          day.day,
          day.cached,
          day.uncached,
          day.cached + day.uncached,
        ])}
      />
    </div>
  );
}
