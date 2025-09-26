import type { Route } from "./+types/area";
import { MainLayout } from "../../ui/mainLayout";
import { FetchData } from "~/data/data";
import { useEffect, useState } from "react";
import config from "~/config";
import { ChartArea, ChartWrapper } from "~/ui/chart";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bleau.info statistics" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AreaStatistics() {
  const [areaAscentsData, setAreaAscentsData] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    async function load() {
      const areaAscents = await FetchData(`${config.baseUrl}/stats/areas/most-ascents`);
      setAreaAscentsData(areaAscents);
    }
    load();
  }, []);

  const areaChartConfig = {
    ascents: {
      label: "Ascents",
      color: "var(--chart-1)",
    },
  };
  return (
    <MainLayout>
      <ChartWrapper
        ChartType={ChartArea}
        chartData={areaAscentsData}
        chartConfig={areaChartConfig}
        dataKeyX="area.name"
        title="Top 10 areas with the most registered ascents"
        tickAngle={-30}
        commentContent="statistics.area"
        legendOffset={8}
      />
    </MainLayout>
  );
}
