import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { TypoH2 } from "../Typography";
import SliderButton from "./SliderButton";
import { GradeSelector } from "../Selector";
import { MarkdownContent } from "../MarkdownContent";
import { ChartWrapperProps } from "./types";
import { useMediaQuery } from "~/lib/hook/useMediaQuery";

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
export default function ChartWrapper({
  ChartType,
  chartData,
  chartConfig,
  dataKeyX,
  title,
  description,
  tickAngle = 0,
  tickAngleMobile,
  margin = { top: 20, bottom: 20, right: 20, left: 20 },
  marginMobile,
  legendOffset = 0,
  legendOffsetMobile,
  interval = 0,
  intervalMobile,
  ticksMobile,
  chartSetData,
  enableSliding = false,
  setGradeSelection,
  tickFormatterMobile,
  commentContent,
}: ChartWrapperProps) {
  const { isMobile } = useMediaQuery();

  return (
    <Card>
      <CardHeader className="px-3 md:px-6">
        <CardTitle>
          <TypoH2 className="mb-0">{title}</TypoH2>
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex flex-1 gap-4 items-center">
          {enableSliding && chartSetData ? (
            <SliderButton
              data={chartData}
              onDataChange={chartSetData}
              buttonSize={isMobile ? "sm" : "lg"}></SliderButton>
          ) : (
            <div className="flex-1"></div>
          )}
          {setGradeSelection && <GradeSelector onValueChange={setGradeSelection} />}
        </div>
        <ChartType
          chartData={chartData}
          chartConfig={chartConfig}
          dataKeyX={dataKeyX}
          margin={isMobile && marginMobile ? marginMobile : margin}
          tickAngle={isMobile && tickAngleMobile ? tickAngleMobile : tickAngle}
          legendOffset={isMobile && legendOffsetMobile ? legendOffsetMobile : legendOffset}
          interval={isMobile && intervalMobile ? intervalMobile : interval}
          isMobile={isMobile}
          {...(ticksMobile && { ticksMobile: ticksMobile })}
          {...(tickFormatterMobile && isMobile && { tickFormatterMobile })}
        />
      </CardContent>
      {commentContent && (
        <CardFooter>
          <div className="flex flex-col items-start bg-secondary flex-1 p-4 rounded rounded-md gap-2">
            <TypoH2 className="w-full">Comments</TypoH2>
            <MarkdownContent contentKey={commentContent} />
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
