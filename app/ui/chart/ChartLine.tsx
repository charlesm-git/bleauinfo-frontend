import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartProps } from "./types";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";

export default function ChartLine({
  chartData,
  chartConfig,
  dataKeyX,
  legendOffset,
  margin,
  interval,
  tickAngle,
  isMobile,
  tickFormatterMobile,
}: ChartProps) {
  const keys = Object.keys(chartConfig);

  return (
    <ChartContainer config={chartConfig} className="w-full aspect-1/1 md:aspect-video">
      <LineChart accessibilityLayer data={chartData} height={100} margin={margin}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={dataKeyX}
          textAnchor={tickAngle !== 0 ? "end" : "middle"}
          tickMargin={8}
          angle={tickAngle}
          interval={interval}
          tick={isMobile ? { fontSize: 8 } : { fontSize: 12 }}
          {...(tickFormatterMobile && { tickFormatter: tickFormatterMobile })}
          dx={tickAngle === -90 ? -3 : 0}
        />
        {!isMobile && <YAxis />}
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        {keys.map((key) => (
          <Line
            key={key}
            dataKey={key}
            type="monotone"
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            dot={isMobile ? { r: 2 } : true}
            isAnimationActive={false}
          />
        ))}
        <ChartLegend
          content={<ChartLegendContent />}
          className={legendOffset ? `mt-${legendOffset}` : ""}
        />
      </LineChart>
    </ChartContainer>
  );
}

