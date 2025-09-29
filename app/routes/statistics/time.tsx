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
  const [monthlyAscentsData, setMonthlyAscentsData] = useState<Record<string, any>[]>([]);
  const [yearlyAscentsData, setYearlyAscentsData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    async function load() {
      const monthAscents = await GetRequest(`${config.baseUrl}/stats/ascents/per-month`);
      setMonthlyAscentsData(monthAscents);
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      const yearAscents = await GetRequest(`${config.baseUrl}/stats/ascents/per-year`);
      setYearlyAscentsData(yearAscents);
    }
    load();
  }, []);

  const monthlyChartConfig = {
    percentage: {
      label: "Percentage",
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
          chartSetData={setMonthlyAscentsData}
          enableSliding={true}
          margin={{ right: 50, left: 50, bottom: 20 }}
          commentContent="statistics.time.month"
        />
        <ChartWrapper
          ChartType={ChartLine}
          chartConfig={yearlyChartConfig}
          chartData={yearlyAscentsData}
          dataKeyX="year"
          title="Number of ascents per year"
          description="Total number of ascents logged per year, all grades and areas taken into account"
          tickAngle={-40}
          legendOffset={9}
          margin={{ right: 20, left: 20, bottom: 20 }}
          commentContent="statistics.time.year"
        />
      </div>
    </MainLayout>
  );
}
