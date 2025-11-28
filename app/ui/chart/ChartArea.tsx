import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";
import { ChartProps } from "./types";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function ChartArea({
  chartData,
  chartConfig,
  dataKeyX,
  margin = { top: 20, bottom: 20, right: 20, left: 20 },
  tickAngle = 0,
  legendOffset = 0,
}: ChartProps) {
  const keys = Object.keys(chartConfig);

  return (
    <ChartContainer config={chartConfig} className="h-[500px] w-full">
      <AreaChart accessibilityLayer data={chartData} layout="horizontal" margin={margin}>
        <defs>
          {keys.map((key) => (
            <linearGradient id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`var(--color-${key})`} stopOpacity={0.8} />
              <stop offset="95%" stopColor={`var(--color-${key})`} stopOpacity={0.1} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={dataKeyX}
          textAnchor={tickAngle !== 0 ? "end" : "middle"}
          interval={0}
          padding={{ left: 0, right: 0 }}
          tickLine={false}
          tickMargin={5}
          tick={{ fontSize: 12 }}
          angle={tickAngle}
          axisLine={false}
        />
        <YAxis axisLine={false} tickLine={false} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        {keys.map((key) => (
          <Area
            key={key}
            dataKey={key}
            type="monotone"
            fill={`url(#color${key})`}
            stroke={`var(--color-${key})`}
            radius={5}
            isAnimationActive={false}
          />
        ))}
        <ChartLegend
          content={<ChartLegendContent />}
          className={legendOffset ? `mt-${legendOffset}` : ""}
        />
      </AreaChart>
    </ChartContainer>
  );
}
