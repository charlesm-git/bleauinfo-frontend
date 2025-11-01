import type { Route } from "./+types/area";
import { MainLayout } from "../../ui/mainLayout";
import { GetRequest } from "~/data/data";
import { useEffect, useState } from "react";
import config from "~/config";
import { ChartBarVertical, ChartWrapper } from "~/ui/chart";
import { TypoH1 } from "~/ui/typography";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AreaStatistics() {
  const [areaAscentsData, setAreaAscentsData] = useState<Record<string, any>[]>([]);
  const [areaBouldersData, setAreaBouldersData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    async function load() {
      const areaAscents = await GetRequest(`${config.baseUrl}/stats/area/most-ascents`);
      setAreaAscentsData(areaAscents);
    }
    load();
  }, []);

  useEffect(() => {
    async function load() {
      const areaBoulders = await GetRequest(`${config.baseUrl}/stats/area/most-boulders`);
      setAreaBouldersData(areaBoulders);
    }
    load();
  }, []);

  const areaAscentsChartConfig = {
    count: {
      label: "Ascents",
      color: "var(--chart-1)",
    },
  };

  const areaBouldersChartConfig = {
    count: {
      label: "Boulders",
      color: "var(--chart-2)",
    },
  };
  return (
    <MainLayout>
      <TypoH1>Area Analytics</TypoH1>
      <ChartWrapper
        ChartType={ChartBarVertical}
        chartData={areaAscentsData}
        chartConfig={areaAscentsChartConfig}
        dataKeyX="area.name"
        title="Top 10 areas with the most registered ascents"
        tickAngle={-30}
        commentContent="statistics.area.ascent"
        legendOffset={12}
      />
      <ChartWrapper
        ChartType={ChartBarVertical}
        chartData={areaBouldersData}
        chartConfig={areaBouldersChartConfig}
        dataKeyX="area.name"
        title="Top 10 areas with the most boulders"
        tickAngle={-30}
        commentContent="statistics.area.boulder"
        legendOffset={12}
      />
    </MainLayout>
  );
}
