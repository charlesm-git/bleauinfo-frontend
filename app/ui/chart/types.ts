import { SetStateAction } from "react";
import { ChartConfig } from "~/components/ui/chart";
import { ContentKey } from "~/content";
import { AreaCount } from "~/types/area";
import { AscentsPerMonth, AscentsPerMonthWithGeneral, AscentsPerYear } from "~/types/ascent";
import { GradeAscents, GradeDistribution } from "~/types/grade";
import { StyleDistribution } from "~/types/style";

type ChartData =
  | GradeDistribution[]
  | GradeAscents[]
  | AscentsPerMonthWithGeneral[]
  | AscentsPerMonth[]
  | AscentsPerYear[]
  | AreaCount[]
  | StyleDistribution[];

export interface ChartWrapperProps {
  ChartType: React.ComponentType<ChartProps>;
  chartData: ChartData;
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
  chartSetData?:
    | React.Dispatch<SetStateAction<AscentsPerMonthWithGeneral[]>>
    | React.Dispatch<SetStateAction<AscentsPerMonth[]>>;
  setGradeSelection?: (newData: string) => void;
  tickFormatterMobile?: (value: any) => string;
  commentContent?: ContentKey;
}

export interface ChartProps {
  chartData: ChartData;
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
