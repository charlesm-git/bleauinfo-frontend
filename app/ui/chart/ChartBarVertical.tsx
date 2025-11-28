import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";
import { ChartProps } from "./types";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";

export default function ChartBarVertical({
  chartData,
  chartConfig,
  dataKeyX,
  legendOffset,
  margin,
  interval,
  isMobile,
  ticksMobile,
  tickAngle = 0,
}: ChartProps) {
  const keys = Object.keys(chartConfig);

  return (
    <ChartContainer config={chartConfig} className="w-full aspect-2/3 md:aspect-video">
      <BarChart accessibilityLayer data={chartData} layout="horizontal" margin={margin}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={dataKeyX}
          textAnchor={tickAngle !== 0 ? "end" : "middle"}
          {...(ticksMobile && isMobile ? { ticks: ticksMobile, interval: 0 } : { interval })}
          padding={{ left: 0, right: 0 }}
          tickLine={false}
          tickMargin={5}
          tick={isMobile ? { fontSize: 8 } : { fontSize: 12 }}
          angle={tickAngle}
          axisLine={false}
          dx={tickAngle === -90 ? -4 : 0}
        />
        {!isMobile && <YAxis axisLine={false} tickLine={false} tickCount={10} />}
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        {keys.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`var(--color-${key})`}
            radius={5}
            isAnimationActive={false}
          />
        ))}
        <ChartLegend
          content={<ChartLegendContent />}
          className={legendOffset ? `mt-${legendOffset}` : ""}
        />
      </BarChart>
    </ChartContainer>
  );
}
