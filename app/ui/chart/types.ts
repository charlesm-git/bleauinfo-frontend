import { ChartConfig } from "~/components/ui/chart";
import { ContentKey } from "~/content";

export interface ChartWrapperProps {
  ChartType: React.ComponentType<ChartProps>;
  chartData: Record<string, any>[];
  chartConfig: ChartConfig;
  dataKeyX: string;
  title: string;
  tickAngle?: number;
  tickAngleMobile?: number;
  margin?: Record<string, number>;
  marginMobile?: Record<string, number>;
  legendOffset?: number;
  legendOffsetMobile?: number;
  interval?: number | "preserveStart" | "preserveEnd";
  intervalMobile?: number | "preserveStart" | "preserveEnd";
  ticksMobile?: string[];
  description?: string;
  enableSliding?: boolean;
  enableGradeSelection?: boolean;
  chartSetData?: (newData: Record<string, any>[]) => void;
  setGradeSelection?: (newData: string) => void;
  tickFormatterMobile?: (value: any) => string;
  commentContent?: ContentKey;
}

export interface ChartProps {
  chartData: Record<string, any>[];
  chartConfig: ChartConfig;
  dataKeyX: string;
  margin: Record<string, number>;
  isMobile: boolean;
  tickAngle: number;
  legendOffset: number;
  interval: number | "preserveStart" | "preserveEnd";
  ticksMobile?: string[];
  tickFormatterMobile?: (value: any) => string;
}