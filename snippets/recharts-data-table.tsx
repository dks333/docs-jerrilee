import { numberFormatter } from "./recharts-data.ts";

export function ChartDataTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: (string | number)[][];
}) {
  return (
    <details className="recharts-example-data">
      <summary>View data</summary>
      <div className="recharts-example-table">
        <table>
          <caption>{caption}</caption>
          <thead>
            <tr>
              {columns.map((column) => (
                <th scope="col" key={column}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={String(row[0])}>
                {row.map((value, index) => {
                  let formatted = value;
                  if (typeof value === "number") {
                    formatted = numberFormatter.format(value);
                  }
                  if (index === 0) {
                    return (
                      <th scope="row" key={index}>
                        {formatted}
                      </th>
                    );
                  }
                  return <td key={index}>{formatted}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}
