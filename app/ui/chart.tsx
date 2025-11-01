"use client";

import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "~/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import React from "react";
import { TypoH2 } from "./typography";
import { MarkdownContent } from "./markdownContent";
import { ContentKey } from "~/content";
import { GradeSelector } from "./selector";

interface ChartWrapperProps {
  ChartType: React.ComponentType<ChartProps>;
  chartData: Record<string, any>[];
  chartConfig: ChartConfig;
  dataKeyX: string;
  title: string;
  tickAngle?: number;
  margin?: Record<string, number>;
  legendOffset?: number;
  description?: string;
  enableSliding?: boolean;
  enableGradeSelection?: boolean;
  chartSetData?: (newData: Record<string, any>[]) => void;
  setGradeSelection?: (newData: string) => void;
  commentContent?: ContentKey;
}

interface ChartProps {
  chartData: Record<string, any>[];
  chartConfig: ChartConfig;
  dataKeyX: string;
  tickAngle?: number;
  margin?: Record<string, number>;
  legendOffset?: number;
}

export function ChartWrapper({
  ChartType,
  chartData,
  chartConfig,
  dataKeyX,
  title,
  description,
  tickAngle = 0,
  margin = { top: 20, bottom: 20, right: 20, left: 20 },
  legendOffset = 0,
  chartSetData,
  enableSliding = false,
  setGradeSelection,
  commentContent,
}: ChartWrapperProps) {
  /**
   * Chart Wrapper
   * @param:
   * ChartType - Type of chart to use. Should input the component type directly
   * chartData - Data to display
   * chartConfig - Setup the colors and labels to use in the chart.
   * The main keys have to fit the content of the JSON input in chartData
   * dataKeyX - value used on X axis
   * title - Title of the chart
   * description - Description of the chart
   * chartSetData - setData associated to chartData. Necessary only for sliding charts
   * enableSliding - Turns on the sliding option. Require chartSetData to be provided to work
   * commentContent - key used for MD content to display. List of keys available in /content/index.ts
   */
  return (
    <Card>
      <CardHeader className="">
        <CardTitle>
          <TypoH2>{title}</TypoH2>
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex flex-1 gap-4 mb-4">
          {enableSliding && chartSetData ? (
            <SliderButton data={chartData} onDataChange={chartSetData}></SliderButton>
          ) : (
            <div className="flex-1"></div>
          )}
          {setGradeSelection && <GradeSelector onValueChange={setGradeSelection} />}
        </div>
        <ChartType
          chartData={chartData}
          chartConfig={chartConfig}
          dataKeyX={dataKeyX}
          margin={margin}
          tickAngle={tickAngle}
          legendOffset={legendOffset}
        />
      </CardContent>
      {commentContent && (
        <CardFooter>
          <div className="flex flex-col items-start bg-secondary flex-grow p-4 rounded rounded-md gap-2">
            <TypoH2 className="w-full">Comments</TypoH2>
            <MarkdownContent contentKey={commentContent} />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}

export function ChartLine({
  chartData,
  chartConfig,
  dataKeyX,
  legendOffset,
  margin = { top: 20, bottom: 20, right: 20, left: 20 },
  tickAngle = 0,
}: ChartProps) {
  const keys = Object.keys(chartConfig);

  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <LineChart accessibilityLayer data={chartData} height={100} margin={margin}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={dataKeyX}
          // axisLine={false}
          // tickLine={false}
          textAnchor={tickAngle !== 0 ? "end" : "middle"}
          tickMargin={8}
          angle={tickAngle}
          interval={0}
          // tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        {keys.map((key) => (
          <Line
            key={key}
            dataKey={key}
            type="monotone"
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            dot={true}
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

export function ChartBarVertical({
  chartData,
  chartConfig,
  dataKeyX,
  legendOffset,
  margin = { top: 20, bottom: 20, right: 20, left: 20 },
  tickAngle = 0,
}: ChartProps) {
  const keys = Object.keys(chartConfig);

  return (
    <ChartContainer config={chartConfig} className="h-[400px] w-full">
      <BarChart accessibilityLayer data={chartData} layout="horizontal" margin={margin}>
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
        <YAxis axisLine={false} tickLine={false} tickCount={10} />
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

export function ChartArea({
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

interface SliderButtonProps {
  data: Record<string, any>[];
  onDataChange: (newData: Record<string, any>[]) => void;
  buttonSize?: "sm" | "default" | "lg";
}

export function SliderButton({
  data,
  onDataChange: setData,
  buttonSize = "lg",
}: SliderButtonProps) {
  const currentData = data;

  const slideData = (direction: "left" | "right") => {
    let newData: Record<string, any>[];

    if (direction === "right") {
      const last = currentData[currentData.length - 1];
      newData = [last, ...currentData.slice(0, -1)];
    } else {
      const [first, ...rest] = currentData;
      newData = [...rest, first];
    }

    setData(newData);
  };

  return (
    <div className="flex flex-1 justify-center gap-8">
      <Button
        size={buttonSize}
        onClick={() => slideData("left")}
        disabled={currentData.length === 0}>
        <ArrowBigLeft />
      </Button>
      <Button
        size={buttonSize}
        onClick={() => slideData("right")}
        disabled={currentData.length === 0}>
        <ArrowBigRight />
      </Button>
    </div>
  );
}
