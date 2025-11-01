import type { Route } from "./+types/time";
import { MainLayout } from "../../ui/mainLayout";
import { GetRequest } from "~/data/data";
import { useEffect, useState } from "react";
import config from "~/config";
import { ChartLine, ChartWrapper } from "~/ui/chart";
import { TypoH1 } from "~/ui/typography";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function TimeStatistics() {
  const [monthlyAscentsData, setMonthAscentsData] = useState<Record<string, any>[]>([]);
  const [yearAscentsData, setYearAscentsData] = useState<Record<string, any>[]>([]);
  const [monthGradeSelection, setMonthGradeSelection] = useState<string>();
  const [yearGradeSelection, setYearGradeSelection] = useState<string>();

  useEffect(() => {
    async function load() {
      let params = new URLSearchParams();
      if (monthGradeSelection && monthGradeSelection !== "All") {
        params.append("grade", monthGradeSelection);
      }
      const monthAscents = await GetRequest(
        `${config.baseUrl}/stats/time/ascent/per-month?${params}`
      );
      setMonthAscentsData(monthAscents);
    }
    load();
  }, [monthGradeSelection]);

  useEffect(() => {
    async function load() {
      let params = new URLSearchParams();
      if (yearGradeSelection && yearGradeSelection !== "All") {
        params.append("grade", yearGradeSelection);
      }

      const yearAscents = await GetRequest(
        `${config.baseUrl}/stats/time/ascent/per-year?${params}`
      );
      setYearAscentsData(yearAscents);
    }
    load();
  }, [yearGradeSelection]);

  const monthlyChartConfig = {
    percentage: {
      label: "%",
      color: "var(--chart-1)",
    },
  };

  const yearlyChartConfig = {
    ascents: {
      label: "Ascents",
      color: "var(--chart-1)",
    },
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <TypoH1>Time Analytics</TypoH1>
        <ChartWrapper
          ChartType={ChartLine}
          chartConfig={monthlyChartConfig}
          chartData={monthlyAscentsData}
          dataKeyX="month"
          title="Pourcentage of ascents per month"
          chartSetData={setMonthAscentsData}
          enableSliding={true}
          margin={{ right: 50, left: 20, bottom: 20 }}
          commentContent="statistics.time.month"
          setGradeSelection={setMonthGradeSelection}
        />
        <ChartWrapper
          ChartType={ChartLine}
          chartConfig={yearlyChartConfig}
          chartData={yearAscentsData}
          dataKeyX="year"
          title="Number of ascents per year"
          description="Total number of ascents logged per year"
          tickAngle={-40}
          legendOffset={9}
          margin={{ right: 50, left: 20, bottom: 20 }}
          commentContent="statistics.time.year"
          setGradeSelection={setYearGradeSelection}
        />
      </div>
    </MainLayout>
  );
}
