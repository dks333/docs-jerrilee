import { useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import { chartTooltipStyle, numberFormatter, sourceData } from "./recharts-data.ts";
import { ChartDataTable } from "./recharts-data-table.tsx";
import "./recharts-example.css";

const totalVisits = sourceData.reduce((total, source) => total + source.value, 0);

export function RechartsPie() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = sourceData[selectedIndex];
  const selectedName = selected?.name ?? "Direct";
  const selectedValue = selected?.value ?? 0;
  const selectedPercent = Math.round((selectedValue / totalVisits) * 100);

  return (
    <div className="recharts-example">
      <div className="recharts-example-heading">
        <div>
          <div className="recharts-example-label">Where visits come from</div>
          <p className="recharts-example-subtitle">10,000 visits · sample data</p>
        </div>
      </div>
      <div className="recharts-pie-layout">
        <div className="recharts-example-chart recharts-pie-chart">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <PieChart
              accessibilityLayer
              title="Visits by source"
              desc="Select a slice or use the source buttons to inspect its share."
            >
              <Pie
                data={sourceData}
                dataKey="value"
                nameKey="name"
                innerRadius="58%"
                outerRadius="78%"
                paddingAngle={3}
                cornerRadius={3}
                isAnimationActive={false}
                onClick={(_sector, index) => setSelectedIndex(index)}
                shape={(props) => (
                  <Sector
                    {...props}
                    fill={sourceData[props.index]?.color}
                    stroke="var(--chart-background)"
                    strokeWidth={2}
                    outerRadius={props.outerRadius + (props.index === selectedIndex ? 8 : 0)}
                  />
                )}
              />
              <Tooltip
                contentStyle={chartTooltipStyle}
                isAnimationActive={false}
                formatter={(value) => {
                  if (typeof value === "number") return `${numberFormatter.format(value)} visits`;
                  return value;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="recharts-pie-center" aria-hidden="true">
            <strong>{selectedPercent}%</strong>
            <span>{selectedName}</span>
          </div>
        </div>
        <div className="recharts-source-list" aria-label="Traffic sources">
          {sourceData.map((source, index) => (
            <button
              key={source.name}
              type="button"
              aria-pressed={index === selectedIndex}
              onClick={() => setSelectedIndex(index)}
            >
              <span className="recharts-source-name">
                <span className="recharts-series-swatch" style={{ background: source.color }} />
                {source.name}
              </span>
              <span>{numberFormatter.format(source.value)}</span>
            </button>
          ))}
          <p className="recharts-selection-status" role="status">
            {selectedName}: {numberFormatter.format(selectedValue)} visits ({selectedPercent}%).
          </p>
        </div>
      </div>
      <ChartDataTable
        caption="Sample visits by source"
        columns={["Source", "Visits", "Share"]}
        rows={sourceData.map((source) => [
          source.name,
          source.value,
          `${Math.round((source.value / totalVisits) * 100)}%`,
        ])}
      />
    </div>
  );
}
